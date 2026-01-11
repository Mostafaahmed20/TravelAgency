import React, { useState } from 'react';
import { MapPin, Users, Clock, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RatingStars } from '../Common/RatingStars';
import { openWhatsApp } from '../../utils/whatsappRedirect';
import { useCurrency } from '../../context/CurrencyContext';
import { useSwipe } from '../../hooks/useSwipe';

import { useLanguage, translations } from '../../context/LanguageContext';
export const PackageCardHome = ({ id, title, destination, duration, maxPeople, price, priceUSD, image, includes, rating, ...props }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { language } = useLanguage();
  const { formatPrice } = useCurrency();
  const pkg = { id, title, destination, duration, maxPeople, price, priceUSD, image, includes, rating };
  const images = Array.isArray(image) ? image : [image];

  const handleSwipeLeft = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handleSwipeRight = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const swipeHandlers = useSwipe(handleSwipeLeft, handleSwipeRight);

  const handleImageClick = () => {
    navigate(`/packages/${pkg.id}`);
  };

  const handleBookNow = (e) => {
    e.stopPropagation();
    const message = `Hello, I want to book ${pkg.title} package (${pkg.duration}).`;
    openWhatsApp(message);
  };

  return (
    <div
      className="min-w-full sm:min-w-80 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group border border-gray-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-64 cursor-pointer" onClick={handleImageClick} {...swipeHandlers}>
        <img
          src={images[currentImageIndex]}
          alt={pkg.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        
        {/* Title on Image */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <h3 className="text-2xl font-bold mb-1">
            {language === 'ar' && props.title_ar ? props.title_ar : pkg.title}
          </h3>
          <div className="flex items-center gap-2 text-white/90">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{language === 'ar' && props.destination_ar ? props.destination_ar : pkg.destination}</span>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1 shadow-lg">
          <span className="text-yellow-500 text-sm">★</span>
          <span className="text-sm font-bold text-gray-800">{pkg.rating}</span>
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10">
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
      <div className="flex flex-col flex-grow p-5">
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-teal-600" />
            <span>{language === 'ar' && props.duration_ar ? props.duration_ar : pkg.duration}</span>
          </div>
          <div className="h-4 w-px bg-gray-300"></div>
          <div className="flex items-center gap-1.5 font-semibold text-gray-800">
            <DollarSign className="w-4 h-4 text-teal-600" />
            <span>{priceUSD ? formatPrice(priceUSD) : (language === 'ar' && props.price_ar ? props.price_ar : pkg.price)}</span>
          </div>
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
