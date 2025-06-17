import React from 'react';
import { Link } from 'react-router-dom';

interface AboutPageProps {
  className?: string;
}

const AboutPage: React.FC<AboutPageProps> = ({ className = '' }) => {
  return (
    <main className={`about-page ${className}`.trim()}>
      <section 
        className="bg-gradient-to-br from-blue-900 to-blue-900 text-white py-16 md:py-24"
        aria-labelledby="about-heading"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="text-center md:text-left max-w-4xl">
              <h1 
                id="about-heading"
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white"
              >
                About JetLock Fx
              </h1>
              <p className="text-lg md:text-xl text-primary-100 leading-relaxed">
                JetLock Fx is the first physical currency exchange comparison tool where travelers
                can search, compare, and reserve exchange rates from trusted local businesses.
              </p>
              {/* <div className="mt-8">
                <Link
                  to="/services"
                  className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  aria-label="Learn more about our services"
                >
                  Learn More
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;