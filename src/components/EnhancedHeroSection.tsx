import { Suspense, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Shield, Zap, RefreshCw } from 'lucide-react';

// API Configuration
const API_CONFIG = {
  // Option 1: Free tier with good rates
  exchangeRatesAPI: {
    baseUrl: 'https://api.exchangerate-api.com/v4/latest/USD',
    Alternative: 'https://api.exchangerate-api.com/v4/latest/USD'
  },
  
  // Option 2: Professional tier (recommended for production)
  // fixer: {
  //   baseUrl: '#',
  //   apiKey: process.env.ACCESS_KEY, // Your API key
  // },
  
  // Cities/Locations API
  cities: {
    baseUrl: 'https://api.teleport.org/api/cities',
    // Alternative: OpenCage Geocoding API
  }
};

// Currency Exchange Service
class ExchangeService {
  static async getRates(baseCurrency = 'USD') {
    try {
      // Using exchangerate-api.com (free tier)
      const apiResponse = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      // const response = await fetch(`${API_CONFIG.exchangeRatesAPI.baseUrl}/${baseCurrency}`);
      const response = await apiResponse.json();
      if (!response.ok) throw new Error('Failed to fetch rates');
      
      const data = await response.json();
      return {
        rates: data.rates,
        lastUpdated: data.date,
        baseCurrency: data.base
      };
    } catch (error) {
      console.error('Exchange rate fetch error:', error);
      // Fallback rates
      return {
        rates: { MXN: 17.85, EUR: 0.85, GBP: 0.73, CAD: 1.25 },
        lastUpdated: new Date().toISOString().split('T')[0],
        baseCurrency: 'USD'
      };
    }
  }

  static async convertCurrency(amount, fromCurrency, toCurrency) {
    const rates = await this.getRates(fromCurrency);
    const rate = rates.rates[toCurrency];
    return rate ? amount * rate : null;
  }
}

// Cities Service
class CitiesService {
  static async searchCities(query) {
    try {
      const response = await fetch(
        `https://api.teleport.org/api/cities/?search=${encodeURIComponent(query)}&limit=10`
      );
      if (!response.ok) throw new Error('Failed to fetch cities');
      
      const data = await response.json();
      return data._embedded ? data._embedded['city:search-results'].map(city => ({
        name: city.matching_full_name,
        slug: city._links['city:item'].href.split('/').pop()
      })) : [];
    } catch (error) {
      console.error('Cities fetch error:', error);
      return [];
    }
  }
}

