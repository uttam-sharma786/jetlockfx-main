import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/LanguageSelector";
import Faq from "../components/layout/Faq.tsx";
import About from "../pages/About.tsx";
import Contact from "../pages/Contact.tsx";

const Header = () => {
  const { t, i18n } = useTranslation();
  
  return (
    <header className="w-full bg-gradient-to-r from-card/95 via-card/90 to-card/95 backdrop-blur-md border-b border-primary-glow/30 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Language Selector */}
          <div className="flex items-center space-x-4">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary-glow/20 via-accent/20 to-primary-glow/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
              <div className="relative bg-card/10 backdrop-blur-sm rounded-lg p-2 border border-primary-glow/20 group-hover:border-primary-glow/40 transition-all duration-300">
                <img 
                  src="/images/logo/jetlockfx_logo.jpg" 
                  alt="JetLock FX Logo" 
                  className="h-12 w-auto transition-all duration-300 group-hover:scale-105"
                />
              </div>
            </div>
            
            {/* Highlighted Language Selectors */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg opacity-75 blur-sm animate-pulse"></div>
              <div className="relative bg-primary/10 backdrop-blur-sm rounded-lg p-1 border border-primary/30 shadow-lg flex space-x-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`text-foreground hover:text-foreground/80 flex items-center space-x-2 ${i18n.language === 'en' ? 'bg-primary/20' : ''}`}
                  onClick={() => i18n.changeLanguage('en')}
                >
                  <img src="/images/logo/EN_logo.png" alt="US Flag" className="w-4 h-3" />
                  <span>EN</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`text-foreground hover:text-foreground/80 flex items-center space-x-2 ${i18n.language === 'es' ? 'bg-primary/20' : ''}`}
                  onClick={() => i18n.changeLanguage('es')}
                >
                  <img src="/images/logo/ES_logo.png" alt="Mexican Flag" className="w-4 h-3" />
                  <span>ES</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/About" className="text-foreground/80 hover:text-foreground transition-colors">
              {t('nav.about')}
            </a>
            <a href="/Contact" className="text-foreground/80 hover:text-foreground transition-colors">
              {t('nav.contact')}
            </a>
            <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="/Faq" className="text-foreground/80 hover:text-foreground transition-colors">
              FAQ
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;