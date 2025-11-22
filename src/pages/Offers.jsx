import React from 'react';
import PackageCard from '../components/Cards/PackageCard';
import { TrendingUp, Award, Gift } from 'lucide-react';
import { useLanguage, translations } from '../context/LanguageContext';

const Offers = () => {
  const allOffers = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    image: `https://picsum.photos/400/300?random=${i + 30}`,
    title: `Travel Package ${i + 1}`,
    duration: `${Math.floor(Math.random() * 5) + 3} Days / ${Math.floor(Math.random() * 4) + 2} Nights`,
    price: Math.floor(Math.random() * 1000) + 300,
    rating: (Math.random() * 1.5 + 3.5).toFixed(1),
    includes: 'Flights, hotels, meals, and guided tours included'
  }));

  const offerCategories = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Hot Deals',
      description: 'Limited time offers on popular destinations'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Premium Packages',
      description: 'Luxury experiences for discerning travelers'
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: 'Special Promotions',
      description: 'Exclusive deals for our valued members'
    },
  ];

  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">{translations[language].exclusiveTravelOffers}</h1>
          <p className="text-xl text-gray-100 mb-8">{translations[language].findAmazingDeals}</p>
        </div>
      </section>

      {/* Offer Categories */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {offerCategories.map((category, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition text-center"
              >
                <div className="flex justify-center mb-4 text-teal-600">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Offers */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">{translations[language].allAvailablePackages}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allOffers.map((offer) => (
              <PackageCard key={offer.id} {...offer} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Offers;
