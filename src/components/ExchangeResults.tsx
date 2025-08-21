import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ExchangeResults = () => {
  const { t } = useTranslation();
  const exchangeBureaus = [
    {
      id: 1,
      name: "Bureau Cambio",
      rate: "17.1",
      currency: "MXN",
      distance: "0.8 km",
      type: "bureau",
      icon: "🏦",
      isRecommended: true,
    },
    {
      id: 2,
      name: "Metro Exchange",
      rate: "17.1",
      currency: "MXN", 
      distance: "0.7 km",
      type: "metro",
      icon: "🚇",
      isRecommended: false,
    },
    {
      id: 3,
      name: "QuickCash",
      rate: "17.1",
      currency: "MXN",
      distance: "1.2 km",
      type: "quick",
      icon: "💸",
      isRecommended: false,
    },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      {exchangeBureaus.map((bureau, index) => (
        <Card 
          key={bureau.id} 
          className={`p-6 transition-all duration-300 hover:shadow-medium hover:scale-[1.02] ${
            bureau.isRecommended ? 'ring-2 ring-primary/20 bg-gradient-to-r from-primary/5 to-accent/5' : ''
          }`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Icon */}
              <div className="w-12 h-12 bg-gradient-subtle rounded-full flex items-center justify-center text-2xl">
                {bureau.icon}
              </div>
              
              {/* Info */}
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-lg text-card-foreground">{bureau.name}</h3>
                  {bureau.isRecommended && (
                    <Badge variant="secondary" className="bg-accent text-accent-foreground">
                      {t('results.recommended')}
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">{t('results.distance')}: {bureau.distance}</p>
              </div>
            </div>

            {/* Rate and Actions */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-card-foreground">
                  {bureau.rate} {bureau.currency}
                </div>
                <div className="text-sm text-muted-foreground">{t('results.perUsd')}</div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <Button variant="outline" size="sm" className="min-w-[100px]">
                  {t('results.compare')}
                </Button>
                <Button size="sm" className="min-w-[100px] bg-gradient-primary hover:opacity-90">
                  {t('results.viewMap')}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ExchangeResults;