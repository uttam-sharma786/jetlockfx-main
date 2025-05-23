import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, DollarSign, Zap } from 'lucide-react';
import CurrencyConverter from '../components/exchange/CurrencyConverter';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-black py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl text-white lg:text-6xl font-bold leading-tight">
                Lock in Your Best Exchange Rates
              </h1>
              <p className="text-lg md:text-xl text-primary-100">
                Secure favorable currency exchange rates for 24 hours with our rate-lock technology. Fast, reliable, and transparent foreign exchange.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                {currentUser ? (
                  <Link to="/rate-lock" className="btn-accent btn-lg">
                    Lock Your Rate Now
                  </Link>
                ) : (
                  <>
                    <Link to="/register" className="btn-accent btn-lg">
                      Get Started
                    </Link>
                    <Link to="/login" className="btn-outline bg-transparent border-white text-white hover:bg-white/10">
                      Log In
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
              <div className="w-full max-w-md transform hover:-translate-y-2 transition-transform duration-300">
                <CurrencyConverter />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-indigo-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Our JetLockFX Rate Service
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform offers a seamless experience with features designed to make currency exchange simple and secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
              <div className="bg-primary-100 text-primary-700 p-3 rounded-full w-fit mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Rate Lock</h3>
              <p className="text-gray-600">
                Lock in favorable exchange rates for 24 hours to protect against market fluctuations.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
              <div className="bg-secondary-100 text-secondary-700 p-3 rounded-full w-fit mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Real-time Rates</h3>
              <p className="text-gray-600">
                Access up-to-the-minute exchange rates from global currency markets.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
              <div className="bg-accent-100 text-accent-700 p-3 rounded-full w-fit mb-4">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">QR Code Transactions</h3>
              <p className="text-gray-600">
                Generate QR codes for locked rates to easily share or redeem your exchange.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
              <div className="bg-success-100 text-success-700 p-3 rounded-full w-fit mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Zero Hidden Fees</h3>
              <p className="text-gray-600">
                Transparent pricing with no hidden fees or charges for our currency exchange service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-lime-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these simple steps to lock in your preferred exchange rates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-xl p-8 shadow-sm relative">
              <div className="bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Choose Your Currencies
              </h3>
              <p className="text-gray-600 mb-4">
                Select the currencies you want to exchange and enter your desired amount.
              </p>
              <img 
                src="https://images.pexels.com/photos/6771607/pexels-photo-6771607.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Currency selection" 
                className="rounded-lg w-full h-40 object-cover"
              />
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl p-8 shadow-sm relative">
              <div className="bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Lock Your Rate
              </h3>
              <p className="text-gray-600 mb-4">
                Preview the exchange rate and lock it in for 24 hours with one click.
              </p>
              <img 
                src="https://images.pexels.com/photos/6863254/pexels-photo-6863254.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Locking rate" 
                className="rounded-lg w-full h-40 object-cover"
              />
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl p-8 shadow-sm relative">
              <div className="bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Get Your QR Code
              </h3>
              <p className="text-gray-600 mb-4">
                Receive a QR code to easily access and use your locked rate within 24 hours.
              </p>
              <img 
                src="https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="QR code" 
                className="rounded-lg w-full h-40 object-cover"
              />
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to={currentUser ? "/rate-lock" : "/register"} className="btn-primary btn-lg inline-flex items-center">
              Start Now <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Thousands of users trust our platform for their currency exchange needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=300" 
                  alt="User" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Sarah Johnson</h4>
                  <p className="text-gray-500">Business Traveler</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The rate-lock feature has saved me so much money during my business trips. I can lock in a rate when the market is favorable and use it later."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300" 
                  alt="User" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Michael Chen</h4>
                  <p className="text-gray-500">International Student</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "As a student receiving money from home, the QR code feature makes it easy to show the exact rate to my parents. No more confusion about exchange rates!"
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=300" 
                  alt="User" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Emma Rodriguez</h4>
                  <p className="text-gray-500">Small Business Owner</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "My import business depends on stable exchange rates. This platform gives me the security to know exactly what I'll pay for international orders."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Lock in Your Exchange Rates?
          </h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
            Join thousands of users who are already saving money with our rate-lock technology.
          </p>
          <Link to={currentUser ? "/rate-lock" : "/register"} className="btn-accent btn-lg">
            {currentUser ? "Lock Your Rate Now" : "Create Free Account"}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;