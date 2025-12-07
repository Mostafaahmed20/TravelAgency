import React from 'react';
import FlightSearch from '../components/SearchBox/FlightSearch';
import DestinationCard from '../components/Cards/DestinationCard';
import { useLanguage, translations } from '../context/LanguageContext';

const Flights = () => {
  const { language } = useLanguage();
  const flightDeals = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    image: `https://picsum.photos/400/300?random=${i + 10}`,
    title: `${translations[language].routePrefix} ${i + 1}`,
    title_ar: `${translations[language].routePrefix} ${i + 1}`,
    description: translations[language].popularFlightRouteCardDesc,
    description_ar: translations[language].popularFlightRouteCardDesc,
    price: Math.floor(Math.random() * 500) + 100,
    rating: (Math.random() * 2 + 3).toFixed(1),
    reviews: Math.floor(Math.random() * 3000) + 500
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-600 via-teal-500 to-blue-600 text-white py-20 px-4 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/30">
              {language === 'ar' ? 'احجز رحلتك' : 'Book Your Flight'}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {translations[language].bookYourFlight}
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
            {translations[language].findTheFlightDeals}
          </p>
        </div>
        
        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 text-gray-50" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,100 350,0 500,50 C650,100 850,0 1000,50 L1200,50 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <FlightSearch />
        </div>
      </section>

      {/* Flight Deals */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">{translations[language].popularFlightRoutes}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {flightDeals.map((deal) => (
              <DestinationCard key={deal.id} {...deal} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Flights;
