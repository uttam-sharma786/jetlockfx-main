import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Logo and About Section */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center space-x-3 mb-6 group">
                <div className="relative">
                  <img 
                    src="/images/logo/Exchange.jpeg" 
                    width={60} 
                    height={60} 
                    alt="JetLockFX logo" 
                    className="rounded-xl shadow-lg group-hover:shadow-blue-500/25 transition-shadow duration-300"
                  />
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  JetLockFX
                </span>
              </Link>
              
              <p className="text-gray-300 mb-6 text-lg leading-relaxed max-w-md">
                Your trusted home for foreign exchange. Experience fast, reliable, 
                and transparent currency trading with competitive rates.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span>info@jetlockfx.com.</span>
                </div>
                {/* <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span>+1 (555) 123-4567</span>
                </div> */}
                {/* <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span>New York, NY 10001</span>
                </div> */}
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="p-3 bg-gray-800/50 rounded-full text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300 hover:scale-110"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="p-3 bg-gray-800/50 rounded-full text-gray-400 hover:text-white hover:bg-blue-700 transition-all duration-300 hover:scale-110"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="p-3 bg-gray-800/50 rounded-full text-gray-400 hover:text-white hover:bg-pink-600 transition-all duration-300 hover:scale-110"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-white relative">
                Quick Links
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
              </h3>
              <ul className="space-y-3">
                {[
                  { to: "/", label: "Home" },
                  { to: "/dashboard", label: "Dashboard" },
                  { to: "/rate-lock", label: "Lock Rates" },
                  { to: "/transactions", label: "Transactions" },
                  { to: "/analytics", label: "Analytics" }
                ].map((link) => (
                  <li key={link.to}>
                    <Link 
                      to={link.to} 
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-white relative">
                Company
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
              </h3>
              <ul className="space-y-3">
                {[
                  { href: "/about", label: "About Us" },
                  { href: "/contact", label: "Contact Us" },
                  { href: "/terms", label: "Terms of Service" },
                  { href: "/privacy", label: "Privacy Policy" }
                ].map((link) => (
                  <li key={link.href}>
                    <a 
                      href={link.href} 
                      className="text-gray-300 hover:text-blue-900 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700/50 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} JetLockFX Exchange. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="/security" className="hover:text-blue-400 transition-colors duration-200">
                Security
              </a>
              <a href="/compliance" className="hover:text-blue-400 transition-colors duration-200">
                Compliance
              </a>
              {/* <a href="/api" className="hover:text-blue-400 transition-colors duration-200">
                API
              </a> */}
            </div>
          </div>
        </div>

        {/* Brand Name Display */}
        <div className="py-8 text-center">
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 bg-clip-text text-transparent opacity-50 select-none">
            JETLOCKFX
          </h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;