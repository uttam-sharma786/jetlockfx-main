import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BetaFeedbackSection = () => {
  const { t } = useTranslation();

  const surveyLinks = [
    {
      title: t('betaFeedback.travelersTitle'),
      description: t('betaFeedback.travelersDescription'),
      url: "https://tally.so/r/mZb1DA",
      icon: "✈️",
      color: "from-blue-500 to-purple-600"
    },
    {
      title: t('betaFeedback.businessTitle'),
      description: t('betaFeedback.businessDescription'),
      url: "https://tally.so/r/nr8Jpo",
      icon: "🏢",
      color: "from-green-500 to-teal-600"
    },
    {
      title: t('betaFeedback.bureauTitle'),
      description: t('betaFeedback.bureauDescription'),
      url: "https://tally.so/r/w4l9DA",
      icon: "🏪",
      color: "from-orange-500 to-red-600"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Badge variant="secondary" className="bg-accent text-accent-foreground text-lg px-4 py-2">
              {t('betaFeedback.betaBadge')}
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('betaFeedback.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('betaFeedback.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {surveyLinks.map((survey, index) => (
            <Card 
              key={index}
              className="p-6 text-center hover:shadow-strong transition-all duration-300 hover:scale-105 bg-card/80 backdrop-blur-sm"
            >
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${survey.color} rounded-full flex items-center justify-center text-2xl`}>
                {survey.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {survey.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 text-sm">
                {survey.description}
              </p>
              
              <Button 
                asChild 
                className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                <a href={survey.url} target="_blank" rel="noopener noreferrer">
                  {t('betaFeedback.takeSurvey')}
                </a>
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            {t('betaFeedback.thankYou')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BetaFeedbackSection;