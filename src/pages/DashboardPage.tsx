import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Lock, 
  ChevronRight,
  BarChart4,
  PieChart,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';
import { useFxRate, RateLock } from '../contexts/FxRateContext';
import CurrencyConverter from '../components/exchange/CurrencyConverter';

const DashboardPage: React.FC = () => {
  const { currentUser, userProfile } = useAuth();
  const { currentRates, userLockedRates, getLockedRates, isLoading } = useFxRate();
  const [activeRates, setActiveRates] = useState<RateLock[]>([]);
  
  useEffect(() => {
    getLockedRates();
  }, []);
  
  useEffect(() => {
    // Filter for active rates
    const now = new Date();
    const active = userLockedRates.filter(rate => 
      rate.status === 'active' && new Date(rate.expiresAt) > now
    );
    setActiveRates(active);
  }, [userLockedRates]);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };
  
  // Get a sample of recent rates for the chart visualization
  const getRecentRateTrend = (fromCurrency: string, toCurrency: string) => {
    // This would typically come from historical data
    // Using mock data for visualization purposes
    return [
      { date: '1 May', rate: 1.09 },
      { date: '7 May', rate: 1.11 },
      { date: '14 May', rate: 1.08 },
      { date: '21 May', rate: 1.12 },
      { date: '28 May', rate: 1.10 },
      { date: 'Today', rate: 1.09 },
    ];
  };
  
  const usdEurTrend = getRecentRateTrend('USD', 'EUR');
  
  // Simple visualization of the trend
  const TrendChart = () => {
    const max = Math.max(...usdEurTrend.map(d => d.rate));
    const min = Math.min(...usdEurTrend.map(d => d.rate));
    const range = max - min;
    
    return (
      <div className="flex items-end h-12 space-x-2">
        {usdEurTrend.map((point, i) => {
          const height = ((point.rate - min) / range) * 100;
          const isLast = i === usdEurTrend.length - 1;
          
          return (
            <div key={i} className="flex flex-col items-center">
              <div 
                className={`w-4 rounded-t-sm ${isLast ? 'bg-primary-500' : 'bg-primary-300'}`}
                style={{ height: `${60 + height * 0.4}%` }}
              ></div>
              {(i === 0 || isLast) && (
                <span className="text-xs text-gray-500 mt-1">{point.date}</span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {userProfile?.name || currentUser?.displayName || 'User'}
        </h1>
        <p className="text-gray-600">
          Track your rates and manage your currency exchanges
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="md:col-span-2 space-y-6">
          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Active rates */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-primary-50 rounded-lg">
                  <Lock className="h-6 w-6 text-primary-600" />
                </div>
                <span className="text-primary-600 text-sm font-medium">Active</span>
              </div>
              <p className="text-sm text-gray-500">Active Rate Locks</p>
              <h3 className="text-2xl font-bold mt-1">{activeRates.length}</h3>
            </div>
            
            {/* Total transactions */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-secondary-50 rounded-lg">
                  <DollarSign className="h-6 w-6 text-secondary-600" />
                </div>
                <span className="text-secondary-600 text-sm font-medium">Total</span>
              </div>
              <p className="text-sm text-gray-500">Total Transactions</p>
              <h3 className="text-2xl font-bold mt-1">{userLockedRates.filter(r => r.status === 'used').length}</h3>
            </div>
            
            {/* Currency pairs */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-accent-50 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-accent-600" />
                </div>
                <span className="text-accent-600 text-sm font-medium">Pairs</span>
              </div>
              <p className="text-sm text-gray-500">Currency Pairs</p>
              <h3 className="text-2xl font-bold mt-1">
                {new Set(userLockedRates.map(r => `${r.fromCurrency}/${r.toCurrency}`)).size}
              </h3>
            </div>
          </div>

          {/* Rate trend chart */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Exchange Rate Trend</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-500">USD/EUR</span>
                <BarChart4 className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-3xl font-bold text-gray-900">
                  {usdEurTrend[usdEurTrend.length - 1].rate.toFixed(4)}
                </span>
                <div className="flex items-center mt-1">
                  {usdEurTrend[usdEurTrend.length - 1].rate > usdEurTrend[usdEurTrend.length - 2].rate ? (
                    <>
                      <ArrowUpRight className="w-4 h-4 text-success-500 mr-1" />
                      <span className="text-sm text-success-500">+0.01 (0.9%)</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="w-4 h-4 text-error-500 mr-1" />
                      <span className="text-sm text-error-500">-0.01 (0.9%)</span>
                    </>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-500">Last 30 days</span>
              </div>
            </div>
            
            <div className="mt-4">
              <TrendChart />
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-400 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Lowest</span>
                  <span className="font-medium">1.08</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Highest</span>
                  <span className="font-medium">1.12</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Average</span>
                  <span className="font-medium">1.10</span>
                </div>
              </div>
              <Link to="/rate-lock" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                Lock rate now <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Active rate locks */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Active Rate Locks</h2>
              <Link to="/rate-lock" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View all
              </Link>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : activeRates.length > 0 ? (
              <div className="space-y-4">
                {activeRates.slice(0, 3).map((rate) => {
                  const expiresAt = new Date(rate.expiresAt);
                  const now = new Date();
                  const hoursLeft = Math.floor((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60));
                  const minutesLeft = Math.floor(((expiresAt.getTime() - now.getTime()) % (1000 * 60 * 60)) / (1000 * 60));
                  
                  return (
                    <div key={rate.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-1 mb-1">
                            <span className="font-semibold">{rate.fromCurrency}</span>
                            <ChevronRight className="h-3 w-3 text-gray-400" />
                            <span className="font-semibold">{rate.toCurrency}</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            Rate: {rate.rate.toFixed(4)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {formatCurrency(rate.fromAmount)} {rate.fromCurrency}
                          </div>
                          <div className="text-primary-600 font-medium">
                            {formatCurrency(rate.toAmount)} {rate.toCurrency}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1 text-accent-500" />
                          Expires in {hoursLeft}h {minutesLeft}m
                        </div>
                        <Link 
                          to={`/rate-lock?id=${rate.id}`} 
                          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  );
                })}
                
                {activeRates.length > 3 && (
                  <div className="text-center pt-2">
                    <Link to="/rate-lock" className="text-primary-600 hover:text-primary-700 text-sm inline-flex items-center">
                      View {activeRates.length - 3} more active locks <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="bg-gray-50 inline-flex p-3 rounded-full mb-4">
                  <Lock className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No active rate locks</h3>
                <p className="text-gray-500 mb-4">
                  You don't have any active rate locks. Lock in a favorable rate now.
                </p>
                <Link to="/rate-lock" className="btn-primary">
                  Lock a Rate
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Currency converter */}
          <CurrencyConverter />
          
          {/* Currency distribution */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Currency Distribution</h2>
            <div className="flex justify-center mb-4">
              <div className="relative w-32 h-32">
                <PieChart className="w-32 h-32 text-gray-200" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-semibold text-gray-700">{userLockedRates.length}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-primary-500 mr-2"></div>
                  <span className="text-sm">USD/EUR</span>
                </div>
                <span className="text-sm font-medium">
                  {userLockedRates.filter(r => r.fromCurrency === 'USD' && r.toCurrency === 'EUR').length}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-secondary-500 mr-2"></div>
                  <span className="text-sm">EUR/USD</span>
                </div>
                <span className="text-sm font-medium">
                  {userLockedRates.filter(r => r.fromCurrency === 'EUR' && r.toCurrency === 'USD').length}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-accent-500 mr-2"></div>
                  <span className="text-sm">USD/GBP</span>
                </div>
                <span className="text-sm font-medium">
                  {userLockedRates.filter(r => r.fromCurrency === 'USD' && r.toCurrency === 'GBP').length}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-success-500 mr-2"></div>
                  <span className="text-sm">Other</span>
                </div>
                <span className="text-sm font-medium">
                  {userLockedRates.filter(r => 
                    !(
                      (r.fromCurrency === 'USD' && r.toCurrency === 'EUR') ||
                      (r.fromCurrency === 'EUR' && r.toCurrency === 'USD') ||
                      (r.fromCurrency === 'USD' && r.toCurrency === 'GBP')
                    )
                  ).length}
                </span>
              </div>
            </div>
          </div>
          
          {/* Recent activity */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            
            {userLockedRates.length > 0 ? (
              <div className="space-y-4">
                {userLockedRates.slice(0, 5).map((rate) => (
                  <div key={rate.id} className="flex items-start space-x-3">
                    <div className={`
                      p-2 rounded-full 
                      ${rate.status === 'active' ? 'bg-accent-100 text-accent-600' : 
                        rate.status === 'used' ? 'bg-success-100 text-success-600' : 
                        'bg-error-100 text-error-600'}
                    `}>
                      {rate.status === 'active' ? <Lock className="h-4 w-4" /> : 
                       rate.status === 'used' ? <DollarSign className="h-4 w-4" /> : 
                       <Clock className="h-4 w-4" />}
                    </div>
                    <div>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium text-sm">{rate.fromCurrency}/{rate.toCurrency}</span>
                        <span className="text-xs text-gray-500">
                          ({formatCurrency(rate.fromAmount)} {rate.fromCurrency})
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {format(new Date(rate.createdAt), 'MMM d, yyyy')}
                      </div>
                    </div>
                    <div className="flex-grow text-right">
                      <span className={`text-sm font-medium ${
                        rate.status === 'active' ? 'text-accent-600' : 
                        rate.status === 'used' ? 'text-success-600' : 
                        'text-error-600'
                      }`}>
                        {rate.status.charAt(0).toUpperCase() + rate.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">No activity yet</p>
              </div>
            )}
            
            {userLockedRates.length > 0 && (
              <div className="mt-4 pt-2 text-center">
                <Link to="/transactions" className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center">
                  View all activity <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;