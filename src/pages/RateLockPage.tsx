import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Table as Tabs, FileLock2, History, Clock, Info } from 'lucide-react';
import { useFxRate, RateLock } from '../contexts/FxRateContext';
import CurrencyConverter from '../components/exchange/CurrencyConverter';
import RateLockDetails from '../components/exchange/RateLockDetails';

const RateLockPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const rateId = searchParams.get('id');
  
  const { 
    createRateLock, 
    userLockedRates, 
    getLockedRates, 
    markRateLockAsUsed,
    isLoading 
  } = useFxRate();
  
  const [activeTab, setActiveTab] = useState(rateId ? 'view' : 'create');
  const [selectedRateLock, setSelectedRateLock] = useState<RateLock | null>(null);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  
  // Get active, expired, and used rate locks
  const now = new Date();
  const activeRates = userLockedRates.filter(
    rate => rate.status === 'active' && new Date(rate.expiresAt) > now
  );
  const expiredRates = userLockedRates.filter(
    rate => rate.status === 'active' && new Date(rate.expiresAt) <= now
  );
  const usedRates = userLockedRates.filter(
    rate => rate.status === 'used'
  );
  
  // Fetch locked rates on page load
  useEffect(() => {
    getLockedRates();
  }, []);
  
  // When a specific rate ID is provided in URL, select it
  useEffect(() => {
    if (rateId) {
      const rateLock = userLockedRates.find(rate => rate.id === rateId);
      if (rateLock) {
        setSelectedRateLock(rateLock);
        setActiveTab('view');
      }
    }
  }, [rateId, userLockedRates]);
  
  // Handler for creating a new rate lock
  const handleLockRate = async (
    fromCurrency: string,
    toCurrency: string,
    amount: number,
    rate: number
  ) => {
    try {
      const newLock = await createRateLock(fromCurrency, toCurrency, amount, rate);
      
      setNotification({
        type: 'success',
        message: 'Rate locked successfully for 24 hours!'
      });
      
      // Select the new lock and switch to the view tab
      setSelectedRateLock(newLock);
      setActiveTab('view');
      
      // Clear notification after 5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      console.error('Error locking rate:', error);
      
      setNotification({
        type: 'error',
        message: 'Failed to lock rate. Please try again.'
      });
      
      // Clear notification after 5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };
  
  // Handler for selecting a rate lock to view
  const handleSelectRate = (rateLock: RateLock) => {
    setSelectedRateLock(rateLock);
    setActiveTab('view');
  };
  
  // Format dates
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Rate Lock</h1>
        <p className="text-gray-600">
          Lock in favorable exchange rates for 24 hours
        </p>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`
          mb-6 p-4 rounded-lg flex items-start
          ${notification.type === 'success' ? 'bg-success-50 border border-success-200 text-success-700' : 
            'bg-error-50 border border-error-200 text-error-700'}
        `}>
          <Info className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">{notification.message}</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => {
              setActiveTab('create');
              setSelectedRateLock(null);
            }}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm flex items-center
              ${activeTab === 'create' ? 
                'border-primary-600 text-primary-600' : 
                'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            <FileLock2 className="w-4 h-4 mr-2" />
            Create Lock
          </button>
          
          <button
            onClick={() => setActiveTab('history')}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm flex items-center
              ${activeTab === 'history' ? 
                'border-primary-600 text-primary-600' : 
                'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            <History className="w-4 h-4 mr-2" />
            Lock History
          </button>
          
          {selectedRateLock && (
            <button
              onClick={() => setActiveTab('view')}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm flex items-center
                ${activeTab === 'view' ? 
                  'border-primary-600 text-primary-600' : 
                  'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              <Tabs className="w-4 h-4 mr-2" />
              View Lock
            </button>
          )}
        </nav>
      </div>

      {/* Create Lock Tab */}
      {activeTab === 'create' && (
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-2/3">
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-6">Create a New Rate Lock</h2>
              <p className="text-gray-600 mb-6">
                Select your currencies and amount to lock in a rate for 24 hours. Once locked, you can access this rate even if market rates change.
              </p>
              <CurrencyConverter 
                showLockButton={true}
                onLockRate={handleLockRate}
              />
            </div>
          </div>
          
          <div className="w-full md:w-1/3 space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">How It Works</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-2 flex-shrink-0 mr-3">
                    <span className="text-primary-700 font-semibold">1</span>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      Select your currencies and enter the amount you want to exchange
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-2 flex-shrink-0 mr-3">
                    <span className="text-primary-700 font-semibold">2</span>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      Lock in the current exchange rate for 24 hours
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-2 flex-shrink-0 mr-3">
                    <span className="text-primary-700 font-semibold">3</span>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      Receive a QR code that you can use to access your locked rate
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-2 flex-shrink-0 mr-3">
                    <span className="text-primary-700 font-semibold">4</span>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      Use the locked rate within 24 hours for your currency exchange
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card p-6 bg-primary-50 border border-primary-100">
              <div className="flex items-start">
                <Clock className="w-5 h-5 text-primary-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-primary-800 font-semibold mb-1">Rate Lock Duration</h3>
                  <p className="text-primary-700 text-sm">
                    All rate locks are valid for 24 hours from the time of creation. After this period, the locked rate will expire.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Rate Locks */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Active Rate Locks</h2>
            
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : activeRates.length > 0 ? (
              <div className="space-y-4">
                {activeRates.map((rate) => {
                  const expiresAt = new Date(rate.expiresAt);
                  const now = new Date();
                  const hoursLeft = Math.floor((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60));
                  const minutesLeft = Math.floor(((expiresAt.getTime() - now.getTime()) % (1000 * 60 * 60)) / (1000 * 60));
                  
                  return (
                    <div 
                      key={rate.id} 
                      className="card p-4 hover:shadow-md cursor-pointer transition-shadow"
                      onClick={() => handleSelectRate(rate)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-semibold">
                            {rate.fromCurrency} → {rate.toCurrency}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatDate(new Date(rate.createdAt))}
                          </div>
                        </div>
                        <div className="bg-accent-100 px-2 py-0.5 rounded text-xs font-medium text-accent-800">
                          Active
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          <div>Rate: <span className="font-medium">{rate.rate.toFixed(4)}</span></div>
                          <div>
                            {rate.fromAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} {rate.fromCurrency}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-primary-600">
                            {rate.toAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} {rate.toCurrency}
                          </div>
                          <div className="text-xs text-gray-500">
                            Expires in {hoursLeft}h {minutesLeft}m
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 card">
                <div className="flex justify-center mb-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No active locks</h3>
                <p className="text-gray-500 text-sm mb-4">
                  You don't have any active rate locks.
                </p>
              </div>
            )}
          </div>
          
          {/* Used Rate Locks */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Used Rate Locks</h2>
            
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : usedRates.length > 0 ? (
              <div className="space-y-4">
                {usedRates.map((rate) => (
                  <div 
                    key={rate.id} 
                    className="card p-4 hover:shadow-md cursor-pointer transition-shadow"
                    onClick={() => handleSelectRate(rate)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-semibold">
                          {rate.fromCurrency} → {rate.toCurrency}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDate(new Date(rate.createdAt))}
                        </div>
                      </div>
                      <div className="bg-success-100 px-2 py-0.5 rounded text-xs font-medium text-success-800">
                        Used
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <div>Rate: <span className="font-medium">{rate.rate.toFixed(4)}</span></div>
                        <div>
                          {rate.fromAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} {rate.fromCurrency}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-600">
                          {rate.toAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} {rate.toCurrency}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 card">
                <div className="flex justify-center mb-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <Tabs className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No used locks</h3>
                <p className="text-gray-500 text-sm mb-4">
                  You haven't used any rate locks yet.
                </p>
              </div>
            )}
          </div>
          
          {/* Expired Rate Locks */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Expired Rate Locks</h2>
            
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : expiredRates.length > 0 ? (
              <div className="space-y-4">
                {expiredRates.map((rate) => (
                  <div 
                    key={rate.id} 
                    className="card p-4 hover:shadow-md cursor-pointer transition-shadow"
                    onClick={() => handleSelectRate(rate)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-semibold">
                          {rate.fromCurrency} → {rate.toCurrency}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDate(new Date(rate.createdAt))}
                        </div>
                      </div>
                      <div className="bg-error-100 px-2 py-0.5 rounded text-xs font-medium text-error-800">
                        Expired
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <div>Rate: <span className="font-medium">{rate.rate.toFixed(4)}</span></div>
                        <div>
                          {rate.fromAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} {rate.fromCurrency}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-600">
                          {rate.toAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} {rate.toCurrency}
                        </div>
                        <div className="text-xs text-gray-500">
                          Expired on {formatDate(new Date(rate.expiresAt))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 card">
                <div className="flex justify-center mb-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No expired locks</h3>
                <p className="text-gray-500 text-sm mb-4">
                  You don't have any expired rate locks.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* View Lock Tab */}
      {activeTab === 'view' && selectedRateLock && (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 mx-auto">
            <RateLockDetails 
              rateLock={selectedRateLock} 
              onMarkAsUsed={markRateLockAsUsed}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RateLockPage;