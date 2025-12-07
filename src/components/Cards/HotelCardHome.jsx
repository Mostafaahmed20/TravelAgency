import React, { useState } from 'react';
import { MapPin, Star, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { openWhatsApp } from '../../utils/whatsappRedirect';
import { useCurrency } from '../../context/CurrencyContext';
import { useSwipe } from '../../hooks/useSwipe';

import { useLanguage, translations } from '../../context/LanguageContext';
export const HotelCardHome = ({ id, name, city, country, image, rating, stars, price, priceUSD, description, features, reviews, hotelType = 'egypt', ...props }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { language } = useLanguage();
  const { formatPrice } = useCurrency();
  const hotel = { id, name, city, country, image, rating, stars, price, priceUSD, description, features, reviews };
  const images = Array.isArray(image) ? image : [image];

  const handleSwipeLeft = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handleSwipeRight = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const swipeHandlers = useSwipe(handleSwipeLeft, handleSwipeRight);

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
      className="min-w-[280px] sm:min-w-[320px] max-w-[320px] bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group border border-gray-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-56 cursor-pointer" onClick={handleImageClick} {...swipeHandlers}>
        <img
          src={images[currentImageIndex]}
          alt={hotel.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
        
        {/* Star Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
          <span className="text-yellow-500 text-sm">★</span>
          <span className="text-sm font-bold text-gray-800">{hotel.stars}</span>
        </div>

        {/* Hotel Name and Location on Image */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-lg font-bold line-clamp-2 mb-1">
            {language === 'ar' && props.name_ar ? props.name_ar : hotel.name}
          </h3>
          <div className="flex items-center gap-1.5 text-sm text-white/90">
            <MapPin className="w-4 h-4" />
            <span>{language === 'ar' && props.city_ar ? props.city_ar : hotel.city}</span>
          </div>
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50 w-1.5'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-4">
        {/* Price */}
        <div className="flex items-center gap-2 text-gray-800 font-bold mb-4">
          <DollarSign className="w-5 h-5 text-teal-600" />
          <span className="text-lg">{priceUSD ? formatPrice(priceUSD) : (language === 'ar' && props.price_ar ? props.price_ar : hotel.price)}</span>
        </div>

        {/* Button */}
        <button
          onClick={handleBookNow}
          className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
        >
          {translations[language].bookNow}
        </button>
      </div>
    </div>
  );
};
