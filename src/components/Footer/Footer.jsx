import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage, translations } from '../../context/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className={`max-w-7xl mx-auto px-4 py-16 ${language === 'ar' ? 'text-right' : ''}`}>
        {/* Footer Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 ${language === 'ar' ? 'text-right' : ''}`}>
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{translations[language].aboutMilesTravel}</h3>
            <p className="text-sm leading-relaxed">
              {translations[language].discoverTheWorld}
            </p>
            <div className={`flex gap-4 mt-4 ${language === 'ar' ? 'flex-row-reverse justify-end' : ''}`}>
              <a href="https://www.facebook.com/profile.php?id=61583944513951" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition"><Facebook size={20} /></a>
              <a href="https://www.miles-travel.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition"><Twitter size={20} /></a>
              <a href="https://www.miles-travel.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{translations[language].quickLinks}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-teal-400 transition">{translations[language].home}</Link></li>
              <li><Link to="/flights" className="hover:text-teal-400 transition">{translations[language].flights}</Link></li>
              <li><Link to="/hotels" className="hover:text-teal-400 transition">{translations[language].hotels}</Link></li>
              <li><Link to="/offers" className="hover:text-teal-400 transition">{translations[language].offers}</Link></li>
              <li><Link to="/about" className="hover:text-teal-400 transition">{translations[language].about}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{translations[language].services}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-teal-400 transition">{translations[language].flightBooking}</a></li>
              <li><a href="#" className="hover:text-teal-400 transition">{translations[language].hotelReservations}</a></li>
              <li><a href="#" className="hover:text-teal-400 transition">{translations[language].tourPackages}</a></li>
              <li><a href="#" className="hover:text-teal-400 transition">{translations[language].visaAssistance}</a></li>
              <li><a href="#" className="hover:text-teal-400 transition">{translations[language].carRentals}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{translations[language].contactUs}</h3>
            <ul className="space-y-3 text-sm">
              <li className={`flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse justify-end' : ''}`}>
                <Phone size={16} className="text-teal-400 flex-shrink-0" />
                <a href="https://wa.me/201515196284" className="hover:text-teal-400 transition">015 1519628</a>
              </li>
              <li className={`flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse justify-end' : ''}`}>
                <Mail size={16} className="text-teal-400 flex-shrink-0" />
                <a href="mailto:Reservations@miles-travel.com" className="hover:text-teal-400 transition">Reservations@miles-travel.com</a>
              </li>
              <li className={`flex items-start gap-2 ${language === 'ar' ? 'flex-row-reverse justify-end' : ''}`}>
                <MapPin size={16} className="text-teal-400 mt-1 flex-shrink-0" />
                <span>1 Moustafa El Nahas, Nasr City, Cairo, Egypt</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 py-8">
          {/* Bottom Info */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4 ${language === 'ar' ? 'text-right' : ''}`}>
            <div className={language === 'ar' ? 'md:text-right' : ''}>
              <a href="https://www.miles-travel.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition">{translations[language].privacyPolicy}</a>
            </div>
            <div className="text-center">
              <p>&copy; {currentYear} MILES TRAVEL. {translations[language].allRightsReserved}</p>
              <a href="https://www.miles-travel.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition text-xs">www.miles-travel.com</a>
            </div>
            <div className={language === 'ar' ? 'md:text-left' : 'md:text-right'}>
              <a href="https://www.miles-travel.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition">{translations[language].termsConditions}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
