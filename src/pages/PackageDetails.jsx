import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, DollarSign, Plane, ChevronRight, Users } from 'lucide-react';
import { packagesData } from '../data/destinationsData';
import { RatingStars } from '../components/Common/RatingStars';
import { openWhatsApp } from '../utils/whatsappRedirect';
import { useCurrency } from '../context/CurrencyContext';
import { useLanguage, translations } from '../context/LanguageContext';

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pkg = packagesData.find(p => p.id === parseInt(id));
  const { formatPrice } = useCurrency();
  const { language } = useLanguage();
  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{translations[language].packageNotFound}</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            {translations[language].backToHome}
          </button>
        </div>
      </div>
    );
  }

  const handleBookNow = () => {
    const message = `Hello, I want to book ${pkg.name} package (${pkg.duration}).`;
    openWhatsApp(message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      {/* Header Navigation */}
      <div className="bg-white shadow-sm sticky top-20 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition"
          >
            <ArrowLeft className="w-5 h-5" />
            {translations[language].backToPackages}
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="rounded-2xl overflow-hidden shadow-2xl h-96 md:h-[500px] relative">
          <img
            src={pkg.image}
            alt={language === 'ar' && pkg.name_ar ? pkg.name_ar : pkg.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full font-semibold">
            {language === 'ar' && pkg.country_ar ? pkg.country_ar : pkg.country}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header Info */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                {language === 'ar' && pkg.name_ar ? pkg.name_ar : pkg.name}
              </h1>
              <div className="flex items-center gap-6 flex-wrap mb-6">
                <div className="flex items-center gap-2 text-gray-700 text-lg">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span>{pkg.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 text-lg">
                  <Plane className="w-5 h-5 text-blue-600" />
                  <span>{pkg.country}</span>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <RatingStars rating={pkg.rating} size="lg" />
              </div>

              {/* Description */}
              <p className="text-gray-700 text-lg leading-relaxed">
                {language === 'ar' && pkg.description_ar ? pkg.description_ar : pkg.description}
              </p>
            </div>

            {/* What's Included */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{language === 'ar' ? 'ما يتضمنه الحزمة' : "What's Included"}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(language === 'ar' && pkg.includes_ar ? pkg.includes_ar : pkg.includes).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition"
                  >
                    <ChevronRight className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-800 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Package Details */}
            <div className="mb-10 bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{language === 'ar' ? 'تفاصيل الحزمة' : 'Package Details'}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2">{translations[language].duration}</p>
                  <p className="text-2xl font-bold text-blue-600">{language === 'ar' && pkg.duration_ar ? pkg.duration_ar : pkg.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">{language === 'ar' ? 'الوجهة' : 'Destination'}</p>
                  <p className="text-2xl font-bold text-blue-600">{language === 'ar' && pkg.country_ar ? pkg.country_ar : pkg.country}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">{language === 'ar' ? 'الانطلاق' : 'Departure'}</p>
                  <p className="text-lg font-semibold text-gray-800">{language === 'ar' && pkg.departure_ar ? pkg.departure_ar : pkg.departure}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">{language === 'ar' ? 'الأنسب لـ' : 'Best For'}</p>
                  <p className="text-lg font-semibold text-gray-800">{language === 'ar' ? 'المجموعات والعائلات' : 'Groups & Families'}</p>
                </div>
              </div>
            </div>

            {/* Itinerary Highlight */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{translations[language].tripHighlights}</h2>
              <div className="space-y-4">
                {pkg.includes.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 border-l-4 border-blue-500 bg-white rounded-r-lg shadow-sm">
                    <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-gray-800">{language === 'ar' ? `اليوم ${idx + 1}` : `Day ${idx + 1}`}</p>
                      <p className="text-gray-600">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{language === 'ar' ? 'لماذا اختيار هذه الحزمة؟' : 'Why Choose This Package?'}</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  {language === 'ar' ? 'مرشدون سياحيون محترفون وذوو خبرة' : 'Professional and experienced tour guides'}
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  {language === 'ar' ? 'حزمة شاملة بدون تكاليف مخفية' : 'All-inclusive package with no hidden costs'}
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  {language === 'ar' ? 'إقامة وسفر مريح' : 'Comfortable accommodation and transportation'}
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  {language === 'ar' ? 'دعم العملاء على مدار الساعة طوال فترة رحلتك' : '24/7 customer support during your trip'}
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  {language === 'ar' ? 'سياسة حجز وإلغاء مرنة' : 'Flexible booking and cancellation policy'}
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Booking Card */}
            <div className="bg-gradient-to-b from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-lg sticky top-32">
              <div className="mb-6">
                <p className="text-gray-600 text-sm mb-2">{language === 'ar' ? 'سعر الحزمة' : 'Package Price'}</p>
                <div className="text-4xl font-bold text-blue-600 mb-2">{formatPrice(pkg.priceUSD)}</div>
                <p className="text-gray-700 text-sm">{language === 'ar' ? 'لكل شخص (شامل كل شيء)' : 'per person (all-inclusive)'}</p>
              </div>

              <div className="space-y-4 mb-8 pb-8 border-b border-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-700">{language === 'ar' ? 'المدة:' : 'Duration:'}</span>
                  <span className="font-semibold text-gray-800">{pkg.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">{language === 'ar' ? 'الوجهة:' : 'Destination:'}</span>
                  <span className="font-semibold text-gray-800">{pkg.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">{language === 'ar' ? 'التقييم:' : 'Rating:'}</span>
                  <span className="font-semibold text-gray-800">{pkg.rating}/5.0</span>
                </div>
              </div>

              {/* Group Size */}
              <div className="mb-6 p-4 bg-white rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-800">{language === 'ar' ? 'حجم المجموعة' : 'Group Size'}</span>
                </div>
                <p className="text-sm text-gray-600">{language === 'ar' ? 'مناسب للمجموعات من 2 إلى 20 شخص' : 'Perfect for groups of 2-20 people'}</p>
              </div>

              <button
                onClick={handleBookNow}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 mb-4"
              >
                {translations[language].bookNowWhatsApp}
              </button>

              <p className="text-xs text-gray-600 text-center">
                {language === 'ar' ? 'انقر للتواصل معنا لمعرفة التوفر والخصومات الجماعية الخاصة' : 'Click to contact us for availability and special group discounts'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
