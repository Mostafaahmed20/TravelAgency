import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DestinationCardHome } from '../components/Cards/DestinationCardHome';
import { HotelCardHome } from '../components/Cards/HotelCardHome';
import { PackageCardHome } from '../components/Cards/PackageCardHome';
import { SectionTitle } from '../components/Common/SectionTitle';
import { destinationsData, hotelsEgyptData, hotelsSaudiData, packagesData } from '../data/destinationsData';
import FlightSearch from '../components/SearchBox/FlightSearch';
import HotelSearch from '../components/SearchBox/HotelSearch';

import { useLanguage, translations } from '../context/LanguageContext';
const Home = () => {
  const [destinationScroll, setDestinationScroll] = useState(0);
  const [egyptHotelScroll, setEgyptHotelScroll] = useState(0);
  const [saudiHotelScroll, setSaudiHotelScroll] = useState(0);
  const [packagesScroll, setPackagesScroll] = useState(0);
  const [activeTab, setActiveTab] = useState('flights');

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
      <section className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white py-20 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 leading-tight">
            {language === 'ar' ? 'اكتشف مغامرتك القادمة' : 'Discover Your Next Adventure'}
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-blue-100">
            {language === 'ar' ? 'استكشف الوجهات الخلابة واحجز رحلة أحلامك اليوم' : 'Explore breathtaking destinations and book your dream trip today'}
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
            {language === 'ar' ? 'ابدأ الاستكشاف' : 'Start Exploring'}
          </button>
        </div>
      </section>

      {/* Search Section (Flights / Hotels) */}
      <section className="-mt-20 mb-12 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-transparent rounded-lg">
            <div className="flex justify-center mb-6">
              <div className="inline-flex bg-white rounded-full p-1 shadow-lg">
                <button id="tab-flights" className={`px-5 py-2 rounded-full font-semibold ${activeTab === 'flights' ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white' : 'text-gray-700'}`} onClick={() => setActiveTab('flights')}>{translations[language].flights}</button>
                <button id="tab-hotels" className={`px-5 py-2 rounded-full font-semibold ${activeTab === 'hotels' ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white' : 'text-gray-700'}`} onClick={() => setActiveTab('hotels')}>{translations[language].hotels}</button>
              </div>
            </div>

            <div>
              {activeTab === 'flights' ? <FlightSearch /> : <HotelSearch />}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      {renderScrollableSection(
        translations[language].featuredDestinations,
        language === 'ar' ? 'استكشف أشهر الوجهات الخلابة' : 'Explore the most popular and breathtaking destinations',
        destinationsData,
        DestinationCardHome,
        destinationScroll,
        setDestinationScroll,
        'destination'
      )}

      {/* Hotels in Egypt */}
      {renderScrollableSection(
        language === 'ar' ? 'الفنادق في مصر' : 'Hotels in Egypt',
        language === 'ar' ? 'استمتع بالفخامة والراحة في أفضل فنادق مصر' : 'Experience luxury and comfort in Egypt\'s finest hotels',
        hotelsEgyptData,
        HotelCardHome,
        egyptHotelScroll,
        setEgyptHotelScroll,
        'egyptHotel',
        { hotelType: 'egypt' }
      )}

      {/* Hotels in Saudi Arabia */}
      {renderScrollableSection(
        language === 'ar' ? 'الفنادق في المملكة العربية السعودية' : 'Hotels in Saudi Arabia',
        language === 'ar' ? 'اكتشف الضيافة الفاخرة في مدن المملكة العربية السعودية الرئيسية' : 'Discover premium hospitality in Saudi Arabia\'s major cities',
        hotelsSaudiData,
        HotelCardHome,
        saudiHotelScroll,
        setSaudiHotelScroll,
        'saudiHotel',
        { hotelType: 'saudi' }
      )}

      {/* Packages */}
      {renderScrollableSection(
        language === 'ar' ? 'حزم السفر' : 'Travel Packages',
        language === 'ar' ? 'حزم شاملة لرحلات لا تُنسى' : 'All-inclusive packages for unforgettable journeys',
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-lg mb-8 text-blue-100">
            {language === 'ar' ? 'اتصل بنا عبر WhatsApp للحصول على توصيات سفر مخصصة' : 'Contact us via WhatsApp for personalized travel recommendations'}
          </p>
          <a
            href="https://wa.me/20100000000?text=Hello%20I%20want%20to%20explore%20travel%20packages"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            {language === 'ar' ? 'اتصل عبر WhatsApp' : 'Contact via WhatsApp'}
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
