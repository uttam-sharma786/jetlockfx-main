import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

// Types
export type Currency = {
  code: string;
  name: string;
  symbol: string;
  flag?: string;
};

export type ExchangeRate = {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  timestamp: Date;
};

export type RateLock = {
  id?: string;
  userId: string;
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  rate: number;
  createdAt: Date;
  expiresAt: Date;
  status: 'active' | 'expired' | 'used';
  qrCode?: string;
  reference: string;
};

export type LockedRatesContextType = {
  currencies: Currency[];
  currentRates: ExchangeRate[];
  isLoading: boolean;
  error: string | null;
  userLockedRates: RateLock[];
  fetchRates: () => Promise<void>;
  createRateLock: (
    fromCurrency: string,
    toCurrency: string,
    fromAmount: number,
    rate: number
  ) => Promise<RateLock>;
  getLockedRates: () => Promise<void>;
  markRateLockAsUsed: (id: string) => Promise<void>;
  convertAmount: (amount: number, fromCurrency: string, toCurrency: string) => number | null;
};

// List of supported currencies
export const currenciesList: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽' },
];

const FxRateContext = createContext<LockedRatesContextType | undefined>(undefined);

export const useFxRate = () => {
  const context = useContext(FxRateContext);
  if (context === undefined) {
    throw new Error('useFxRate must be used within a FxRateProvider');
  }
  return context;
};

