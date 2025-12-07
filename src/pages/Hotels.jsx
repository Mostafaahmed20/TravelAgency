import React from 'react';
import HotelSearch from '../components/SearchBox/HotelSearch';
import HotelCard from '../components/Cards/HotelCard';
import { useLanguage, translations } from '../context/LanguageContext';
import { hotelsData } from '../data/hotelData';
import { Building2, Award, TrendingUp } from 'lucide-react';

const Hotels = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-600 via-teal-500 to-blue-600 text-white py-20 px-4 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className={`max-w-4xl ${language === 'ar' ? 'mr-auto text-right' : 'ml-auto text-left'}`}>
            <div className="inline-block mb-6">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/30">
                {language === 'ar' ? 'فنادق فاخرة' : 'Luxury Hotels'}
              </span>
            </div>
            <div className={`flex items-center gap-3 mb-4 ${language === 'ar' ? 'flex-row-reverse justify-end' : ''}`}>
              <Building2 size={48} className="text-white/90" />
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                {translations[language].findYourHotel}
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-100 leading-relaxed mb-8">
              {translations[language].findTheHotelDeals}
            </p>
            
            {/* Stats */}
            <div className={`grid grid-cols-3 gap-6 mt-8 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
                <p className="text-4xl font-bold mb-2">5★</p>
                <p className="text-sm text-gray-200">{language === 'ar' ? 'فنادق فاخرة' : 'Luxury Hotels'}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
                <p className="text-4xl font-bold mb-2">4+</p>
                <p className="text-sm text-gray-200">{language === 'ar' ? 'مواقع رائعة' : 'Top Locations'}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
                <p className="text-4xl font-bold mb-2">24/7</p>
                <p className="text-sm text-gray-200">{language === 'ar' ? 'دعم العملاء' : 'Support'}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 text-gray-50" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,100 350,0 500,50 C650,100 850,0 1000,50 L1200,50 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 px-4 -mt-12 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-6">
            <HotelSearch />
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className={`mb-12 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <div className="flex items-center gap-3 mb-3">
              <Award className="text-teal-600" size={32} />
              <h2 className="text-4xl font-bold text-gray-800">
                {translations[language].featuredHotelsHeading}
              </h2>
            </div>
            <p className="text-gray-600 text-lg">
              {language === 'ar' 
                ? 'اكتشف أفضل الفنادق المختارة بعناية لإقامة لا تُنسى'
                : 'Discover our hand-picked selection of premium hotels for an unforgettable stay'}
            </p>
          </div>

          {/* Hotels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {hotelsData.map((hotel) => (
              <HotelCard 
                key={hotel.id} 
                id={hotel.id}
                image={hotel.image}
                title={hotel.title}
                title_ar={hotel.title_ar}
                location={hotel.location}
                location_ar={hotel.location_ar}
                rating={hotel.rating}
                reviews={hotel.reviews}
                baseprice={hotel.baseprice}
                amenities={hotel.amenities}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Book With Us */}
      <section className="py-16 px-4 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl font-bold text-gray-800 mb-10 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            {language === 'ar' ? 'لماذا تحجز معنا؟' : 'Why Book With Us?'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`bg-white rounded-xl p-6 shadow-md ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              <div className={`bg-teal-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 ${language === 'ar' ? 'mr-auto' : 'ml-0'}`}>
                <Award className="text-teal-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {language === 'ar' ? 'أفضل الأسعار مضمونة' : 'Best Price Guarantee'}
              </h3>
              <p className="text-gray-600">
                {language === 'ar' 
                  ? 'نقدم أفضل الأسعار التنافسية لجميع الفنادق المميزة'
                  : 'We offer the most competitive prices for all premium hotels'}
              </p>
            </div>

            <div className={`bg-white rounded-xl p-6 shadow-md ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              <div className={`bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 ${language === 'ar' ? 'mr-auto' : 'ml-0'}`}>
                <Building2 className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {language === 'ar' ? 'فنادق مختارة بعناية' : 'Handpicked Hotels'}
              </h3>
              <p className="text-gray-600">
                {language === 'ar' 
                  ? 'جميع الفنادق معتمدة ومختارة بعناية لضمان جودة الخدمة'
                  : 'All hotels are verified and carefully selected for quality assurance'}
              </p>
            </div>

            <div className={`bg-white rounded-xl p-6 shadow-md ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              <div className={`bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 ${language === 'ar' ? 'mr-auto' : 'ml-0'}`}>
                <TrendingUp className="text-green-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {language === 'ar' ? 'دعم على مدار الساعة' : '24/7 Support'}
              </h3>
              <p className="text-gray-600">
                {language === 'ar' 
                  ? 'فريقنا متاح دائماً لمساعدتك في أي وقت'
                  : 'Our team is always available to assist you anytime'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hotels;
