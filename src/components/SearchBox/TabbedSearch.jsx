import React, { useState } from 'react';
import { Building2, Plane, MapPin, Briefcase } from 'lucide-react';
import { sendWhatsAppMessage } from '../../utils/whatsappRedirect';
import { useLanguage, translations } from '../../context/LanguageContext';

const TabbedSearch = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('hotels');
  
  const [hotelData, setHotelData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    rooms: '1',
    guests: '1'
  });

  const [flightData, setFlightData] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    passengers: '1',
    class: 'economy'
  });

  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    setHotelData(prev => ({ ...prev, [name]: value }));
  };

  const handleFlightChange = (e) => {
    const { name, value } = e.target;
    setFlightData(prev => ({ ...prev, [name]: value }));
  };

  const handleHotelSearch = (e) => {
    e.preventDefault();
    if (!hotelData.destination || !hotelData.checkIn || !hotelData.checkOut) {
      alert(translations[language].findTheHotelDeals);
      return;
    }
    sendWhatsAppMessage(hotelData, 'hotel');
  };

  const handleFlightSearch = (e) => {
    e.preventDefault();
    if (!flightData.from || !flightData.to || !flightData.departure) {
      alert(translations[language].findTheFlightDeals || 'Please fill in required fields');
      return;
    }
    sendWhatsAppMessage(flightData, 'flight');
  };

  const tabs = [
    { id: 'hotels', label: translations[language].hotels, icon: Building2 },
    { id: 'flights', label: translations[language].flights, icon: Plane },
    { id: 'packages', label: translations[language].packages, icon: Briefcase },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-100">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-semibold text-sm transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-3 border-blue-600 bg-blue-50/50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              style={{ borderBottomWidth: activeTab === tab.id ? '3px' : '0' }}
            >
              <Icon size={20} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'hotels' && (
          <form onSubmit={handleHotelSearch}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Destination */}
              <div className="lg:col-span-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  {translations[language].destination}
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="destination"
                    value={hotelData.destination}
                    onChange={handleHotelChange}
                    placeholder={translations[language].destination}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                  />
                </div>
              </div>

              {/* Check-in */}
              <div className="lg:col-span-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  {translations[language].checkIn}
                </label>
                <input
                  type="date"
                  name="checkIn"
                  value={hotelData.checkIn}
                  onChange={handleHotelChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                />
              </div>

              {/* Check-out */}
              <div className="lg:col-span-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  {translations[language].checkOut}
                </label>
                <input
                  type="date"
                  name="checkOut"
                  value={hotelData.checkOut}
                  onChange={handleHotelChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                />
              </div>

              {/* Rooms */}
              <div className="lg:col-span-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  {translations[language].rooms}
                </label>
                <select
                  name="rooms"
                  value={hotelData.rooms}
                  onChange={handleHotelChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                >
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Room' : 'Rooms'}</option>
                  ))}
                </select>
              </div>

              {/* Guests */}
              <div className="lg:col-span-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  {translations[language].guests}
                </label>
                <select
                  name="guests"
                  value={hotelData.guests}
                  onChange={handleHotelChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                >
                  {[1, 2, 3, 4, 5, 6].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {translations[language].searchHotels}
              </button>
            </div>
          </form>
        )}

        {activeTab === 'flights' && (
          <form onSubmit={handleFlightSearch}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {/* From */}
              <div className="lg:col-span-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  {translations[language].from}
                </label>
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 rotate-[-45deg]" size={18} />
                  <input
                    type="text"
                    name="from"
                    value={flightData.from}
                    onChange={handleFlightChange}
                    placeholder={translations[language].from}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                  />
                </div>
              </div>

              {/* To */}
              <div className="lg:col-span-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  {translations[language].to}
                </label>
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 rotate-45" size={18} />
                  <input
                    type="text"
                    name="to"
                    value={flightData.to}
                    onChange={handleFlightChange}
                    placeholder={translations[language].to}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                  />
                </div>
              </div>

              {/* Departure */}
              <div className="lg:col-span-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  {translations[language].departure}
                </label>
                <input
                  type="date"
                  name="departure"
                  value={flightData.departure}
                  onChange={handleFlightChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                />
              </div>

              {/* Return */}
              <div className="lg:col-span-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  {translations[language].return}
                </label>
                <input
                  type="date"
                  name="return"
                  value={flightData.return}
                  onChange={handleFlightChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                />
              </div>

              {/* Passengers */}
              <div className="lg:col-span-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  {translations[language].passengers}
                </label>
                <select
                  name="passengers"
                  value={flightData.passengers}
                  onChange={handleFlightChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                >
                  {[1, 2, 3, 4, 5, 6].map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              {/* Class */}
              <div className="lg:col-span-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  {translations[language].class}
                </label>
                <select
                  name="class"
                  value={flightData.class}
                  onChange={handleFlightChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                >
                  <option value="economy">{translations[language].economy}</option>
                  <option value="business">{translations[language].business}</option>
                  <option value="first">{translations[language].first}</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {translations[language].searchFlights}
              </button>
            </div>
          </form>
        )}

        {activeTab === 'packages' && (
          <div className="text-center py-8">
            <Briefcase size={48} className="mx-auto text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {translations[language].travelPackages}
            </h3>
            <p className="text-gray-600 mb-6">
              {translations[language].allInclusivePackages}
            </p>
            <a
              href="https://wa.me/201515196284?text=Hello%20I%20want%20to%20explore%20travel%20packages"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {translations[language].contactViaWhatsApp}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabbedSearch;
