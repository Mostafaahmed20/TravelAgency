import React, { useState } from 'react';
import { sendWhatsAppMessage } from '../../utils/whatsappRedirect';
import { useLanguage, translations } from '../../context/LanguageContext';

const HotelSearch = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    rooms: '1',
    guests: '1'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!formData.destination || !formData.checkIn || !formData.checkOut) {
      alert(translations[language].findTheHotelDeals);
      return;
    }
    sendWhatsAppMessage(formData, 'hotel');
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-8 -mt-12 relative z-20 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{translations[language].bookYourHotel}</h2>
      
      <form onSubmit={handleSearch} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Destination */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">{translations[language].destination}</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder={translations[language].destination}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            />
          </div>

          {/* Check-in Date */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">{translations[language].checkIn}</label>
            <input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            />
          </div>

          {/* Check-out Date */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">{translations[language].checkOut}</label>
            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            />
          </div>

          {/* Rooms */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">{translations[language].rooms}</label>
            <select
              name="rooms"
              value={formData.rooms}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            >
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Guests */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">{translations[language].guests}</label>
            <select
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            >
              {[1, 2, 3, 4, 5, 6].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full md:w-48 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition transform hover:scale-105"
          >
            🔍 {translations[language].searchHotels}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelSearch;
