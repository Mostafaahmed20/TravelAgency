import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Users, Wifi, Coffee, Waves } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCurrency } from '../../context/CurrencyContext';

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
  
  const displayTitle = language === 'ar' ? title_ar : title;
  const displayLocation = language === 'ar' ? location_ar : location;
  
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
      className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group"
    >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={image} 
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
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Title */}
        <h3 className={`text-xl font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem] ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          {displayTitle}
        </h3>

        {/* Location */}
        <div className={`flex items-start gap-2 mb-3 text-gray-600 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <MapPin size={16} className="mt-0.5 flex-shrink-0 text-teal-600" />
          <p className={`text-sm line-clamp-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            {displayLocation}
          </p>
        </div>

        {/* Reviews */}
        <div className={`flex items-center gap-2 mb-4 text-sm text-gray-500 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <Users size={14} />
          <span>{reviews?.toLocaleString()} {language === 'ar' ? 'تقييم' : 'reviews'}</span>
        </div>

        {/* Amenities */}
        {displayAmenities.length > 0 && (
          <div className={`flex flex-wrap gap-2 mb-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            {displayAmenities.map((amenity, index) => (
              <div 
                key={index}
                className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1.5 rounded-lg text-xs text-gray-700"
              >
                {getAmenityIcon(amenity)}
                <span className="line-clamp-1">{amenity}</span>
              </div>
            ))}
          </div>
        )}

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
            className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-2.5 rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
          >
            {language === 'ar' ? 'احجز الآن' : 'Book Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
