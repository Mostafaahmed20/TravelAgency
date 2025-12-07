import React, { useState } from 'react';
import { Plane, Hotel, Package, Calendar, MapPin, Users, Search } from 'lucide-react';
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
    guests: '2'
  });

  const [flightData, setFlightData] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: '1',
    tripType: 'roundtrip'
  });

  const [packageData, setPackageData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: '2'
  });

  const tabs = [
    { id: 'hotels', icon: Hotel, label: language === 'ar' ? 'الفنادق' : 'Hotels' },
    { id: 'flights', icon: Plane, label: language === 'ar' ? 'الرحلات' : 'Flights' },
    { id: 'packages', icon: Package, label: language === 'ar' ? 'الباقات' : 'Packages' }
  ];

  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    setHotelData(prev => ({ ...prev, [name]: value }));
  };

  const handleFlightChange = (e) => {
    const { name, value } = e.target;
    setFlightData(prev => ({ ...prev, [name]: value }));
  };

  const handlePackageChange = (e) => {
    const { name, value } = e.target;
    setPackageData(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (activeTab === 'hotels') {
      sendWhatsAppMessage(hotelData, 'hotel');
    } else if (activeTab === 'flights') {
      sendWhatsAppMessage(flightData, 'flight');
    } else {
      sendWhatsAppMessage(packageData, 'package');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Tabs */}
      <div className="flex gap-1 mb-1 bg-white/10 backdrop-blur-sm p-1 rounded-t-2xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-teal-600 shadow-lg'
                  : 'bg-transparent text-white hover:bg-white/20'
              }`}
            >
              <Icon size={20} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-2xl rounded-tl-none shadow-2xl p-6">
        <form onSubmit={handleSearch}>
          {/* Hotels Tab */}
          {activeTab === 'hotels' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الوجهة' : 'Destination'}
                </label>
                <div className="relative">
                  <MapPin className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${language === 'ar' ? 'right-3' : 'left-3'}`} size={20} />
                  <input
                    type="text"
                    name="destination"
                    value={hotelData.destination}
                    onChange={handleHotelChange}
                    placeholder={language === 'ar' ? 'أين تريد الذهاب؟' : 'Where do you want to go?'}
                    className={`w-full ${language === 'ar' ? 'pr-10 text-right' : 'pl-10'} py-3.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'تسجيل الوصول' : 'Check-in'}
                </label>
                <div className="relative">
                  <Calendar className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${language === 'ar' ? 'right-3' : 'left-3'}`} size={20} />
                  <input
                    type="date"
                    name="checkIn"
                    value={hotelData.checkIn}
                    onChange={handleHotelChange}
                    className={`w-full ${language === 'ar' ? 'pr-10 text-right' : 'pl-10'} py-3.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'تسجيل المغادرة' : 'Check-out'}
                </label>
                <div className="relative">
                  <Calendar className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${language === 'ar' ? 'right-3' : 'left-3'}`} size={20} />
                  <input
                    type="date"
                    name="checkOut"
                    value={hotelData.checkOut}
                    onChange={handleHotelChange}
                    className={`w-full ${language === 'ar' ? 'pr-10 text-right' : 'pl-10'} py-3.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الضيوف والغرف' : 'Guests & Rooms'}
                </label>
                <div className="relative">
                  <Users className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${language === 'ar' ? 'right-3' : 'left-3'}`} size={20} />
                  <select
                    name="guests"
                    value={hotelData.guests}
                    onChange={handleHotelChange}
                    className={`w-full ${language === 'ar' ? 'pr-10 text-right' : 'pl-10'} py-3.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white`}
                  >
                    <option value="1">1 {language === 'ar' ? 'ضيف' : 'Guest'}</option>
                    <option value="2">2 {language === 'ar' ? 'ضيوف' : 'Guests'}</option>
                    <option value="3">3 {language === 'ar' ? 'ضيوف' : 'Guests'}</option>
                    <option value="4">4 {language === 'ar' ? 'ضيوف' : 'Guests'}</option>
                    <option value="5">5+ {language === 'ar' ? 'ضيوف' : 'Guests'}</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Flights Tab */}
          {activeTab === 'flights' && (
            <div className="space-y-4">
              <div className="flex gap-4 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    value="roundtrip"
                    checked={flightData.tripType === 'roundtrip'}
                    onChange={handleFlightChange}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700">{language === 'ar' ? 'ذهاب وعودة' : 'Round Trip'}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    value="oneway"
                    checked={flightData.tripType === 'oneway'}
                    onChange={handleFlightChange}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700">{language === 'ar' ? 'ذهاب فقط' : 'One Way'}</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'من' : 'From'}
                  </label>
                  <div className="relative">
                    <Plane className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${language === 'ar' ? 'right-3' : 'left-3'}`} size={20} />
                    <input
                      type="text"
                      name="from"
                      value={flightData.from}
                      onChange={handleFlightChange}
                      placeholder={language === 'ar' ? 'مطار المغادرة' : 'Departure Airport'}
                      className={`w-full ${language === 'ar' ? 'pr-10 text-right' : 'pl-10'} py-3.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'إلى' : 'To'}
                  </label>
                  <div className="relative">
                    <Plane className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${language === 'ar' ? 'right-3 rotate-180' : 'left-3'}`} size={20} />
                    <input
                      type="text"
                      name="to"
                      value={flightData.to}
                      onChange={handleFlightChange}
                      placeholder={language === 'ar' ? 'مطار الوصول' : 'Arrival Airport'}
                      className={`w-full ${language === 'ar' ? 'pr-10 text-right' : 'pl-10'} py-3.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'تاريخ المغادرة' : 'Departure'}
                  </label>
                  <div className="relative">
                    <Calendar className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${language === 'ar' ? 'right-3' : 'left-3'}`} size={20} />
                    <input
                      type="date"
                      name="departDate"
                      value={flightData.departDate}
                      onChange={handleFlightChange}
                      className={`w-full ${language === 'ar' ? 'pr-10 text-right' : 'pl-10'} py-3.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition`}
                      required
                    />
                  </div>
                </div>

                {flightData.tripType === 'roundtrip' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'تاريخ العودة' : 'Return'}
                    </label>
                    <div className="relative">
                      <Calendar className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${language === 'ar' ? 'right-3' : 'left-3'}`} size={20} />
                      <input
                        type="date"
                        name="returnDate"
                        value={flightData.returnDate}
                        onChange={handleFlightChange}
                        className={`w-full ${language === 'ar' ? 'pr-10 text-right' : 'pl-10'} py-3.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition`}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'المسافرون' : 'Passengers'}
                  </label>
                  <div className="relative">
                    <Users className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${language === 'ar' ? 'right-3' : 'left-3'}`} size={20} />
                    <select
                      name="passengers"
                      value={flightData.passengers}
                      onChange={handleFlightChange}
                      className={`w-full ${language === 'ar' ? 'pr-10 text-right' : 'pl-10'} py-3.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition appearance-none bg-white`}
                    >
                      <option value="1">1 {language === 'ar' ? 'مسافر' : 'Passenger'}</option>
                      <option value="2">2 {language === 'ar' ? 'مسافرين' : 'Passengers'}</option>
                      <option value="3">3 {language === 'ar' ? 'مسافرين' : 'Passengers'}</option>
                      <option value="4">4 {language === 'ar' ? 'مسافرين' : 'Passengers'}</option>
                      <option value="5">5+ {language === 'ar' ? 'مسافرين' : 'Passengers'}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Packages Tab */}
          {activeTab === 'packages' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الوجهة' : 'Destination'}
                </label>
                <div className="relative">
                  <MapPin className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${language === 'ar' ? 'right-3' : 'left-3'}`} size={20} />
                  <input
                    type="text"
                    name="destination"
                    value={packageData.destination}
                    onChange={handlePackageChange}
                    placeholder={language === 'ar' ? 'اختر وجهتك المفضلة' : 'Choose your destination'}
                    className={`w-full ${language === 'ar' ? 'pr-10 text-right' : 'pl-10'} py-3.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'تاريخ البداية' : 'Start Date'}
                </label>
                <div className="relative">
                  <Calendar className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${language === 'ar' ? 'right-3' : 'left-3'}`} size={20} />
                  <input
                    type="date"
                    name="startDate"
                    value={packageData.startDate}
                    onChange={handlePackageChange}
                    className={`w-full ${language === 'ar' ? 'pr-10 text-right' : 'pl-10'} py-3.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'تاريخ النهاية' : 'End Date'}
                </label>
                <div className="relative">
                  <Calendar className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${language === 'ar' ? 'right-3' : 'left-3'}`} size={20} />
                  <input
                    type="date"
                    name="endDate"
                    value={packageData.endDate}
                    onChange={handlePackageChange}
                    className={`w-full ${language === 'ar' ? 'pr-10 text-right' : 'pl-10'} py-3.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition`}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Search Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Search size={22} />
              {language === 'ar' ? 'بحث' : 'Search'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TabbedSearch;
