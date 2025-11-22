import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FlightSearch from '../components/SearchBox/FlightSearch';
import HotelSearch from '../components/SearchBox/HotelSearch';
import DestinationCard from '../components/Cards/DestinationCard';
import PackageCard from '../components/Cards/PackageCard';
import { Plane, Hotel, MapPin, Users } from 'lucide-react';

const Home = () => {
  const [activeTab, setActiveTab] = useState('flights');

  const featuredDestinations = [
    {
      id: 1,
      image: 'https://picsum.photos/400/300?random=1',
      title: 'Dubai, UAE',
      description: 'Experience the magic of modern architecture and luxury shopping.',
      price: '89',
      rating: 4.8,
      reviews: 2847
    },
    {
      id: 2,
      image: 'https://picsum.photos/400/300?random=2',
      title: 'Paris, France',
      description: 'Fall in love with the City of Light and iconic landmarks.',
      price: '120',
      rating: 4.9,
      reviews: 3521
    },
    {
      id: 3,
      image: 'https://picsum.photos/400/300?random=3',
      title: 'Tokyo, Japan',
      description: 'Discover ancient temples and cutting-edge technology.',
      price: '99',
      rating: 4.7,
      reviews: 2156
    },
    {
      id: 4,
      image: 'https://picsum.photos/400/300?random=4',
      title: 'Barcelona, Spain',
      description: 'Explore stunning beaches and vibrant Mediterranean culture.',
      price: '75',
      rating: 4.6,
      reviews: 1890
    },
  ];

  const specialOffers = [
    {
      id: 1,
      image: 'https://picsum.photos/400/300?random=5',
      title: 'Tropical Paradise Package',
      duration: '5 Days / 4 Nights',
      price: '599',
      rating: 4.9,
      includes: 'All-inclusive resort with flights and meals'
    },
    {
      id: 2,
      image: 'https://picsum.photos/400/300?random=6',
      title: 'European Adventure',
      duration: '7 Days / 6 Nights',
      price: '899',
      rating: 4.8,
      includes: 'Multi-city tour with 5-star hotels'
    },
    {
      id: 3,
      image: 'https://picsum.photos/400/300?random=7',
      title: 'Mountain Retreat',
      duration: '4 Days / 3 Nights',
      price: '449',
      rating: 4.7,
      includes: 'Mountain lodge with guided hikes'
    },
  ];

  const features = [
    {
      icon: <Plane className="w-8 h-8" />,
      title: 'Best Flight Deals',
      description: 'Find the lowest prices on flights worldwide'
    },
    {
      icon: <Hotel className="w-8 h-8" />,
      title: 'Premium Hotels',
      description: 'Stay in luxury accommodations at great rates'
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Unique Experiences',
      description: 'Discover unforgettable destinations'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: '24/7 Support',
      description: 'Get help whenever you need it'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-600 via-blue-500 to-purple-600 text-white py-20 px-4">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-slideUp">
            Explore the World
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 animate-slideUp">
            Find amazing deals on flights, hotels, and travel packages
          </p>
        </div>

        {/* Search Tabs */}
        <div className="relative z-10 max-w-7xl mx-auto mt-12">
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab('flights')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition ${
                activeTab === 'flights'
                  ? 'bg-white text-teal-600 shadow-lg'
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
            >
              <Plane size={20} /> Flights
            </button>
            <button
              onClick={() => setActiveTab('hotels')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition ${
                activeTab === 'hotels'
                  ? 'bg-white text-teal-600 shadow-lg'
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
            >
              <Hotel size={20} /> Hotels
            </button>
          </div>

          {/* Search Components */}
          <div className="pb-12">
            {activeTab === 'flights' && <FlightSearch />}
            {activeTab === 'hotels' && <HotelSearch />}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose TravelHub</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-teal-50 transition">
                <div className="flex justify-center mb-4 text-teal-600">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Featured Destinations</h2>
            <Link to="/offers" className="text-teal-600 hover:text-teal-700 font-bold">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDestinations.map((destination) => (
              <DestinationCard key={destination.id} {...destination} />
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Special Offers</h2>
            <Link to="/offers" className="text-teal-600 hover:text-teal-700 font-bold">
              Explore More →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialOffers.map((offer) => (
              <PackageCard key={offer.id} {...offer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Book Your Next Adventure?</h2>
          <p className="text-lg mb-8">Get exclusive deals and special offers delivered to your inbox</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 rounded-lg text-gray-800 flex-1 max-w-xs focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
