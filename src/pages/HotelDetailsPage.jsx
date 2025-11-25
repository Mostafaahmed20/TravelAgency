import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Phone, Wifi, Utensils, Dumbbell, ChevronRight } from 'lucide-react';
import { hotelsEgyptData, hotelsSaudiData } from '../data/destinationsData';
import { openWhatsApp } from '../utils/whatsappRedirect';

import { useLanguage, translations } from '../context/LanguageContext';
const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
    const { language } = useLanguage();
  
  // Try to find hotel in both Egypt and Saudi Arabia data
  let hotel = hotelsEgyptData.find(h => h.id === parseInt(id));
  let hotelType = 'egypt';
  
  if (!hotel) {
    hotel = hotelsSaudiData.find(h => h.id === parseInt(id));
    hotelType = 'saudi';
  }

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{language === 'ar' ? 'الفندق غير موجود' : 'Hotel Not Found'}</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
          </button>
        </div>
      </div>
    );
  }

  const handleBookNow = () => {
    const message = `Hello, I want to book ${hotel.name} in ${hotel.city}, ${hotel.country}.`;
    openWhatsApp(message);
  };

  const amenities = [
    { icon: Wifi, label: 'Free WiFi' },
    { icon: Utensils, label: 'Restaurant' },
    { icon: Dumbbell, label: 'Gym' },
    { icon: Phone, label: '24/7 Support' },
    ...hotel.features.map((feature, idx) => ({
      icon: ChevronRight,
      label: feature
    }))
  ];

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
            {language === 'ar' ? 'العودة للفنادق' : 'Back to Hotels'}
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="rounded-2xl overflow-hidden shadow-2xl h-96 md:h-[500px]">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header Info */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                {hotel.name}
              </h1>
              <div className="flex items-center gap-4 flex-wrap mb-4">
                <div className="flex items-center gap-2 text-blue-600 text-lg">
                  <MapPin className="w-5 h-5" />
                  <span>{hotel.city}, {hotel.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  {[...Array(hotel.stars)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(hotel.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-bold text-gray-800">{hotel.rating}/5.0</span>
                <span className="text-gray-600">({hotel.reviews} reviews)</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{language === 'ar' ? 'عن الفندق' : 'About'}</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {hotel.description}
              </p>
            </div>

            {/* Features */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{language === 'ar' ? 'المرافق والميزات' : 'Amenities & Features'}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hotel.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                  >
                    <ChevronRight className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-800 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Info */}
            <div className="mb-10 bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{language === 'ar' ? 'معلومات الغرفة' : 'Room Information'}</h2>
              <p className="text-gray-700 text-lg mb-4">
                {language === 'ar' ? 'غرفنا المصممة بعناية توفر مزيجًا مثاليًا من الراحة والفخامة. كل غرفة مجهزة بأحدث وسائل الراحة لضمان إقامة لا تُنسى.' : 'Our carefully designed rooms offer the perfect blend of comfort and luxury. Each room is equipped with modern amenities to ensure your stay is unforgettable.'}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">{language === 'ar' ? 'أنواع الغرف' : 'Room Types'}</p>
                  <p className="font-bold text-gray-800">Standard to Deluxe</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">{language === 'ar' ? 'السعة' : 'Occupancy'}</p>
                  <p className="font-bold text-gray-800">1-4 Persons</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">{language === 'ar' ? 'المرافق' : 'Amenities'}</p>
                  <p className="font-bold text-gray-800">Air Conditioning</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">{language === 'ar' ? 'تسجيل الدخول' : 'Check-in'}</p>
                  <p className="font-bold text-gray-800">2:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Booking Card */}
            <div className="bg-gradient-to-b from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-lg sticky top-32">
              <div className="mb-6">
                <p className="text-gray-600 text-sm mb-2">{language === 'ar' ? 'السعر في الليلة' : 'Price per Night'}</p>
                <div className="text-3xl font-bold text-blue-600 mb-2">{hotel.price}</div>
              </div>

              <div className="space-y-3 mb-8 pb-8 border-b border-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-700">{language === 'ar' ? 'النجوم:' : 'Stars:'}</span>
                  <div className="flex">
                    {[...Array(hotel.stars)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">{language === 'ar' ? 'التقييم:' : 'Rating:'}</span>
                  <span className="font-semibold text-gray-800">{hotel.rating}/5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">{language === 'ar' ? 'الموقع:' : 'Location:'}</span>
                  <span className="font-semibold text-gray-800">{hotel.city}</span>
                </div>
              </div>

              <button
                onClick={handleBookNow}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 mb-4"
              >
                {language === 'ar' ? 'احجز الآن عبر WhatsApp' : 'Book Now via WhatsApp'}
              </button>

              <p className="text-xs text-gray-600 text-center">
                {language === 'ar' ? 'انقر للتواصل معنا لمعرفة توفر الغرف والعروض الخاصة' : 'Click to contact us for room availability and special offers'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
