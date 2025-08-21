import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, MapPin, Clock, Shield, Star } from 'lucide-react';

const ExchangeResultsEnhanced = () => {
  const { t } = useTranslation();

  const exchangeBureaus = [
    {
      id: 1,
      name: "Bureau Cambio",
      rate: "17.15",
      currency: "MXN",
      distance: "0.8 km",
      type: "bureau",
      icon: "🏦",
      isRecommended: true,
      trend: "+0.05",
      openUntil: "22:00",
      verified: true,
      savings: "Save $12.50",
      rating: 4.8,
      reviewCount: 127
    },
    {
      id: 2,
      name: "Metro Exchange",
      rate: "17.12",
      currency: "MXN", 
      distance: "0.7 km",
      type: "metro",
      icon: "🚇",
      isRecommended: false,
      trend: "+0.02",
      openUntil: "20:00",
      verified: true,
      savings: "Save $9.80",
      rating: 4.6,
      reviewCount: 89
    },
    {
      id: 3,
      name: "QuickCash",
      rate: "17.08",
      currency: "MXN",
      distance: "1.2 km",
      type: "quick",
      icon: "💸",
      isRecommended: false,
      trend: "-0.01",
      openUntil: "18:00",
      verified: false,
      savings: "Save $5.20",
      rating: 4.2,
      reviewCount: 45
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 text-center bg-gradient-to-br from-primary/5 to-transparent">
          <TrendingUp className="h-5 w-5 mx-auto mb-2 text-primary" />
          <div className="text-lg font-bold text-foreground">17.15</div>
          <div className="text-sm text-muted-foreground">{t('results.bestRate', 'Best Rate')}</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-accent/5 to-transparent">
          <MapPin className="h-5 w-5 mx-auto mb-2 text-accent" />
          <div className="text-lg font-bold text-foreground">12</div>
          <div className="text-sm text-muted-foreground">{t('results.nearby', 'Nearby')}</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-chart-3/20 to-transparent">
          <Clock className="h-5 w-5 mx-auto mb-2 text-chart-3" />
          <div className="text-lg font-bold text-foreground">24/7</div>
          <div className="text-sm text-muted-foreground">{t('results.available', 'Available')}</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-chart-2/20 to-transparent">
          <Shield className="h-5 w-5 mx-auto mb-2 text-chart-2" />
          <div className="text-lg font-bold text-foreground">9</div>
          <div className="text-sm text-muted-foreground">{t('results.verified', 'Verified')}</div>
        </Card>
      </div>

      {exchangeBureaus.map((bureau, index) => (
        <Card 
          key={bureau.id} 
          className={`p-4 md:p-6 transition-all duration-300 hover:shadow-strong hover:scale-[1.01] transform will-change-transform ${
            bureau.isRecommended ? 'ring-2 ring-primary/20 bg-gradient-to-r from-primary/5 to-accent/5' : 'bg-card shadow-medium border border-border/50 backdrop-blur-sm'
          }`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3 md:space-x-4">
              {/* Enhanced Icon */}
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-subtle rounded-xl flex items-center justify-center text-xl md:text-2xl shadow-medium">
                {bureau.icon}
              </div>
              
              {/* Enhanced Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-3 mb-2">
                  <h3 className="font-bold text-lg md:text-xl text-card-foreground">{bureau.name}</h3>
                  <div className="flex items-center space-x-2">
                    {bureau.isRecommended && (
                      <Badge variant="secondary" className="bg-primary text-primary-foreground font-medium text-xs">
                        {t('results.recommended')}
                      </Badge>
                    )}
                    {bureau.verified && (
                      <Badge variant="outline" className="border-accent text-accent text-xs">
                        <Shield className="h-3 w-3 mr-1" />
                        {t('results.verifiedBadge', 'Verified')}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {t('results.distance')}: {bureau.distance}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {t('results.openUntil', 'Open until')}: {bureau.openUntil}
                  </span>
                </div>
                {/* Rating */}
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(bureau.rating) 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : i < bureau.rating 
                            ? 'text-yellow-400 fill-yellow-400/50'
                            : 'text-muted-foreground/30'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-foreground">{bureau.rating}</span>
                  <span className="text-sm text-muted-foreground">({bureau.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            {/* Enhanced Rate and Actions */}
            <div className="flex items-center justify-between md:justify-end space-x-4 md:space-x-6 mt-4 md:mt-0">
              <div className="text-left md:text-right">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="text-2xl md:text-3xl font-bold text-card-foreground">
                    {bureau.rate} {bureau.currency}
                  </div>
                  <div className={`text-sm px-2 py-1 rounded-full ${
                    bureau.trend.startsWith('+') ? 'bg-chart-2/20 text-chart-2' : 'bg-chart-4/20 text-chart-4'
                  }`}>
                    {bureau.trend}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{t('results.perUsd')}</div>
                <div className="text-sm font-medium text-chart-2">{bureau.savings}</div>
              </div>
              
              <div className="flex flex-col space-y-3">
                <Button size="sm" className="min-w-[120px] bg-gradient-primary text-primary-foreground shadow-medium hover:shadow-strong hover:scale-105 transition-all duration-300">
                  {t('results.reserve', 'Reserve Now')}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}

      {/* Load More */}
      <div className="text-center pt-6">
        <Button variant="outline" size="lg" className="px-8">
          {t('results.loadMore', 'Load More Results')}
        </Button>
      </div>
    </div>
  );
};

export default ExchangeResultsEnhanced;