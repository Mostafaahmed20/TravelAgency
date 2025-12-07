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
      <section className="relative bg-gradient-to-br from-teal-600 via-teal-500 to-blue-600 text-white py-20 px-4 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/30">
              {language === 'ar' ? 'عروض حصرية' : 'Exclusive Offers'}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {translations[language].exclusiveTravelOffers}
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed mb-8">
            {translations[language].findAmazingDeals}
          </p>
        </div>
        
        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 text-gray-50" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,100 350,0 500,50 C650,100 850,0 1000,50 L1200,50 L1200,120 L0,120 Z"></path>
          </svg>
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
