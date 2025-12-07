import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

  const renderScrollableSection = (title, subtitle, data, CardComponent, scrollValue, setter, sectionName, cardProps = {}) => {
    return (
      <section className="py-12 sm:py-16 px-4 sm:px-8">
        <SectionTitle title={title} subtitle={subtitle} />

        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll(sectionName, 'left', setter)}
            disabled={scrollValue === 0}
            className={`absolute -left-4 sm:left-0 top-1/2 -translate-y-1/2 z-20 bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-gray-300 ${
              scrollValue === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-teal-50 hover:border-teal-600'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={() => scroll(sectionName, 'right', setter)}
            className="absolute -right-4 sm:right-0 top-1/2 -translate-y-1/2 z-20 bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-gray-300 hover:bg-teal-50 hover:border-teal-600"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden rounded-xl mx-8 sm:mx-12">
            <div
              className="flex gap-4 sm:gap-6 transition-transform duration-500 ease-out"
              style={{ 
                transform: language === 'ar' 
                  ? `translateX(${scrollValue}px)` 
                  : `translateX(-${scrollValue}px)` 
              }}
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
      {/* Hero Section with Integrated Search */}
      <section className="relative overflow-hidden h-[600px] sm:h-[650px] md:h-[700px]">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="images/8f27feb9-9821-4b40-8796-6c6aa176ee46.jpeg"
            alt="Travel Agency hero banner"
            className="w-full h-full object-cover object-center"
          />
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900/60 via-blue-900/50 to-black/70" />
        </div>

        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-8 pt-16">
          <div className="max-w-7xl mx-auto w-full">
            {/* Hero Text - Enhanced */}
            <div className="text-center text-white mb-10 sm:mb-12">
              <div className="inline-block mb-4 sm:mb-6">
                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/30">
                  {language === 'ar' ? 'اكتشف العالم معنا' : 'Discover the World with Us'}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight drop-shadow-lg">
                {translations[language].discoverYourNextAdventure}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/95 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md">
                {translations[language].exploreBreathtakingDestinations}
              </p>
            </div>

            {/* Tabbed Search Component */}
            <div className="max-w-5xl mx-auto transform transition-all duration-300">
              <TabbedSearch />
            </div>
          </div>
        </div>

        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 sm:h-20 text-white" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,100 350,0 500,50 C650,100 850,0 1000,50 L1200,50 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Hotels in Egypt - Redesigned */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-8 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-0 w-96 h-96 bg-teal-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-teal-100 to-blue-100 text-teal-700 rounded-full text-sm font-semibold border border-teal-200">
                {language === 'ar' ? 'تجربة فاخرة' : 'Luxury Experience'}
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              {translations[language].hotelsInEgypt}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {translations[language].hotelsInEgyptDesc}
            </p>
          </div>

          {/* Scrollable Cards Container */}
          <div className="relative">
            {/* Scroll Buttons */}
            <button
              onClick={() => scroll('egyptHotel', 'left', setEgyptHotelScroll)}
              disabled={egyptHotelScroll === 0}
              className={`absolute -left-4 sm:left-0 top-1/2 -translate-y-1/2 z-20 bg-white text-gray-800 p-3 sm:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 ${
                egyptHotelScroll === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-teal-50 hover:border-teal-600 hover:scale-110'
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            <button
              onClick={() => scroll('egyptHotel', 'right', setEgyptHotelScroll)}
              className="absolute -right-4 sm:right-0 top-1/2 -translate-y-1/2 z-20 bg-white text-gray-800 p-3 sm:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:bg-teal-50 hover:border-teal-600 hover:scale-110"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Cards Container */}
            <div className="overflow-hidden rounded-2xl mx-8 sm:mx-12">
              <div
                className="flex gap-6 sm:gap-8 transition-transform duration-500 ease-out"
                style={{ 
                  transform: language === 'ar' 
                    ? `translateX(${egyptHotelScroll}px)` 
                    : `translateX(-${egyptHotelScroll}px)` 
                }}
              >
                {hotelsEgyptData.map((item) => (
                  <div key={item.id} className="flex-shrink-0">
                    <HotelCardHome {...item} hotelType="egypt" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* View All Link */}
          <div className="text-center mt-12">
            <a
              href="/hotels"
              className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold text-lg transition-colors duration-200 group"
            >
              {translations[language].viewAll}
              <ChevronRight className={`w-5 h-5 transition-transform duration-200 ${language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
            </a>
          </div>
        </div>
      </section>

      {/* Hotels in Saudi Arabia - Redesigned */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-8 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-0 w-96 h-96 bg-teal-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-teal-100 text-blue-700 rounded-full text-sm font-semibold border border-blue-200">
                {language === 'ar' ? 'ضيافة مميزة' : 'Premium Hospitality'}
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              {translations[language].hotelsInSaudiArabia}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {translations[language].hotelsInSaudiDesc}
            </p>
          </div>

          {/* Scrollable Cards Container */}
          <div className="relative">
            {/* Scroll Buttons */}
            <button
              onClick={() => scroll('saudiHotel', 'left', setSaudiHotelScroll)}
              disabled={saudiHotelScroll === 0}
              className={`absolute -left-4 sm:left-0 top-1/2 -translate-y-1/2 z-20 bg-white text-gray-800 p-3 sm:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 ${
                saudiHotelScroll === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-blue-50 hover:border-blue-600 hover:scale-110'
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            <button
              onClick={() => scroll('saudiHotel', 'right', setSaudiHotelScroll)}
              className="absolute -right-4 sm:right-0 top-1/2 -translate-y-1/2 z-20 bg-white text-gray-800 p-3 sm:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:bg-blue-50 hover:border-blue-600 hover:scale-110"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Cards Container */}
            <div className="overflow-hidden rounded-2xl mx-8 sm:mx-12">
              <div
                className="flex gap-6 sm:gap-8 transition-transform duration-500 ease-out"
                style={{ 
                  transform: language === 'ar' 
                    ? `translateX(${saudiHotelScroll}px)` 
                    : `translateX(-${saudiHotelScroll}px)` 
                }}
              >
                {hotelsSaudiData.map((item) => (
                  <div key={item.id} className="flex-shrink-0">
                    <HotelCardHome {...item} hotelType="saudi" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* View All Link */}
          <div className="text-center mt-12">
            <a
              href="/hotels"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors duration-200 group"
            >
              {translations[language].viewAll}
              <ChevronRight className={`w-5 h-5 transition-transform duration-200 ${language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
            </a>
          </div>
        </div>
      </section>

      {/* Travel Packages - Redesigned */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-8 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-pink-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-semibold border border-purple-200">
                {language === 'ar' ? 'رحلات شاملة' : 'All-Inclusive'}
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              {translations[language].travelPackages}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {translations[language].allInclusivePackages}
            </p>
          </div>

          {/* Scrollable Cards Container */}
          <div className="relative">
            {/* Scroll Buttons */}
            <button
              onClick={() => scroll('packages', 'left', setPackagesScroll)}
              disabled={packagesScroll === 0}
              className={`absolute -left-4 sm:left-0 top-1/2 -translate-y-1/2 z-20 bg-white text-gray-800 p-3 sm:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 ${
                packagesScroll === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-purple-50 hover:border-purple-600 hover:scale-110'
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            <button
              onClick={() => scroll('packages', 'right', setPackagesScroll)}
              className="absolute -right-4 sm:right-0 top-1/2 -translate-y-1/2 z-20 bg-white text-gray-800 p-3 sm:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:bg-purple-50 hover:border-purple-600 hover:scale-110"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Cards Container */}
            <div className="overflow-hidden rounded-2xl mx-8 sm:mx-12">
              <div
                className="flex gap-6 sm:gap-8 transition-transform duration-500 ease-out"
                style={{ 
                  transform: language === 'ar' 
                    ? `translateX(${packagesScroll}px)` 
                    : `translateX(-${packagesScroll}px)` 
                }}
              >
                {packagesData.map((item) => (
                  <div key={item.id} className="flex-shrink-0">
                    <PackageCardHome {...item} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* View All Link */}
          <div className="text-center mt-12">
            <a
              href="/offers"
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold text-lg transition-colors duration-200 group"
            >
              {translations[language].viewAll}
              <ChevronRight className={`w-5 h-5 transition-transform duration-200 ${language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-16 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{translations[language].readyToExplore}</h2>
          <p className="text-lg mb-8 text-teal-50">
            {translations[language].whatsappCtaDescription}
          </p>
          <a
            href="https://wa.me/201515196284?text=Hello%20I%20want%20to%20explore%20travel%20packages"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {translations[language].contactViaWhatsApp}
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
