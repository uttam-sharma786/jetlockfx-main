import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, DollarSign, Zap } from 'lucide-react';
import CurrencyConverter from '../components/exchange/CurrencyConverter';
import { useAuth } from '../contexts/AuthContext';
import Faq from"../components/layout/Faq";


const HomePage: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-900 text-black py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl text-white lg:text-6xl font-bold leading-tight">
                Lock in secure Currency.<br/>
                Wherver you jet
              </h1>
              {/* <p className="text-lg md:text-xl text-primary-100">
                Secure favorable currency exchange rates for 24 hours with our rate-lock technology. <br/>
                Fast, reliable, and transparent foreign exchange.
              </p> */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                {currentUser ? (
                  <Link to="/register" className="btn-accent btn-lg">
                    sign Up Now
                  </Link>
                ) : (
                  <div className="flex gap-4">
                    <Link to="/register" className="btn-accent text-white border-2 border-indigo-600 btn-lg hover:bg-indigo-700 hover:border-indigo-700 transition-colors duration-200">
                    Try Demo Now
                    </Link>
                    <Link to="/contact" className="btn-accent text-white border-2 border-indigo-600 btn-lg hover:bg-indigo-700 hover:border-indigo-700 transition-colors duration-200">
                    Contact Us
                    </Link>
                    <Link to="/pilot" className="btn-accent text-white border-2 border-indigo-600 btn-lg hover:bg-indigo-700 hover:border-indigo-700 transition-colors duration-200">
                    Pilot
                    </Link>
                  </div>
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
      {/* <section className="py-16 bg-indigo-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Our JetLockFX Rate Service
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform offers a seamless experience with features designed to make currency exchange simple and secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> */}
            {/* Feature 1 */}
            {/* <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
              <div className="bg-primary-100 text-primary-700 p-3 rounded-full w-fit mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Rate Lock</h3>
              <p className="text-gray-600">
                Lock in favorable exchange rates for 24 hours to protect against market fluctuations.
              </p>
            </div> */}

            {/* Feature 2 */}
            {/* <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
              <div className="bg-secondary-100 text-secondary-700 p-3 rounded-full w-fit mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Real-time Rates</h3>
              <p className="text-gray-600">
                Access up-to-the-minute exchange rates from global currency markets.
              </p>
            </div> */}

            {/* Feature 3 */}
            {/* <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
              <div className="bg-accent-100 text-blue-900 p-3 rounded-full w-fit mb-4">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">QR Code Transactions</h3>
              <p className="text-gray-600">
                Generate QR codes for locked rates to easily share or redeem your exchange.
              </p>
            </div> */}

            {/* Feature 4 */}
            {/* <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
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
      </section> */}

      {/* How It Works Section */}
      {/* <section className="py-16 bg-lime-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these simple steps to lock in your preferred exchange rates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> */}
            {/* Step 1 */}
            {/* <div className="bg-white rounded-xl p-8 shadow-sm relative">
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
            </div> */}

            {/* Step 2 */}
            {/* <div className="bg-white rounded-xl p-8 shadow-sm relative">
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
            </div> */}

            {/* Step 3 */}
            {/* <div className="bg-white rounded-xl p-8 shadow-sm relative">
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
      </section> */}

      {/* How it works */}
      <section className="py-16 bg-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        How it works
      </h2>
      {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Thousands of users trust our platform for their currency exchange needs
      </p> */}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {/* Register Bureaus */}
      <div className="bg-gray-50 rounded-xl p-8 shadow-sm text-center">
        <h4 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          For Exchange Bureaus
        </h4>
        <p className="text-gray-600 mb-6 text-lg">
          Boost your visibility<br />
          Free listing pilot now
        </p>
        <Link to="/register" className="btn-accent btn-lg">
          List Your Bureau
        </Link>
      </div>

      {/* Register Tourists */}
      <div className="bg-gray-50 rounded-xl p-8 shadow-sm text-center">
        <h4 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          For Tourists and Public
        </h4>
        <p className="text-gray-600 mb-6 text-lg">
          Compare, lock, and exchange smarter wherever you jet
        </p>
        <Link to="/register" className="btn-accent btn-lg">
          Register Here
        </Link>
      </div>
    </div>
  </div>
</section>
      <section>
        
      </section>

      {/* CTA Section */}
      {/* <section className="bg-gradient-to-br from-indigo-900 to-indigo-600  text-white py-16 ">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Lock in Your Exchange Rates?
          </h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
            Supercharge your Travel Experience with JetLockFx .
          </p>
          <Link to={currentUser ? "/rate-lock" : "/register"} className="btn-accent btn-lg">
            {currentUser ? "Lock Your Rate Now" : "Create Free Account"}
          </Link>
        </div>
      </section> */}

      
    </div>
  );
};

export default HomePage;