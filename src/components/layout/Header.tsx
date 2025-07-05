import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  LogOut, 
  User, 
  DollarSign, 
  ClipboardList, 
  Home,
  Lock,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';


const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  return (
    <header className="bg-zinc-100 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenus}>
            {/* <DollarSign className="w-7 h-7 text-primary-600" /> */}
            <img src="./logo/Exchange.jpeg" width={70} height={70} alt="jetlock_logo" />
            <span className="text-xl font-bold text-gray-800">JetLockFX</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">
              Home
            </Link>
            <Link to= "/AboutPage" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">
              About
            </Link>
            {/* <Link to= "/PilotTab" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">
              Pilot Tab
            </Link> */}
            <Link to="/ContactPage" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">
              Contact
            </Link>
            <Link to="/Faq" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">
              FAQ
            </Link>

            {currentUser ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">
                  Dashboard
                </Link>
                <Link to="/rate-lock" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">
                  Lock Rates
                </Link>
                <Link to="/transactions" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">
                  Transactions
                </Link>

                {/* Profile dropdown */}
                <div className="relative">
                  <button 
                    onClick={toggleProfileMenu}
                    className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors duration-200"
                  >
                    <span>{currentUser.displayName || currentUser.email}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 animate-fade-in">
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center" 
                        onClick={closeMenus}
                      >
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                      <button 
                        onClick={() => {
                          handleLogout();
                          closeMenus();
                        }} 
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Sign up
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-slide-up">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <Link 
              to="/" 
              className="block py-2 text-gray-600 hover:text-primary-600 flex items-center" 
              onClick={closeMenus}
            >
              <Home className="w-5 h-5 mr-2" />
              Home
            </Link>
            
            {currentUser ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="block py-2 text-gray-600 hover:text-primary-600 flex items-center" 
                  onClick={closeMenus}
                >
                  <DollarSign className="w-5 h-5 mr-2" />
                  Dashboard
                </Link>
                <Link 
                  to="/rate-lock" 
                  className="block py-2 text-gray-600 hover:text-primary-600 flex items-center" 
                  onClick={closeMenus}
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Lock Rates
                </Link>
                <Link 
                  to="/transactions" 
                  className="block py-2 text-gray-600 hover:text-primary-600 flex items-center" 
                  onClick={closeMenus}
                >
                  <ClipboardList className="w-5 h-5 mr-2" />
                  Transactions
                </Link>
                <Link 
                  to="/profile" 
                  className="block py-2 text-gray-600 hover:text-primary-600 flex items-center" 
                  onClick={closeMenus}
                >
                  <User className="w-5 h-5 mr-2" />
                  Profile
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    closeMenus();
                  }} 
                  className="block w-full text-left py-2 text-gray-600 hover:text-primary-600 flex items-center"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Sign out
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Link
                  to="/login"
                  className="btn-outline w-full text-center"
                  onClick={closeMenus}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="btn-primary w-full text-center"
                  onClick={closeMenus}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;