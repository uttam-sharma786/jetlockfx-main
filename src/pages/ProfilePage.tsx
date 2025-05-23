import React, { useState } from 'react';
import { User, Mail, Key, Lock, Save, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useFxRate, Currency } from '../contexts/FxRateContext';

const ProfilePage: React.FC = () => {
  const { currentUser, userProfile } = useAuth();
  const { currencies } = useFxRate();
  
  const [name, setName] = useState(userProfile?.name || currentUser?.displayName || '');
  const [preferredCurrencies, setPreferredCurrencies] = useState<string[]>(
    userProfile?.preferredCurrencies || ['USD', 'EUR', 'GBP', 'JPY']
  );
  
  const [nameUpdated, setNameUpdated] = useState(false);
  const [currenciesUpdated, setCurrenciesUpdated] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  // Toggle a currency in the preferred list
  const toggleCurrency = (currencyCode: string) => {
    if (preferredCurrencies.includes(currencyCode)) {
      // Don't allow less than 2 preferred currencies
      if (preferredCurrencies.length > 2) {
        setPreferredCurrencies(preferredCurrencies.filter(c => c !== currencyCode));
      }
    } else {
      setPreferredCurrencies([...preferredCurrencies, currencyCode]);
    }
    setCurrenciesUpdated(true);
  };
  
  // Update profile info
  const handleUpdateProfile = () => {
    // In a real app, this would call an API to update the profile
    setTimeout(() => {
      setNameUpdated(true);
      setCurrenciesUpdated(false);
      
      setTimeout(() => {
        setNameUpdated(false);
      }, 3000);
    }, 1000);
  };
  
  // Change password (just a demo)
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API to change the password
    setIsChangingPassword(true);
    setTimeout(() => {
      setIsChangingPassword(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile info section */}
        <div className="lg:col-span-2">
          <div className="card p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <User className="w-5 h-5 mr-2 text-primary-600" />
              Personal Information
            </h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="label">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameUpdated(false);
                  }}
                  className="input"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="label">
                  Email Address
                </label>
                <div className="flex items-center">
                  <input
                    id="email"
                    type="email"
                    value={currentUser?.email || ''}
                    disabled
                    className="input bg-gray-50 text-gray-500"
                  />
                  <div className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                    Verified
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Your email cannot be changed
                </p>
              </div>
              
              <div>
                <label className="label block mb-2">
                  Preferred Currencies
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {currencies.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => toggleCurrency(currency.code)}
                      className={`
                        flex items-center px-3 py-2 rounded-lg border-2 transition-colors
                        ${preferredCurrencies.includes(currency.code) 
                          ? 'border-primary-500 bg-primary-50 text-primary-700' 
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'}
                      `}
                    >
                      <span className="mr-2">{currency.flag}</span>
                      <span>{currency.code}</span>
                      {preferredCurrencies.includes(currency.code) && (
                        <Check className="ml-auto w-4 h-4 text-primary-500" />
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  These currencies will be prioritized in your dashboard and converters
                </p>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={handleUpdateProfile}
                  className="btn-primary flex items-center"
                  disabled={nameUpdated}
                >
                  {nameUpdated ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Saved!
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Key className="w-5 h-5 mr-2 text-primary-600" />
              Change Password
            </h2>
            
            <form onSubmit={handleChangePassword} className="space-y-6">
              <div>
                <label htmlFor="currentPassword" className="label">
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  className="input"
                  placeholder="Enter your current password"
                />
              </div>
              
              <div>
                <label htmlFor="newPassword" className="label">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  className="input"
                  placeholder="Enter your new password"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 8 characters long
                </p>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="label">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="input"
                  placeholder="Confirm your new password"
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn-primary flex items-center"
                  disabled={isChangingPassword}
                >
                  {isChangingPassword ? (
                    <>
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 mr-2" />
                      Update Password
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Account summary */}
        <div>
          <div className="card p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <User className="w-5 h-5 mr-2 text-primary-600" />
              Account Summary
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-600">Account Type</span>
                <span className="font-medium">Standard</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium">
                  {userProfile?.createdAt 
                    ? new Date(userProfile.createdAt).toLocaleDateString() 
                    : new Date().toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-600">Last Login</span>
                <span className="font-medium">
                  {userProfile?.lastLogin 
                    ? new Date(userProfile.lastLogin).toLocaleDateString() 
                    : 'Today'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="card-glass p-6 bg-primary-50">
            <div className="flex items-start space-x-4">
              <div className="bg-primary-100 p-3 rounded-full">
                <Mail className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-900 mb-2">Stay Updated</h3>
                <p className="text-primary-700 text-sm mb-4">
                  Receive notifications about rate changes and new features.
                </p>
                <div className="flex items-center">
                  <div className="relative inline-block w-10 mr-2 align-middle">
                    <input 
                      type="checkbox" 
                      id="notifications" 
                      defaultChecked 
                      className="sr-only peer" 
                    />
                    <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-primary-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                  </div>
                  <label htmlFor="notifications" className="text-sm text-primary-700 cursor-pointer">
                    Email Notifications
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;