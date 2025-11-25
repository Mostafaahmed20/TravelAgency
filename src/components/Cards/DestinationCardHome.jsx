import { useState } from 'react';
import { MapPin, Clock, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RatingStars } from '../Common/RatingStars';
import { openWhatsApp } from '../../utils/whatsappRedirect';

import { useLanguage, translations } from '../../context/LanguageContext';
export const DestinationCardHome = ({ id, city, country, image, description, rating, days, price, activities, highlights, ...props }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const { language } = useLanguage();
  const destination = { id, city, country, image, description, rating, days, price, activities, highlights };

  const handleImageClick = () => {
    navigate(`/destinations/${destination.id}`);
  };

  const handleBookNow = (e) => {
    e.stopPropagation();
    const message = `Hello, I want to book ${destination.city}, ${destination.country} package.`;
    openWhatsApp(message);
  };

  return (
    <div
      className="min-w-full sm:min-w-80 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-48 sm:h-56 cursor-pointer" onClick={handleImageClick}>
        <img
          src={destination.image}
          alt={destination.city}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <p className="text-white text-sm">{language === 'ar' ? 'انقر للاستكشاف' : 'Click to explore'}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-4 sm:p-5">
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
          {destination.city}
        </h3>
        <div className="flex items-center gap-2 text-blue-600 text-sm mb-3">
          <MapPin className="w-4 h-4" />
          <span>{destination.country}</span>
        </div>

        {/* Rating */}
        <div className="mb-3">
          <RatingStars rating={destination.rating} size="sm" />
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 flex-grow">
          {destination.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{destination.days}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>{destination.price}</span>
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