const HeroSection = () => {
  const { t } = useTranslation();
  const [exchangeData, setExchangeData] = useState({
    fromCurrency: 'USD',
    toCurrency: 'MXN',
    amount: 1000,
    convertedAmount: null,
    city: '',
    cities: [],
    rates: {},
    loading: false,
    lastUpdated: null
  });

  // Load exchange rates on component mount
  useEffect(() => {
    loadExchangeRates();
  }, []);

  const loadExchangeRates = async () => {
    setExchangeData(prev => ({ ...prev, loading: true }));
    try {
      const rateData = await ExchangeService.getRates(exchangeData.fromCurrency);
      const converted = await ExchangeService.convertCurrency(
        exchangeData.amount, 
        exchangeData.fromCurrency, 
        exchangeData.toCurrency
      );
      
      setExchangeData(prev => ({
        ...prev,
        rates: rateData.rates,
        convertedAmount: converted,
        lastUpdated: rateData.lastUpdated,
        loading: false
      }));
    } catch (error) {
      console.error('Failed to load rates:', error);
      setExchangeData(prev => ({ ...prev, loading: false }));
    }
  };

  const handleCitySearch = async (query) => {
    if (query.length < 2) return;
    const cities = await CitiesService.searchCities(query);
    setExchangeData(prev => ({ ...prev, cities }));
  };

  const handleExchange = async () => {
    setExchangeData(prev => ({ ...prev, loading: true }));
    
    // Simulate API call for exchange search
    setTimeout(() => {
      console.log('Searching for exchange options:', {
        from: exchangeData.fromCurrency,
        to: exchangeData.toCurrency,
        amount: exchangeData.amount,
        city: exchangeData.city
      });
      setExchangeData(prev => ({ ...prev, loading: false }));
    }, 1500);
  };

  return (
    <section className="relative py-24 md:py-32 bg-gradient-hero overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
      <div className="absolute inset-0 bg-pattern opacity-30"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Trust Indicators */}
        <div className="flex items-center justify-center gap-6 mb-8 text-background text-sm font-medium">
          <div className="flex items-center gap-2 bg-background/20 backdrop-blur-sm px-3 py-2 rounded-full">
            <Shield className="h-4 w-4" />
            <span>{t('hero.trustIndicator1', 'Secure & Licensed')}</span>
          </div>
          <div className="flex items-center gap-2 bg-background/20 backdrop-blur-sm px-3 py-2 rounded-full">
            <Zap className="h-4 w-4" />
            <span>{t('hero.trustIndicator2', 'Real-time Rates')}</span>
          </div>
          <div className="flex items-center gap-2 bg-background/20 backdrop-blur-sm px-3 py-2 rounded-full">
            <Star className="h-4 w-4" />
            <span>{t('hero.trustIndicator3', '4.9★ Rating')}</span>
          </div>
        </div>

        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-background mb-8 leading-tight tracking-tight">
            {t('hero.title', 'Find the Best')}
            <br />
            <span className="text-background/90 text-gradient">{t('hero.titleSpan', 'Exchange Rates')}</span>
          </h1>
          <p className="text-xl md:text-2xl text-background/80 max-w-3xl mx-auto leading-relaxed mb-8">
            {t('hero.subtitle', 'Compare real-time exchange rates from trusted providers in your city')}
          </p>
          
          {/* Enhanced CTA Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button 
              variant="hero" 
              size="lg"
              className="px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              {t('hero.secondaryCTA', 'Watch Demo')}
            </Button>
          </div>

          {/* Social Proof */}
          <div className="text-background/90 text-sm font-medium bg-background/15 backdrop-blur-sm px-4 py-2 rounded-full inline-block">
            <p>{t('hero.socialProof', 'Trusted by 50,000+ travelers worldwide')}</p>
          </div>
        </div>

        {/* Enhanced Exchange Form with API Integration */}
        <div className="max-w-5xl mx-auto animate-slide-up">
          <Suspense fallback={
            <div className="bg-card shadow-medium border border-border/50 backdrop-blur-sm p-8 animate-pulse rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-muted rounded h-12 w-full"></div>
                ))}
              </div>
              <div className="animate-pulse bg-muted rounded h-12 w-full mt-6"></div>
            </div>
          }>
            <div className="bg-card shadow-medium border border-border/50 backdrop-blur-sm p-8 rounded-lg transition-all duration-300 hover:shadow-strong hover:scale-[1.02]">
              {/* Rate Update Indicator */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Last updated: {exchangeData.lastUpdated || 'Loading...'}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={loadExchangeRates}
                  disabled={exchangeData.loading}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${exchangeData.loading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    {t('exchange.fromLabel', 'From')}
                  </label>
                  <select 
                    value={exchangeData.fromCurrency}
                    onChange={(e) => setExchangeData(prev => ({ ...prev, fromCurrency: e.target.value }))}
                    className="w-full h-14 bg-background/80 rounded-lg px-4 text-lg border border-input focus:ring-2 focus:ring-primary"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                  </select>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    {t('exchange.toLabel', 'To')}
                  </label>
                  <select 
                    value={exchangeData.toCurrency}
                    onChange={(e) => setExchangeData(prev => ({ ...prev, toCurrency: e.target.value }))}
                    className="w-full h-14 bg-background/80 rounded-lg px-4 text-lg border border-input focus:ring-2 focus:ring-primary"
                  >
                    <option value="MXN">MXN - Mexican Peso</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                  </select>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    {t('exchange.amountLabel', 'Amount')}
                  </label>
                  <input
                    type="number"
                    value={exchangeData.amount}
                    onChange={(e) => setExchangeData(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                    className="w-full h-14 bg-background/80 rounded-lg px-4 text-lg border border-input focus:ring-2 focus:ring-primary"
                    placeholder="1,000"
                  />
                  {exchangeData.convertedAmount && (
                    <div className="text-sm text-muted-foreground">
                      ≈ {exchangeData.convertedAmount.toFixed(2)} {exchangeData.toCurrency}
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    {t('exchange.cityLabel', 'City')}
                  </label>
                  <input
                    type="text"
                    value={exchangeData.city}
                    onChange={(e) => {
                      setExchangeData(prev => ({ ...prev, city: e.target.value }));
                      handleCitySearch(e.target.value);
                    }}
                    className="w-full h-14 bg-background/80 rounded-lg px-4 text-lg border border-input focus:ring-2 focus:ring-primary"
                    placeholder={t('exchange.selectCity', 'Select city')}
                  />
                  {exchangeData.cities.length > 0 && (
                    <div className="absolute z-10 w-full bg-background border border-input rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {exchangeData.cities.map((city, index) => (
                        <div
                          key={index}
                          onClick={() => setExchangeData(prev => ({ ...prev, city: city.name, cities: [] }))}
                          className="px-4 py-2 hover:bg-muted cursor-pointer"
                        >
                          {city.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <Button 
                onClick={handleExchange}
                disabled={exchangeData.loading}
                className="w-full mt-8 h-14 text-lg font-semibold bg-gradient-primary text-primary-foreground shadow-medium hover:shadow-strong hover:scale-105 transition-all duration-300"
              >
                {exchangeData.loading ? (
                  <RefreshCw className="h-5 w-5 animate-spin mr-2" />
                ) : null}
                {t('exchange.searchButton', 'Find Best Rates')}
              </Button>
            </div>
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;