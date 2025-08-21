import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const RealEstateSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 bg-gradient-subtle border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {t('realEstate.title')}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t('realEstate.description')}
          </p>
          <Button 
            size="lg" 
            className="px-8 py-3 text-base"
            onClick={() => window.open('https://forms.gle/jEbXx6eLe7cAxbSP7', '_blank')}
          >
            {t('realEstate.button')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RealEstateSection;