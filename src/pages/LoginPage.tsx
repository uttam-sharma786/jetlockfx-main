// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { DollarSign } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';

// const LoginPage: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const[acceptTerms,setAcceptTerms] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!email || !password) {
//       return setError('Please fill in all fields');
//     }
//     if (!acceptTerms) {
//       return setError('Please accept the Terms and Conditions to continue');
//     }
//     try {
//       setError('');
//       setLoading(true);
//       await login(email, password);
//       navigate('/dashboard');
//     } catch (err: any) {
//       console.error('Login error:', err);
//       setError(err.message || 'Failed to log in');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
//       <div className="card max-w-md w-full p-8 animate-fade-in">
//         <div className="text-center mb-8">
//           <Link to="/" className="inline-flex items-center justify-center">
//             <DollarSign className="h-10 w-10 text-primary-600" />
//           </Link>
//           <h2 className="mt-4 text-3xl font-bold text-gray-900"> Tourist Sign-up</h2>
//           <p className="mt-2 text-gray-600">
//             Sign in to your account to continue
//           </p>
//         </div>

//         {error && (
//           <div className="mb-4 p-3 bg-error-50 border border-error-200 text-error-700 rounded-md text-sm">
//             {error}
//           </div>
//         )}

//         <form className="space-y-6" onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="email" className="label">
//               Email address
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               autoComplete="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="input"
//               placeholder="Enter your email"
//             />
//           </div>

//           <div>
//             <div className="flex items-center justify-between">
//               <label htmlFor="password" className="label">
//                 Password
//               </label>
//               <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
//                 Forgot password?
//               </a>
//             </div>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               autoComplete="current-password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="input"
//               placeholder="Enter your password"
//             />
//           </div>



//         <div className="flex items-start space-x-3">
//             <div className="flex items-center h-5">
//               <input
//                 id="accept-terms"
//                 name="accept-terms"
//                 type="checkbox"
//                 checked={acceptTerms}
//                 onChange={(e) => setAcceptTerms(e.target.checked)}
//                 className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
//                 required
//               />
//             </div>
//             <div className="text-sm">
//               <label htmlFor="accept-terms" className="text-gray-700">
//                 I agree to the{' '}
//                 <Link 
//                   to="/terms" 
//                   className="text-primary-600 hover:text-primary-500 underline font-medium"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   Terms and Conditions
//                 </Link>
//                 {' '}and{' '}
//                 <Link 
//                   to="/privacy" 
//                   className="text-primary-600 hover:text-primary-500 underline font-medium"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   Privacy Policy
//                 </Link>
//               </label>
//             </div>
//           </div>




//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="btn-primary w-full"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center">
//                   <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
//                   Signing in...
//                 </span>
//               ) : (
//                 'Sign in'
//               )}
//             </button>
//           </div>
//         </form>

//         <div className="mt-6 text-center">
//           <p className="text-gray-600">
//             Don't have an account?{' '}
//             <Link to="/register" className="text-primary-600 hover:text-primary-500 font-medium">
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;





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
      // Using a free API key - in production, you'd want to secure this
      const response = await fetch(`https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/${baseCurrency}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }
      
      const data: ApiResponse = await response.json();
      
      if (data.result === 'success') {
        setExchangeRates(data.conversion_rates);
      } else {
        throw new Error('API returned an error');
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