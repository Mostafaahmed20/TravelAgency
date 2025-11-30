import { useState } from 'react';
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
      className="min-w-full sm:min-w-80 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-48 sm:h-56 cursor-pointer" onClick={handleImageClick} {...swipeHandlers}>
        <img
          src={images[currentImageIndex]}
          alt={pkg.title}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <p className="text-white text-sm">{translations[language].clickToViewDetails}</p>
        </div>
        {/* Destination Badge */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full px-3 py-1 text-sm font-semibold shadow-md">
          {language === 'ar' && props.destination_ar ? props.destination_ar : pkg.destination}
        </div>
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 z-10">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-4 sm:p-5">
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
          {language === 'ar' && props.title_ar ? props.title_ar : pkg.title}
        </h3>

        {/* Rating */}
        <div className="mb-3">
          <RatingStars rating={pkg.rating} size="sm" />
        </div>

        {/* Meta Info */}
        <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{language === 'ar' && props.duration_ar ? props.duration_ar : pkg.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-lg font-bold text-green-600">
            <DollarSign className="w-5 h-5" />
            <span>{priceUSD ? formatPrice(priceUSD) : (language === 'ar' && props.price_ar ? props.price_ar : pkg.price)}</span>
          </div>
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
