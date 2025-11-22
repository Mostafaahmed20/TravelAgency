import React from 'react';
import FlightSearch from '../components/SearchBox/FlightSearch';
import DestinationCard from '../components/Cards/DestinationCard';

const Flights = () => {
  const flightDeals = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    image: `https://picsum.photos/400/300?random=${i + 10}`,
    title: `Route ${i + 1}`,
    description: `Popular flight route with great deals and premium service`,
    price: Math.floor(Math.random() * 500) + 100,
    rating: (Math.random() * 2 + 3).toFixed(1),
    reviews: Math.floor(Math.random() * 3000) + 500
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Your Flight</h1>
          <p className="text-lg text-gray-100">Find the best flight deals and book in seconds</p>
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
          <h2 className="text-3xl font-bold mb-12">Popular Flight Routes</h2>
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
