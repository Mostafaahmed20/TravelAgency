import { useState } from 'react';
import { MapPin, Star, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { openWhatsApp } from '../../utils/whatsappRedirect';
import { useCurrency } from '../../context/CurrencyContext';

import { useLanguage, translations } from '../../context/LanguageContext';
export const HotelCardHome = ({ id, name, city, country, image, rating, stars, price, priceUSD, description, features, reviews, hotelType = 'egypt', ...props }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const { language } = useLanguage();
  const { formatPrice } = useCurrency();
  const hotel = { id, name, city, country, image, rating, stars, price, priceUSD, description, features, reviews };

  const handleImageClick = () => {
    const route = hotelType === 'saudi' ? `/hotels-sa/${hotel.id}` : `/hotels-eg/${hotel.id}`;
    navigate(route);
  };

  const handleBookNow = (e) => {
    e.stopPropagation();
    const message = `Hello, I want to book ${hotel.name} in ${hotel.city}, ${hotel.country}.`;
    openWhatsApp(message);
  };

  return (
    <div
      className="min-w-[280px] sm:min-w-[320px] max-w-[320px] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-48 sm:h-56 cursor-pointer" onClick={handleImageClick}>
        <img
          src={hotel.image}
          alt={hotel.name}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <p className="text-white text-sm">{translations[language].clickForDetails}</p>
        </div>
        {/* Star Rating Badge */}
        <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-md">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold text-gray-800">{hotel.stars}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-4 sm:p-5">
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
          {language === 'ar' && props.name_ar ? props.name_ar : hotel.name}
        </h3>
        <div className="flex items-center gap-2 text-blue-600 text-sm mb-3">
          <MapPin className="w-4 h-4" />
          <span>{language === 'ar' && props.city_ar ? props.city_ar : hotel.city}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(hotel.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-700">({hotel.rating})</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 flex-grow">
          {language === 'ar' && props.description_ar ? props.description_ar : hotel.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 text-gray-800 font-bold mb-4 pb-4 border-b border-gray-200">
          <DollarSign className="w-4 h-4 text-green-600" />
          <span>{priceUSD ? formatPrice(priceUSD) : (language === 'ar' && props.price_ar ? props.price_ar : hotel.price)}</span>
        </div>

        {/* Button */}
        <button
          onClick={handleBookNow}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          {translations[language].bookNow}
        </button>
      </div>
    </div>
  );
};
