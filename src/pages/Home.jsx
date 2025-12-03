import { useState } from 'react';
import { ChevronLeft, ChevronRight, Shield, Headphones, CreditCard, Award } from 'lucide-react';
import { DestinationCardHome } from '../components/Cards/DestinationCardHome';
import { HotelCardHome } from '../components/Cards/HotelCardHome';
import { PackageCardHome } from '../components/Cards/PackageCardHome';
import { SectionTitle } from '../components/Common/SectionTitle';
import { destinationsData, hotelsEgyptData, hotelsSaudiData, packagesData } from '../data/destinationsData';
import TabbedSearch from '../components/SearchBox/TabbedSearch';

import { useLanguage, translations } from '../context/LanguageContext';
const Home = () => {
  const [destinationScroll, setDestinationScroll] = useState(0);
  const [egyptHotelScroll, setEgyptHotelScroll] = useState(0);
  const [saudiHotelScroll, setSaudiHotelScroll] = useState(0);
  const [packagesScroll, setPackagesScroll] = useState(0);

  const { language } = useLanguage();
  const scroll = (section, direction, setter) => {
    const scrollAmount = 360;
    if (direction === 'left') {
      setter(prev => Math.max(0, prev - scrollAmount));
    } else {
      setter(prev => prev + scrollAmount);
    }
  };

  // Trust badges data
  const trustBadges = [
    {
      icon: Shield,
      title: language === 'ar' ? 'حجز آمن' : 'Secure Booking',
      description: language === 'ar' ? 'معاملات آمنة 100%' : '100% Safe Transactions'
    },
    {
      icon: Headphones,
      title: language === 'ar' ? 'دعم 24/7' : '24/7 Support',
      description: language === 'ar' ? 'متاحون دائماً لمساعدتك' : 'Always here to help you'
    },
    {
      icon: CreditCard,
      title: language === 'ar' ? 'أفضل الأسعار' : 'Best Prices',
      description: language === 'ar' ? 'ضمان أفضل سعر' : 'Price match guarantee'
    },
    {
      icon: Award,
      title: language === 'ar' ? 'موثوق' : 'Trusted',
      description: language === 'ar' ? '+500 عميل سعيد' : '500+ Happy Travelers'
    }
  ];

  const renderScrollableSection = (title, subtitle, data, CardComponent, scrollValue, setter, sectionName, cardProps = {}) => {
    return (
      <section className="py-12 sm:py-16 px-4 sm:px-8">
        <SectionTitle title={title} subtitle={subtitle} />

        <div className="relative">
          {/* Scroll Buttons */}
          {scrollValue > 0 && (
            <button
              onClick={() => scroll(sectionName, 'left', setter)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <button
            onClick={() => scroll(sectionName, 'right', setter)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${scrollValue}px)` }}
            >
              {data.map((item) => (
                <div key={item.id} className="flex-shrink-0">
                  <CardComponent {...item} {...cardProps} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section - El Mosafer Style */}
      <section className="relative overflow-hidden pt-20">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
          {/* Background image with overlay */}
          <img
            src="images/8f27feb9-9821-4b40-8796-6c6aa176ee46.jpeg"
            alt="Travel Agency hero banner"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-blue-800/40 to-blue-900/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 pt-12 pb-32 sm:pt-16 sm:pb-40">
          <div className="text-center text-white mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              {translations[language].discoverYourNextAdventure}
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
              {translations[language].exploreBreathtakingDestinations}
            </p>
          </div>
        </div>
      </section>

      {/* Search Section - Overlapping Hero */}
      <section className="-mt-24 relative z-20 px-4 sm:px-8 mb-8">
        <div className="max-w-5xl mx-auto">
          <TabbedSearch />
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-12 px-4 sm:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">{badge.title}</h3>
                  <p className="text-sm text-gray-500">{badge.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      {renderScrollableSection(
        translations[language].featuredDestinations,
        translations[language].exploreMostPopularDestinations,
        destinationsData,
        DestinationCardHome,
        destinationScroll,
        setDestinationScroll,
        'destination'
      )}

      {/* Hotels in Egypt */}
      {renderScrollableSection(
        translations[language].hotelsInEgypt,
        translations[language].hotelsInEgyptDesc,
        hotelsEgyptData,
        HotelCardHome,
        egyptHotelScroll,
        setEgyptHotelScroll,
        'egyptHotel',
        { hotelType: 'egypt' }
      )}

      {/* Hotels in Saudi Arabia */}
      {renderScrollableSection(
        translations[language].hotelsInSaudiArabia,
        translations[language].hotelsInSaudiDesc,
        hotelsSaudiData,
        HotelCardHome,
        saudiHotelScroll,
        setSaudiHotelScroll,
        'saudiHotel',
        { hotelType: 'saudi' }
      )}

      {/* Packages */}
      {renderScrollableSection(
        translations[language].travelPackages,
        translations[language].allInclusivePackages,
        packagesData,
        PackageCardHome,
        packagesScroll,
        setPackagesScroll,
        'packages'
      )}

      {/* CTA Section - El Mosafer Style */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{translations[language].readyToExplore}</h2>
          <p className="text-lg mb-8 text-blue-100">
            {translations[language].whatsappCtaDescription}
          </p>
          <a
            href="https://wa.me/201515196284?text=Hello%20I%20want%20to%20explore%20travel%20packages"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {translations[language].contactViaWhatsApp}
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
