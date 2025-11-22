import React from 'react';
import HotelSearch from '../components/SearchBox/HotelSearch';
import DestinationCard from '../components/Cards/DestinationCard';
import { useLanguage, translations } from '../context/LanguageContext';

const Hotels = () => {
  const hotelDeals = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    image: `https://picsum.photos/400/300?random=${i + 20}`,
    title: `Hotel ${i + 1}`,
    description: `Premium accommodation with world-class amenities and service`,
    price: Math.floor(Math.random() * 300) + 50,
    rating: (Math.random() * 2 + 3).toFixed(1),
    reviews: Math.floor(Math.random() * 2000) + 300
  }));

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
            {hotelDeals.map((deal) => (
              <DestinationCard key={deal.id} {...deal} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hotels;
