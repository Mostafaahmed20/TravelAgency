import React from 'react';
import HotelSearch from '../components/SearchBox/HotelSearch';
import DestinationCard from '../components/Cards/DestinationCard';
import { useLanguage, translations } from '../context/LanguageContext';
import { hotelsData } from '../data/hotelData';

const Hotels = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{translations[language].findYourHotel}</h1>
          <p className="text-lg text-gray-100">{translations[language].findTheHotelDeals}</p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <HotelSearch />
        </div>
      </section>

      {/* Hotel Deals */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Featured Hotels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotelsData.map((deal) => (
              <DestinationCard 
                key={deal.id} 
                id={deal.id}
                image={deal.image}
                title={deal.title}
                description={deal.description}
                price={deal.baseprice}
                rating={deal.rating}
                reviews={deal.reviews}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hotels;
