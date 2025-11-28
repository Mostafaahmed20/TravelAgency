import React from 'react';
import PackageCard from '../components/Cards/PackageCard';
import { TrendingUp, Award, Gift } from 'lucide-react';
import { useLanguage, translations } from '../context/LanguageContext';

const Offers = () => {
  const offerCategories = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      titleKey: 'hotDeals',
      descKey: 'hotDealsDesc'
    },
    {
      icon: <Award className="w-8 h-8" />,
      titleKey: 'premiumPackages',
      descKey: 'premiumPackagesDesc'
    },
    {
      icon: <Gift className="w-8 h-8" />,
      titleKey: 'specialPromotions',
      descKey: 'specialPromotionsDesc'
    },
  ];

  const { language } = useLanguage();
  const allOffers = Array.from({ length: 12 }, (_, i) => {
    const days = Math.floor(Math.random() * 5) + 3;
    const nights = Math.floor(Math.random() * 4) + 2;
    return {
      id: i + 1,
      image: `https://picsum.photos/400/300?random=${i + 30}`,
      title: `${translations[language].travelPackagePrefix} ${i + 1}`,
      title_ar: `${translations[language].travelPackagePrefix} ${i + 1}`,
      duration: `${days} ${translations[language].daysWord} / ${nights} ${translations[language].nightsWord}`,
      duration_ar: `${days} ${translations[language].daysWord} / ${nights} ${translations[language].nightsWord}`,
      price: Math.floor(Math.random() * 1000) + 300,
      rating: (Math.random() * 1.5 + 3.5).toFixed(1),
      includes: translations[language].offerIncludesGeneric,
      includes_ar: translations[language].offerIncludesGeneric,
    };
  });

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
                <h3 className="text-xl font-bold mb-2">{translations[language][category.titleKey]}</h3>
                <p className="text-gray-600">{translations[language][category.descKey]}</p>
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
