import React from 'react';
import { Link } from 'react-router-dom';

interface ContactPageProps {
  className?: string;
}

const ContactPage: React.FC<ContactPageProps> = ({ className = '' }) => {
  return (
    <main className={`contact-page ${className}`.trim()}>
      <section 
        className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-16 md:py-24"
        aria-labelledby="contact-heading"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="text-center md:text-left max-w-4xl">
              <h2 
                id="contact-heading"
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white"
              >
                info@jetock.com
              </h2>
              
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

export default ContactPage