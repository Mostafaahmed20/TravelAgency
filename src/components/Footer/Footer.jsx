import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">About TravelHub</h3>
            <p className="text-sm leading-relaxed">
              Discover the world with TravelHub. We provide the best travel deals, flight bookings, and unforgettable experiences.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-teal-400 transition"><Facebook size={20} /></a>
              <a href="#" className="hover:text-teal-400 transition"><Twitter size={20} /></a>
              <a href="#" className="hover:text-teal-400 transition"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-teal-400 transition">Home</Link></li>
              <li><Link to="/flights" className="hover:text-teal-400 transition">Flights</Link></li>
              <li><Link to="/hotels" className="hover:text-teal-400 transition">Hotels</Link></li>
              <li><Link to="/offers" className="hover:text-teal-400 transition">Offers</Link></li>
              <li><Link to="/about" className="hover:text-teal-400 transition">About</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-teal-400 transition">Flight Booking</a></li>
              <li><a href="#" className="hover:text-teal-400 transition">Hotel Reservations</a></li>
              <li><a href="#" className="hover:text-teal-400 transition">Tour Packages</a></li>
              <li><a href="#" className="hover:text-teal-400 transition">Visa Assistance</a></li>
              <li><a href="#" className="hover:text-teal-400 transition">Car Rentals</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-teal-400" />
                <span>+966 50 1234567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-teal-400" />
                <span>info@travelhub.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-teal-400 mt-1 flex-shrink-0" />
                <span>123 Travel Street, Dubai, UAE</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 py-8">
          {/* Bottom Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
            <div>
              <a href="#" className="hover:text-teal-400 transition">Privacy Policy</a>
            </div>
            <div className="text-center">
              <p>&copy; {currentYear} TravelHub. All Rights Reserved.</p>
            </div>
            <div className="text-right">
              <a href="#" className="hover:text-teal-400 transition">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
