import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import EnhancedHeroSection from "@/components/EnhancedHeroSection";
import ExchangeResultsEnhanced from "@/components/ExchangeResultsEnhanced";
import HowItWorks from "@/components/HowItWorks";
import UserTypeSection from "@/components/UserTypeSection";
import BetaFeedbackSection from "@/components/BetaFeedbackSection";
import IncubatorsSection from "@/components/IncubatorsSection";
import RealEstateSection from "@/components/RealEstateSection";
import Footer from "@/components/Footer";

const Index = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Enhanced Hero Section */}
      <EnhancedHeroSection />

      {/* Enhanced Results Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                {t('exchange.title')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('exchange.subtitle', 'Live rates updated every minute. Compare and reserve the best deals instantly.')}
              </p>
            </div>
            <ExchangeResultsEnhanced />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* User Types */}
      <UserTypeSection />

      {/* Beta Feedback */}
      <BetaFeedbackSection />

       {/* Incubators and Accelerators */}
      <IncubatorsSection />
      {/* Real Estate Interest */}
      <RealEstateSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;