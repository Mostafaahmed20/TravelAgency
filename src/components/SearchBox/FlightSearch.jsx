import React, { useState } from 'react';
import { sendWhatsAppMessage } from '../../utils/whatsappRedirect';
import { useLanguage, translations } from '../../context/LanguageContext';

const FlightSearch = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    passengers: '1',
    class: 'economy'
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
    if (!formData.from || !formData.to || !formData.departure) {
      alert(translations[language].findTheFlightDeals);
      return;
    }
    sendWhatsAppMessage(formData, 'flight');
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-8 -mt-12 relative z-20 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{translations[language].bookYourFlight}</h2>
      
      <form onSubmit={handleSearch} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* From */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">{translations[language].from}</label>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleChange}
              placeholder={translations[language].from}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            />
          </div>

          {/* To */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">{translations[language].to}</label>
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleChange}
              placeholder={translations[language].to}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            />
          </div>

          {/* Departure Date */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">{translations[language].departure}</label>
            <input
              type="date"
              name="departure"
              value={formData.departure}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            />
          </div>

          {/* Return Date */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">{translations[language].return}</label>
            <input
              type="date"
              name="return"
              value={formData.return}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            />
          </div>

          {/* Passengers */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">{translations[language].passengers}</label>
            <select
              name="passengers"
              value={formData.passengers}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            >
              {[1, 2, 3, 4, 5, 6].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Class */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">{translations[language].class}</label>
            <select
              name="class"
              value={formData.class}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            >
              <option value="economy">{translations[language].economy}</option>
              <option value="business">{translations[language].business}</option>
              <option value="first">{translations[language].first}</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full md:w-48 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition transform hover:scale-105"
          >
            🔍 {translations[language].searchFlights}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FlightSearch;
