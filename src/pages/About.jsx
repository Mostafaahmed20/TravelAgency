import React from 'react';
import { Heart, Award, Users, Globe } from 'lucide-react';
import { useLanguage, translations } from '../context/LanguageContext';

const About = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      titleKey: 'customerFirst',
      descKey: 'customerFirstDesc'
    },
    {
      icon: <Award className="w-8 h-8" />,
      titleKey: 'qualityService',
      descKey: 'qualityServiceDesc'
    },
    {
      icon: <Users className="w-8 h-8" />,
      titleKey: 'expertTeam',
      descKey: 'expertTeamDesc'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      titleKey: 'globalReach',
      descKey: 'globalReachDesc'
    },
  ];

  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-600 via-teal-500 to-blue-600 text-white py-24 px-4 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        {/* Content */}
        <div className="relative max-w-5xl mx-auto text-center z-10">
          <div className="inline-block mb-6">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/30">
              {language === 'ar' ? 'وكالة سفر رائدة' : 'Premier Travel Agency'}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {translations[language].aboutMilesTravel}
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            {translations[language].discoverTheWorld}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://www.miles-travel.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Globe className="w-5 h-5" />
              {language === 'ar' ? 'زر موقعنا' : 'Visit Our Website'}
            </a>
            <a 
              href="https://www.miles-travel.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/90 hover:text-white transition font-medium text-lg underline decoration-2 underline-offset-4"
            >
              www.miles-travel.com
            </a>
          </div>
        </div>
        
        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 text-gray-50" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,100 350,0 500,50 C650,100 850,0 1000,50 L1200,50 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">{translations[language].ourStory}</h2>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>{translations[language].aboutStoryP1}</p>
            <p>{translations[language].aboutStoryP2}</p>
            <p>{translations[language].aboutStoryP3}</p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">{translations[language].ourValues}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="text-center p-6">
                <div className="flex justify-center mb-4 text-teal-600">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{translations[language][value.titleKey]}</h3>
                <p className="text-gray-600">{translations[language][value.descKey]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect With Us */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">{translations[language].connectWithUs || 'Connect With Us'}</h2>
          <p className="text-gray-700 text-lg mb-8">
            {language === 'ar' ? 'تابعنا على وسائل التواصل الاجتماعي وزر موقعنا للحصول على أحدث العروض والوجهات' : 'Follow us on social media and visit our website for the latest offers and destinations'}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="https://www.miles-travel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Globe className="w-5 h-5" />
              {language === 'ar' ? 'زر موقعنا' : 'Visit Our Website'}
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61583944513951"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              {language === 'ar' ? 'تابعنا على فيسبوك' : 'Follow on Facebook'}
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <p className="text-gray-100">{translations[language].happyTravelers}</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <p className="text-gray-100">{translations[language].destinations}</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <p className="text-gray-100">{translations[language].partners}</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5 Years</div>
              <p className="text-gray-100">{translations[language].experience}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

