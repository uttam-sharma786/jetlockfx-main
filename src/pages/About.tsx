import React from 'react';
import { Link } from 'react-router-dom';

interface AboutPageProps {
  readonly className?: string;
}

const AboutPage: React.FC<AboutPageProps> = ({ className = '' }) => {
  return (
    <main className={`about-page ${className}`.trim()}>
      <section 
        className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16 md:py-24 min-h-screen flex items-center"
        aria-labelledby="about-heading"
      >
        {/* Background overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="container relative z-10 mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="text-center md:text-left max-w-4xl">
              {/* Transparent card overlay */}
              <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
                <h1 
                  id="about-heading"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white drop-shadow-lg"
                >
                  About JetLock Fx
                </h1>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 font-medium">
                  JetLock Fx is the first physical currency exchange comparison tool where travelers
                  can search, compare, and reserve exchange rates from trusted local businesses.
                </p>
                
                {/* Enhanced CTA button */}
                {/* <div className="mt-8">
                  <Link
                    to="/services"
                    className="inline-block bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent border border-white/30 hover:border-white/50 hover:shadow-lg hover:scale-105 transform"
                    aria-label="Learn more about our services"
                  >
                    Learn More
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;