export const FxRateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [currencies] = useState<Currency[]>(currenciesList);
  const [currentRates, setCurrentRates] = useState<ExchangeRate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userLockedRates, setUserLockedRates] = useState<RateLock[]>([]);

  // Generate a random reference number
  const generateReference = () => {
    return Math.random().toString(36).substring(2, 12).toUpperCase();
  };

  // Function to fetch rates from API
  const fetchRates = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // For now, using mock rates
      const apiResponse = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await apiResponse.json();
      
      if (data && data.rates) {
        const newRates: ExchangeRate[] = [];
        
        // Base currency is USD in this API
        currencies.forEach(baseCurrency => {
          if (baseCurrency.code === 'USD') return; // Skip USD to USD
          
          const baseRate = data.rates[baseCurrency.code];
          if (baseRate) {
            newRates.push({
              fromCurrency: 'USD',
              toCurrency: baseCurrency.code,
              rate: baseRate,
              timestamp: new Date()
            });
          }
        });
        
        // Add inverse rates and cross rates
        currencies.forEach(fromCurrency => {
          currencies.forEach(toCurrency => {
            if (fromCurrency.code === toCurrency.code) return; // Skip same currency
            if (fromCurrency.code === 'USD' && toCurrency.code !== 'USD') return; // Already added USD as base
            
            let rate: number;
            if (toCurrency.code === 'USD') {
              // USD as target currency
              rate = 1 / data.rates[fromCurrency.code];
            } else {
              // Cross rate
              rate = data.rates[toCurrency.code] / data.rates[fromCurrency.code];
            }
            
            newRates.push({
              fromCurrency: fromCurrency.code,
              toCurrency: toCurrency.code,
              rate,
              timestamp: new Date()
            });
          });
        });
        
        setCurrentRates(newRates);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (err) {
      console.error('Error fetching exchange rates:', err);
      setError('Failed to fetch exchange rates. Please try again later.');
      
      // Set some demo rates if API fails
      const demoRates: ExchangeRate[] = [
        { fromCurrency: 'USD', toCurrency: 'EUR', rate: 0.92, timestamp: new Date() },
        { fromCurrency: 'USD', toCurrency: 'GBP', rate: 0.79, timestamp: new Date() },
        { fromCurrency: 'USD', toCurrency: 'JPY', rate: 151.69, timestamp: new Date() },
        { fromCurrency: 'EUR', toCurrency: 'USD', rate: 1.09, timestamp: new Date() },
        { fromCurrency: 'EUR', toCurrency: 'GBP', rate: 0.86, timestamp: new Date() },
        { fromCurrency: 'GBP', toCurrency: 'USD', rate: 1.27, timestamp: new Date() },
        { fromCurrency: 'JPY', toCurrency: 'USD', rate: 0.0066, timestamp: new Date() },
      ];
      setCurrentRates(demoRates);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to create a locked rate
  const createRateLock = async (
    fromCurrency: string,
    toCurrency: string,
    fromAmount: number,
    rate: number
  ): Promise<RateLock> => {
    if (!currentUser) {
      throw new Error('User must be authenticated to lock rates');
    }
    
    try {
      const toAmount = fromAmount * rate;
      
      // Create expiration date (24 hours from now)
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);
      
      // Create a new rate lock record
      const newRateLock: Omit<RateLock, 'id'> = {
        userId: currentUser.uid,
        fromCurrency,
        toCurrency,
        fromAmount,
        toAmount,
        rate,
        createdAt: new Date(),
        expiresAt,
        status: 'active',
        reference: generateReference()
      };
      
      // Save to Firestore
      const docRef = await addDoc(collection(db, 'lockedRates'), {
        ...newRateLock,
        createdAt: serverTimestamp(),
        expiresAt
      });
      
      const rateLock: RateLock = {
        ...newRateLock,
        id: docRef.id
      };
      
      // Update local state
      setUserLockedRates(prev => [...prev, rateLock]);
      
      return rateLock;
    } catch (error) {
      console.error('Error creating rate lock:', error);
      throw new Error('Failed to create rate lock. Please try again.');
    }
  };

  // Function to get user's locked rates
  const getLockedRates = async () => {
    if (!currentUser) return;
    
    try {
      setIsLoading(true);
      
      const lockedRatesQuery = query(
        collection(db, 'lockedRates'),
        where('userId', '==', currentUser.uid)
      );
      
      const querySnapshot = await getDocs(lockedRatesQuery);
      const lockedRates: RateLock[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        lockedRates.push({
          ...data,
          id: doc.id,
          createdAt: data.createdAt?.toDate() || new Date(),
          expiresAt: data.expiresAt?.toDate() || new Date()
        } as RateLock);
      });
      
      setUserLockedRates(lockedRates);
    } catch (error) {
      console.error('Error fetching locked rates:', error);
      setError('Failed to fetch locked rates. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to mark a rate lock as used
  const markRateLockAsUsed = async (id: string) => {
    try {
      const rateRef = doc(db, 'lockedRates', id);
      await updateDoc(rateRef, {
        status: 'used'
      });
      
      // Update local state
      setUserLockedRates(prev => 
        prev.map(rate => rate.id === id ? { ...rate, status: 'used' } : rate)
      );
    } catch (error) {
      console.error('Error marking rate as used:', error);
      throw new Error('Failed to update rate lock status.');
    }
  };

  // Function to convert amount between currencies
  const convertAmount = (amount: number, fromCurrency: string, toCurrency: string): number | null => {
    if (fromCurrency === toCurrency) return amount;
    
    const rate = currentRates.find(r => 
      r.fromCurrency === fromCurrency && r.toCurrency === toCurrency
    );
    
    return rate ? amount * rate.rate : null;
  };

  // Fetch rates on initial load and when user changes
  useEffect(() => {
    fetchRates();
    
    // Set up a timer to refresh rates every 5 minutes
    const intervalId = setInterval(fetchRates, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Fetch user's locked rates when user changes
  useEffect(() => {
    if (currentUser) {
      getLockedRates();
    } else {
      setUserLockedRates([]);
    }
  }, [currentUser]);

  const value = {
    currencies,
    currentRates,
    isLoading,
    error,
    userLockedRates,
    fetchRates,
    createRateLock,
    getLockedRates,
    markRateLockAsUsed,
    convertAmount
  };

  return (
    <FxRateContext.Provider value={value}>
      {children}
    </FxRateContext.Provider>
  );
};