import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe, DollarSign } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('SAR');

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Flights', path: '/flights' },
    { name: 'Hotels', path: '/hotels' },
    { name: 'Offers', path: '/offers' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top bar */}
      <div className="bg-teal-700 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex gap-4">
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-1 hover:text-teal-200 transition"
            >
              <Globe size={16} />
              {language === 'en' ? 'العربية' : 'English'}
            </button>
            <button
              onClick={() => setCurrency(currency === 'SAR' ? 'USD' : 'SAR')}
              className="flex items-center gap-1 hover:text-teal-200 transition"
            >
              <DollarSign size={16} />
              {currency}
            </button>
          </div>
          <div className="hidden md:flex gap-4">
            <a href="#" className="hover:text-teal-200 transition">My Bookings</a>
            <a href="#" className="hover:text-teal-200 transition">Help</a>
            <a href="#" className="hover:text-teal-200 transition">Sign In</a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            ✈️
          </div>
          <span className="hidden md:block font-bold text-xl text-gray-800">TravelHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-gray-700 hover:text-teal-600 font-medium transition"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* CTA Button + Mobile Menu */}
        <div className="flex items-center gap-4">
          <button className="hidden md:block bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition">
            Book Now
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden text-gray-800 hover:text-teal-600"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 py-4 px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block text-gray-700 hover:bg-teal-50 px-4 py-2 rounded transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <button className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition">
            Book Now
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
