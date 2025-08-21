import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const ExchangeForm = () => {
  const { t } = useTranslation();
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("MXN");
  const [amount, setAmount] = useState("");
  const [city, setCity] = useState("");

  const currencies = [
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "MXN", name: "Mexican Peso" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "JPY", name: "Japanese Yen" },
  ];

  return (
    <Card className="p-8 shadow-strong bg-card border-2 border-border backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* From Currency */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-foreground uppercase tracking-wider">{t('exchange.fromLabel')}</label>
          <Select value={fromCurrency} onValueChange={setFromCurrency}>
            <SelectTrigger className="h-14 border-2 bg-input text-foreground font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-2 border-border shadow-strong">
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code} className="text-popover-foreground font-medium">
                  {currency.name} ({currency.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* To Currency */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-foreground uppercase tracking-wider">{t('exchange.toLabel')}</label>
          <Select value={toCurrency} onValueChange={setToCurrency}>
            <SelectTrigger className="h-14 border-2 bg-input text-foreground font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-2 border-border shadow-strong">
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code} className="text-popover-foreground font-medium">
                  {currency.name} ({currency.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Amount */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-foreground uppercase tracking-wider">{t('exchange.amountLabel')}</label>
          <Input
            type="number"
            placeholder="1,000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="h-14 border-2 bg-input text-foreground text-lg font-semibold placeholder:text-muted-foreground"
          />
        </div>

        {/* City */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-foreground uppercase tracking-wider">{t('exchange.cityLabel')}</label>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="h-14 border-2 bg-input text-foreground font-medium">
              <SelectValue placeholder={t('exchange.selectCity')} />
            </SelectTrigger>
            <SelectContent className="bg-popover border-2 border-border shadow-strong">
              <SelectItem value="mexico-city" className="text-popover-foreground font-medium">Mexico City</SelectItem>
              <SelectItem value="cancun" className="text-popover-foreground font-medium">Cancun</SelectItem>
              <SelectItem value="guadalajara" className="text-popover-foreground font-medium">Guadalajara</SelectItem>
              <SelectItem value="monterrey" className="text-popover-foreground font-medium">Monterrey</SelectItem>
              <SelectItem value="playa-del-carmen" className="text-popover-foreground font-medium">Playa del Carmen</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button className="w-full mt-8 h-14 bg-gradient-primary hover:opacity-90 transition-all duration-300 text-lg font-semibold shadow-medium hover:shadow-strong" size="lg">
        {t('exchange.searchButton')}
      </Button>
    </Card>
  );
};

export default ExchangeForm;