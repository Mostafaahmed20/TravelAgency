import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Calendar, Cloud, ChevronRight } from 'lucide-react';
import { internationalDestinations } from '../data/internationalDestinationsData';
import { HotelCardHome } from '../components/Cards/HotelCardHome';
import { openWhatsApp } from '../utils/whatsappRedirect';
import { useLanguage, translations } from '../context/LanguageContext';

const InternationalDestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const destination = internationalDestinations.find(d => d.id === id);
  const { language } = useLanguage();

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {language === 'ar' ? 'الوجهة غير موجودة' : 'Destination Not Found'}
          </h1>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
          </button>
        </div>
      </div>
    );
  }

  const displayCountry = language === 'ar' ? destination.country_ar : destination.country;
  const displayDescription = language === 'ar' ? destination.description_ar : destination.description;
  const displayBestTime = language === 'ar' ? destination.bestTimeToVisit_ar : destination.bestTimeToVisit;
  const displayCulture = language === 'ar' ? destination.culture_ar : destination.culture;
  const displayWeather = language === 'ar' ? destination.weather_ar : destination.weather;
  const displayAttractions = language === 'ar' ? destination.topAttractions_ar : destination.topAttractions;
  const displayCities = language === 'ar' ? destination.popularCities_ar : destination.popularCities;

  const handleBookHotel = (hotel) => {
    const message = `Hello, I want to book ${hotel.name} in ${hotel.city}, ${displayCountry}.`;
    openWhatsApp(message);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => navigate('/')}
              className="text-teal-600 hover:text-teal-700 font-medium transition flex items-center gap-1"
            >
              <ArrowLeft className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
              {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{displayCountry}</span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="relative rounded-2xl overflow-hidden shadow-lg h-80 md:h-[500px]">
          <img
            src={destination.image}
            alt={displayCountry}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="text-6xl mb-4">{destination.flag}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{displayCountry}</h1>
            <p className="text-lg text-white/90 max-w-2xl">{displayDescription}</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Why Visit */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-indigo-600 rounded"></span>
                {language === 'ar' ? 'لماذا تزور' : 'Why Visit'}
              </h2>
              <p className="text-gray-700 text-base leading-relaxed">{displayDescription}</p>
            </div>

            {/* Best Time to Visit */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-indigo-600" />
                {language === 'ar' ? 'أفضل وقت للزيارة' : 'Best Time to Visit'}
              </h2>
              <p className="text-gray-700 text-base leading-relaxed">{displayBestTime}</p>
            </div>

            {/* Top Attractions */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Star className="w-6 h-6 text-indigo-600" />
                {language === 'ar' ? 'أهم المعالم' : 'Top Attractions & Experiences'}
              </h2>
              <ul className="space-y-2">
                {displayAttractions.map((attraction, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <ChevronRight className={`w-4 h-4 text-indigo-600 ${language === 'ar' ? 'rotate-180' : ''}`} />
                    {attraction}
                  </li>
                ))}
              </ul>
            </div>

            {/* Culture */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-indigo-600 rounded"></span>
                {language === 'ar' ? 'الثقافة' : 'Culture Highlights'}
              </h2>
              <p className="text-gray-700 text-base leading-relaxed">{displayCulture}</p>
            </div>

            {/* Weather */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Cloud className="w-6 h-6 text-indigo-600" />
                {language === 'ar' ? 'الطقس والجو العام' : 'Weather & General Vibe'}
              </h2>
              <p className="text-gray-700 text-base leading-relaxed">{displayWeather}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {language === 'ar' ? 'المدن الشعبية' : 'Popular Cities'}
              </h3>
              <div className="space-y-2">
                {displayCities.map((city, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-4 h-4 text-indigo-600" />
                    <span>{city}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Popular Hotels Section */}
        <div className="mt-12">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <span className="w-1 h-8 bg-indigo-600 rounded"></span>
              {language === 'ar' ? 'أشهر الفنادق' : 'Most Popular Hotels'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destination.hotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer"
                  onClick={() => handleBookHotel(hotel)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-bold text-gray-800">{hotel.rating}</span>
                    </div>
                    <div className="absolute top-3 left-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {language === 'ar' ? hotel.category_ar : hotel.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                      {language === 'ar' ? hotel.name_ar : hotel.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1">
                        {language === 'ar' ? hotel.location_ar : hotel.location}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                      {language === 'ar' ? hotel.description_ar : hotel.description}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookHotel(hotel);
                      }}
                      className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-semibold"
                    >
                      {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternationalDestinationDetails;

