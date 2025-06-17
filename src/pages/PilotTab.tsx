import React, { useState, useEffect, useCallback } from 'react';
import { ChevronDown, MapPin, Eye } from 'lucide-react';

// interface PilotTabProps {
//   className?: string;
// }

// const PilotTab: React.FC<PilotTabProps> = ({ className = '' }) => {
  // return (
  //   <main className={`about-page ${className}`.trim()}>
  //     <section 
  //       className="bg-gradient-to-br from-blue-900 to-blue-900 text-white py-16 md:py-24"
  //       aria-labelledby="about-heading"
  //     >
  //       <div className="container mx-auto px-4 max-w-7xl">
  //         <div className="flex flex-col md:flex-row items-center justify-center gap-12">
  //           <div className="text-center md:text-left max-w-4xl">
  //             <h1 
  //               id="about-heading"
  //               className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white"
  //             >
  //               About JetLock Fx
  //             </h1>
  //             <p className="text-lg md:text-xl text-primary-100 leading-relaxed">
  //               JetLock Fx is the first physical currency exchange comparison tool where travelers
  //               can search, compare, and reserve exchange rates from trusted local businesses.
  //             </p>
              {/* <div className="mt-8">
                <Link
                  to="/services"
                  className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  aria-label="Learn more about our services"
                >
                  Learn More
                </Link>
              </div> */}
            {/* </div>
          </div>
        </div>
      </section>
    </main>
  );
}; */}


// Types
interface ExchangeLocation {
  id: string;
  name: string;
  rate: number;
  distance: string;
  logo: string;
  color: string;
}

interface ExchangeRates {
  [key: string]: number;
}

interface ApiResponse {
  result: string;
  conversion_rates: ExchangeRates;
}

const PilotTab: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('MXN');
  const [amount, setAmount] = useState<string>('1');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  // Mock exchange locations data
  const exchangeLocations: ExchangeLocation[] = [
    {
      id: '1',
      name: 'Bureau Cambio',
      rate: 17.18,
      distance: '0.5 km',
      logo: 'C',
      color: 'bg-blue-600'
    },
    {
      id: '2',
      name: 'Metro Exchange',
      rate: 17.10,
      distance: '0.7 km',
      logo: 'MET',
      color: 'bg-blue-500'
    },
    {
      id: '3',
      name: 'QuickCash',
      rate: 17.05,
      distance: '1.2 km',
      logo: 'Q',
      color: 'bg-green-600'
    }
  ];

  const currencies = [
    { code: 'USD', name: 'US Dollar (USD)' },
    { code: 'MXN', name: 'Mexican Peso (MXN)' },
    { code: 'EUR', name: 'Euro (EUR)' },
    { code: 'GBP', name: 'British Pound (GBP)' },
    { code: 'JPY', name: 'Japanese Yen (JPY)' },
    { code: 'CAD', name: 'Canadian Dollar (CAD)' },
    { code: 'AUD', name: 'Australian Dollar (AUD)' },
    { code: 'CHF', name: 'Swiss Franc (CHF)' }
  ];

  const fetchExchangeRates = useCallback(async (baseCurrency: string) => {
    setLoading(true);
    setError('');
    
   try {
      // Method 1: Try using a CORS proxy (for demonstration)
      const proxyUrl = 'https://api.allorigins.win/raw?url=';
      const targetUrl = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`;
      
      const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
      
      if (!response.ok) {
        throw new Error('Proxy request failed');
      }
      
      const data = await response.json();
      
      if (data.rates) {
        setExchangeRates(data.rates);
        setError(''); // Clear any previous errors
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (err) {
      setError('Failed to fetch exchange rates. Using mock data.');
      // Mock data for demonstration
      setExchangeRates({
        USD: 1,
        MXN: 17.15,
        EUR: 0.85,
        GBP: 0.73,
        JPY: 110.50,
        CAD: 1.25,
        AUD: 1.35,
        CHF: 0.92
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExchangeRates(fromCurrency);
  }, [fromCurrency, fetchExchangeRates]);

  const getConvertedAmount = (): string => {
    const numAmount = parseFloat(amount) || 0;
    const rate = exchangeRates[toCurrency] || 1;
    const baseRate = exchangeRates[fromCurrency] || 1;
    const convertedAmount = (numAmount / baseRate) * rate;
    return convertedAmount.toFixed(2);
  };

  const handleCompareRates = () => {
    alert('Compare rates feature would show detailed comparison across all providers');
  };

  const handleViewMap = (locationName: string) => {
    alert(`View ${locationName} on map`);
  };

  const handleViewAllLocations = () => {
    alert('View all exchange locations in Tijuana');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-blue-700 text-white p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <span className="text-blue-700 font-bold text-lg">⚡</span>
          </div>
          <h1 className="text-xl font-bold">JetLock FX</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Currency Exchange Form */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              I want to exchange
            </label>
            <select 
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {currencies.map(currency => (
                <option key={currency.code} value={currency.code}>
                  {currency.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              For
            </label>
            <select 
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {currencies.map(currency => (
                <option key={currency.code} value={currency.code}>
                  {currency.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Tijuana</option>
              <option>Mexico City</option>
              <option>Guadalajara</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleCompareRates}
          className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium mb-6"
        >
          Compare rates
        </button>

        {/* Conversion Display */}
        {amount && !loading && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="text-lg font-semibold">
              {amount} {fromCurrency} = {getConvertedAmount()} {toCurrency}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Exchange rate: 1 {fromCurrency} = {(exchangeRates[toCurrency] / (exchangeRates[fromCurrency] || 1)).toFixed(4)} {toCurrency}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Filters</h3>
          <div className="flex flex-wrap gap-4">
            <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
              <option>Distance</option>
              <option>Nearest first</option>
              <option>Farthest first</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
              <option>Exchange rate</option>
              <option>Best rate first</option>
              <option>Worst rate first</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
              <option>Fees</option>
              <option>Low to high</option>
              <option>High to low</option>
            </select>
          </div>
        </div>

        {/* Filter Options */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <input type="checkbox" id="banks" className="rounded" />
            <label htmlFor="banks" className="text-sm">Banks</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="physical" className="rounded" defaultChecked />
            <label htmlFor="physical" className="text-sm">Physical exchange offices</label>
          </div>
        </div>

        {/* Exchange Locations */}
        <div className="space-y-4 mb-6">
          {exchangeLocations.map((location) => (
            <div key={location.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${location.color} rounded-full flex items-center justify-center text-white font-bold`}>
                  {location.logo}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{location.name}</h4>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-sm text-gray-600">Exchange rate</div>
                  <div className="font-bold">{location.rate} {toCurrency}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">Distance</div>
                  <div className="font-bold">{location.distance}</div>
                </div>
                <button 
                  onClick={() => handleViewMap(location.name)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-1"
                >
                  <Eye size={16} />
                  View map
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Lock in secure currency, wherever you jet.
          </h2>
          <button
            onClick={handleViewAllLocations}
            className="text-blue-600 hover:text-blue-700 font-medium underline"
          >
            View all locations in Tijuana
          </button>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center py-4">
            <div className="text-blue-600">Loading exchange rates...</div>
          </div>
        )}
        
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
            <div className="text-yellow-800 text-sm">{error}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PilotTab;