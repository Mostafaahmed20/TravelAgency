import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DestinationCardHome } from '../components/Cards/DestinationCardHome';
import { HotelCardHome } from '../components/Cards/HotelCardHome';
import { PackageCardHome } from '../components/Cards/PackageCardHome';
import { SectionTitle } from '../components/Common/SectionTitle';
import { destinationsData, hotelsEgyptData, hotelsSaudiData, packagesData } from '../data/destinationsData';
import HotelSearch from '../components/SearchBox/HotelSearch';

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

  const renderScrollableSection = (title, subtitle, data, CardComponent, scrollValue, setter, sectionName, cardProps = {}) => {
    return (
      <section className="py-12 sm:py-16 px-4 sm:px-8">
        <SectionTitle title={title} subtitle={subtitle} />

        <div className="relative">
          {/* Scroll Buttons */}
          {scrollValue > 0 && (
            <button
              onClick={() => scroll(sectionName, 'left', setter)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-2 rounded-full hover:shadow-lg transition-all duration-300"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <button
            onClick={() => scroll(sectionName, 'right', setter)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-2 rounded-full hover:shadow-lg transition-all duration-300"
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
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen pt-20">
      {/* Hero Section */}
      <section className="text-white relative overflow-hidden px-4 sm:px-8 h-[420px] sm:h-[520px] md:h-[560px]">
        {/* Background image */}
        <img
          src="images/8f27feb9-9821-4b40-8796-6c6aa176ee46.jpeg"
          alt="Travel Agency hero banner"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-cyan-800/40 to-blue-900/70" />

        {/* Decorative soft lights */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center flex flex-col items-center justify-center h-full">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 leading-tight drop-shadow-md">
            {translations[language].discoverYourNextAdventure}
          </h1>
          <p className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-8 text-blue-100 max-w-3xl">
            {translations[language].exploreBreathtakingDestinations}
          </p>
          <button className="bg-white/95 text-blue-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-md">
            {translations[language].startExploring}
          </button>
        </div>
      </section>

      {/* Search Section (Hotels) */}
      <section className="-mt-20 mb-12 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-transparent rounded-lg">
            <HotelSearch />
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

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-16 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white rounded-full blur-3xl"></div>
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
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            {translations[language].contactViaWhatsApp}
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
