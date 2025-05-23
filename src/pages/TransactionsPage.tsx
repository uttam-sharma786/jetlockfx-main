import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ArrowUpDown, 
  Check,
  Download
} from 'lucide-react';
import { useFxRate, RateLock } from '../contexts/FxRateContext';

type SortField = 'date' | 'amount' | 'rate' | 'status';
type SortDirection = 'asc' | 'desc';
type StatusFilter = 'all' | 'active' | 'used' | 'expired';

const TransactionsPage: React.FC = () => {
  const { userLockedRates, getLockedRates, isLoading } = useFxRate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [transactions, setTransactions] = useState<RateLock[]>([]);
  
  useEffect(() => {
    getLockedRates();
  }, []);
  
  // Update active status for any expired locks
  useEffect(() => {
    const now = new Date();
    
    const updatedRates = userLockedRates.map(rate => {
      if (rate.status === 'active' && new Date(rate.expiresAt) <= now) {
        return { ...rate, status: 'expired' as const };
      }
      return rate;
    });
    
    filterAndSortTransactions(updatedRates);
  }, [userLockedRates, searchTerm, statusFilter, sortField, sortDirection]);
  
  // Filter and sort transactions
  const filterAndSortTransactions = (rates: RateLock[]) => {
    let filtered = [...rates];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(rate => {
        if (statusFilter === 'expired') {
          // Check if it's expired
          return rate.status === 'active' && new Date(rate.expiresAt) <= new Date();
        }
        return rate.status === statusFilter;
      });
    }
    
    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(rate => 
        rate.fromCurrency.toLowerCase().includes(search) ||
        rate.toCurrency.toLowerCase().includes(search) ||
        rate.reference.toLowerCase().includes(search)
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'date':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'amount':
          comparison = a.fromAmount - b.fromAmount;
          break;
        case 'rate':
          comparison = a.rate - b.rate;
          break;
        case 'status':
          const statusOrder: { [key: string]: number } = { 
            active: 0, 
            used: 1, 
            expired: 2 
          };
          const aStatus = a.status === 'active' && new Date(a.expiresAt) <= new Date() ? 'expired' : a.status;
          const bStatus = b.status === 'active' && new Date(b.expiresAt) <= new Date() ? 'expired' : b.status;
          comparison = statusOrder[aStatus] - statusOrder[bStatus];
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    setTransactions(filtered);
  };
  
  // Handle sort click
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  // Get status badge
  const getStatusBadge = (rate: RateLock) => {
    const now = new Date();
    const isExpired = rate.status === 'active' && new Date(rate.expiresAt) <= now;
    
    if (isExpired) {
      return <span className="badge bg-error-100 text-error-800">Expired</span>;
    } else if (rate.status === 'used') {
      return <span className="badge bg-success-100 text-success-800">Used</span>;
    } else {
      return <span className="badge bg-accent-100 text-accent-800">Active</span>;
    }
  };
  
  // Format amount with commas
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Transaction History</h1>
        <p className="text-gray-600">
          View and manage your rate lock transactions
        </p>
      </div>

      <div className="card overflow-visible mb-8">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by currency or reference..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Filter button */}
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="btn-outline flex items-center"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
                <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Export button */}
              <button className="btn-outline flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
          
          {/* Filter options */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setStatusFilter('all')}
                      className={`py-1 px-3 text-sm rounded-full flex items-center ${
                        statusFilter === 'all' 
                          ? 'bg-primary-100 text-primary-800 border border-primary-200' 
                          : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {statusFilter === 'all' && <Check className="h-3 w-3 mr-1" />}
                      All
                    </button>
                    <button
                      onClick={() => setStatusFilter('active')}
                      className={`py-1 px-3 text-sm rounded-full flex items-center ${
                        statusFilter === 'active' 
                          ? 'bg-accent-100 text-accent-800 border border-accent-200' 
                          : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {statusFilter === 'active' && <Check className="h-3 w-3 mr-1" />}
                      Active
                    </button>
                    <button
                      onClick={() => setStatusFilter('used')}
                      className={`py-1 px-3 text-sm rounded-full flex items-center ${
                        statusFilter === 'used' 
                          ? 'bg-success-100 text-success-800 border border-success-200' 
                          : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {statusFilter === 'used' && <Check className="h-3 w-3 mr-1" />}
                      Used
                    </button>
                    <button
                      onClick={() => setStatusFilter('expired')}
                      className={`py-1 px-3 text-sm rounded-full flex items-center ${
                        statusFilter === 'expired' 
                          ? 'bg-error-100 text-error-800 border border-error-200' 
                          : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {statusFilter === 'expired' && <Check className="h-3 w-3 mr-1" />}
                      Expired
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Transactions table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Currency Pair
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center">
                    Date
                    <ArrowUpDown className={`h-3 w-3 ml-1 ${sortField === 'date' ? 'text-primary-600' : 'text-gray-400'}`} />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('amount')}
                >
                  <div className="flex items-center">
                    Amount
                    <ArrowUpDown className={`h-3 w-3 ml-1 ${sortField === 'amount' ? 'text-primary-600' : 'text-gray-400'}`} />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('rate')}
                >
                  <div className="flex items-center">
                    Rate
                    <ArrowUpDown className={`h-3 w-3 ml-1 ${sortField === 'rate' ? 'text-primary-600' : 'text-gray-400'}`} />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">
                    Status
                    <ArrowUpDown className={`h-3 w-3 ml-1 ${sortField === 'status' ? 'text-primary-600' : 'text-gray-400'}`} />
                  </div>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                    </div>
                  </td>
                </tr>
              ) : transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.reference}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.fromCurrency}/{transaction.toCurrency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(transaction.createdAt), 'PPP p')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatAmount(transaction.fromAmount)} {transaction.fromCurrency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.rate.toFixed(4)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(transaction)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        to={`/rate-lock?id=${transaction.id}`} 
                        className="text-primary-600 hover:text-primary-900"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    {searchTerm || statusFilter !== 'all' ? (
                      <>
                        <p className="font-medium">No matching transactions found</p>
                        <p className="mt-1">Try changing your search or filter criteria</p>
                      </>
                    ) : (
                      <>
                        <p className="font-medium">No transactions yet</p>
                        <p className="mt-1">Your locked rates will appear here</p>
                      </>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;