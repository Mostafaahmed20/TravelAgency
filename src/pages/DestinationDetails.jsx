import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, DollarSign, MapPin, Star, ChevronRight } from 'lucide-react';
import { destinationsData } from '../data/destinationsData';
import { RatingStars } from '../components/Common/RatingStars';
import { openWhatsApp } from '../utils/whatsappRedirect';
import { useCurrency } from '../context/CurrencyContext';
import { useLanguage, translations } from '../context/LanguageContext';

const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const destination = destinationsData.find(d => d.id === parseInt(id));
  const { formatPrice } = useCurrency();
  const { language } = useLanguage();
  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{translations[language].destinationNotFound}</h1>
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
    const message = `Hello, I want to book ${destination.city}, ${destination.country} package.`;
    openWhatsApp(message);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => navigate('/')}
              className="text-teal-600 hover:text-teal-700 font-medium transition flex items-center gap-1"
            >
              <ArrowLeft className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
              {translations[language].backToHome || 'العودة للرئيسية'}
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{language === 'ar' && destination.city_ar ? destination.city_ar : destination.city}</span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="rounded-2xl overflow-hidden shadow-lg h-80 md:h-[450px]">
          <img
            src={destination.image}
            alt={language === 'ar' && destination.city_ar ? destination.city_ar : destination.city}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {language === 'ar' && destination.city_ar ? destination.city_ar : destination.city}
              </h1>
              <div className="flex items-center gap-6 flex-wrap mb-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-5 h-5 text-teal-600" />
                  <span className="font-medium">{language === 'ar' && destination.country_ar ? destination.country_ar : destination.country}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="w-5 h-5 text-teal-600" />
                  <span className="font-medium">{language === 'ar' && destination.days_ar ? destination.days_ar : destination.days}</span>
                </div>
              </div>
              <div className="mt-4">
                <RatingStars rating={destination.rating} size="lg" />
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-teal-600 rounded"></span>
                {translations[language].aboutDestination}
              </h2>
              <p className="text-gray-700 text-base leading-relaxed mb-6">
                {language === 'ar' && destination.description_ar ? destination.description_ar : destination.description}
              </p>
              {destination.aboutOverview && (
                <div className="prose prose-base max-w-none mt-6">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {language === 'ar' && destination.aboutOverview_ar ? destination.aboutOverview_ar : destination.aboutOverview}
                  </div>
                </div>
              )}
            </div>

            {/* Activities Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-teal-600 rounded"></span>
                {translations[language].activitiesExperiences}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(language === 'ar' && destination.activities_ar ? destination.activities_ar : destination.activities).map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-teal-50 transition border border-gray-100"
                  >
                    <div className="w-2 h-2 bg-teal-600 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-800 font-medium text-sm">{activity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-teal-600 rounded"></span>
                {translations[language].tripHighlights}
              </h2>
              <div className="space-y-3">
                {(language === 'ar' && destination.highlights_ar ? destination.highlights_ar : destination.highlights).map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
                    <Star className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" fill="currentColor" />
                    <span className="text-gray-800 text-sm leading-relaxed">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Booking Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg sticky top-24 border border-gray-100">
              <div className="mb-6">
                <p className="text-gray-600 text-sm mb-2">{translations[language].startingFrom}</p>
                <div className="text-3xl font-bold text-teal-600 mb-1">{formatPrice(destination.priceUSD)}</div>
                <p className="text-gray-700 text-sm font-medium">{language === 'ar' ? `${translations[language].forDuration} ${destination.days_ar || destination.days}` : `${translations[language].forDuration} ${destination.days}`}</p>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">{translations[language].duration}:</span>
                  <span className="font-semibold text-gray-900 text-sm">{destination.days}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">{translations[language].ratingLabel}:</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                    <span className="font-semibold text-gray-900 text-sm">{destination.rating}/5.0</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleBookNow}
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-bold py-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg mb-3"
              >
                {translations[language].bookNowWhatsApp}
              </button>

              <p className="text-xs text-gray-500 text-center leading-relaxed">
                {language === 'ar' ? 'انقر للتواصل معنا مباشرة للحصول على مزيد من المعلومات والحجز' : 'Click to contact us directly for more information and booking'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Destinations */}
      <section className="bg-white py-12 mt-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <span className="w-1 h-8 bg-teal-600 rounded"></span>
            {translations[language].similarDestinations}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destinationsData
              .filter(d => d.id !== destination.id)
              .slice(0, 3)
              .map((dest) => (
                <div
                  key={dest.id}
                  onClick={() => {
                    navigate(`/destinations/${dest.id}`);
                    window.scrollTo(0, 0);
                  }}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-teal-200 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={dest.image}
                      alt={language === 'ar' && dest.city_ar ? dest.city_ar : dest.city}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-md">
                      <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                      <span className="text-sm font-bold text-gray-800">{dest.rating}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition">
                      {language === 'ar' && dest.city_ar ? dest.city_ar : dest.city}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-teal-600" />
                      {language === 'ar' && dest.country_ar ? dest.country_ar : dest.country}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-teal-600 font-bold text-lg">{formatPrice(dest.priceUSD)}</span>
                      <span className="text-gray-500 text-xs">{dest.days}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationDetails;
