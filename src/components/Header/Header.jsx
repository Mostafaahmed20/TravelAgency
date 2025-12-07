import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe, DollarSign } from 'lucide-react';
import { useLanguage, translations } from '../../context/LanguageContext';
import { useCurrency } from '../../context/CurrencyContext';
import LocaleDropdown from './LocaleDropdown';
import Logo from '../Logo/Logo';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, setLanguage } = useLanguage();
  const { currency, setCurrency } = useCurrency();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const currencies = ['USD', 'EGP', 'SAR', 'AED'];
  const currencyFlags = {
    USD: '🇺🇸',
    EGP: '🇪🇬',
    SAR: '🇸🇦',
    AED: '🇦🇪',
  };
  const currencySymbols = {
    USD: '$',
    EGP: 'E£',
    SAR: 'ر.س',
    AED: 'د.إ',
  };
  const languageFlags = {
    en: '🇺🇸',
    ar: '🇸🇦',
  };

  const languageOptions = [
    { value: 'en', label: 'English', flag: languageFlags.en },
    { value: 'ar', label: 'العربية', flag: languageFlags.ar },
  ];

  const currencyOptions = currencies.map(c => ({
    value: c,
    label: c,
    flag: currencyFlags[c],
    subtitle: `${currencySymbols[c]} ${c}`,
  }));

  const navItems = [
    { name: translations[language].home, path: '/' },
    { name: translations[language].about, path: '/about' },
    { name: translations[language].contact, path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-teal-600 via-teal-600 to-blue-600 text-white py-2.5 px-4">
        <div className={`max-w-7xl mx-auto flex justify-between items-center text-sm ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <div className={`flex gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <div className="flex items-center gap-3">
              <LocaleDropdown
                value={language}
                options={languageOptions}
                onChange={(v) => setLanguage(v)}
              />

              <LocaleDropdown
                value={currency}
                options={currencyOptions}
                onChange={(v) => setCurrency(v)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className={`hidden lg:flex gap-6 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-gray-700 hover:text-teal-600 font-medium transition-all duration-200 text-[15px] relative group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* CTA Button + Mobile Menu */}
        <div className={`flex items-center gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <button 
            onClick={() => window.open('https://wa.me/201515196284', '_blank')}
            className="hidden md:block bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            {translations[language].bookNow}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden text-gray-800 hover:text-teal-600 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden bg-white border-t border-gray-200 py-4 px-4 space-y-2 shadow-xl animate-in slide-in-from-top ${language === 'ar' ? 'text-right' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block text-gray-700 hover:bg-teal-50 hover:text-teal-600 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <button 
            onClick={() => window.open('https://wa.me/201515196284', '_blank')}
            className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {translations[language].bookNow}
          </button>
        </div>
      )}
    </header>
  );
};
export default Header;
