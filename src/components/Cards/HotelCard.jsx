import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Users, Wifi, Coffee, Waves } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useSwipe } from '../../hooks/useSwipe';

const HotelCard = ({ 
  id, 
  image, 
  title, 
  title_ar, 
  location,
  location_ar,
  rating, 
  reviews, 
  baseprice,
  amenities = []
}) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { formatPrice } = useCurrency();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = Array.isArray(image) ? image : [image];
  
  const displayTitle = language === 'ar' ? title_ar : title;
  const displayLocation = language === 'ar' ? location_ar : location;

  const handleSwipeLeft = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handleSwipeRight = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const swipeHandlers = useSwipe(handleSwipeLeft, handleSwipeRight);
  
  const handleClick = () => {
    navigate(`/hotel/${id}`);
    window.scrollTo(0, 0);
  };

  const getAmenityIcon = (amenity) => {
    const amenityLower = amenity.toLowerCase();
    if (amenityLower.includes('wifi')) return <Wifi size={14} />;
    if (amenityLower.includes('pool')) return <Waves size={14} />;
    if (amenityLower.includes('breakfast') || amenityLower.includes('dining')) return <Coffee size={14} />;
    return null;
  };

  const displayAmenities = amenities.slice(0, 3);

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group border border-gray-100"
    >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden" {...swipeHandlers}>
        <img 
          src={images[currentImageIndex]} 
          alt={displayTitle}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=400&fit=crop';
          }}
        />
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
          <Star size={16} fill="#FFC107" color="#FFC107" />
          <span className="font-bold text-gray-800">{rating}</span>
        </div>
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
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

      {/* Content Section */}
      <div className="p-5">
        {/* Title */}
        <h3 className={`text-xl font-bold text-gray-800 mb-6 line-clamp-2 min-h-[3.5rem] ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          {displayTitle}
        </h3>

        {/* Price and CTA */}
        <div className={`flex items-center justify-between pt-4 border-t border-gray-200 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <div className={language === 'ar' ? 'text-right' : 'text-left'}>
            <p className="text-xs text-gray-500 mb-1">
              {language === 'ar' ? 'ابتداءً من' : 'From'}
            </p>
            <p className="text-2xl font-bold text-teal-600">
              {formatPrice(baseprice)}
            </p>
            <p className="text-xs text-gray-500">
              {language === 'ar' ? 'لليلة' : 'per night'}
            </p>
          </div>
          <button 
            className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-2.5 rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-sm hover:shadow-md font-semibold"
          >
            {language === 'ar' ? 'احجز الآن' : 'Book Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
