import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { useLanguage, translations } from '../../context/LanguageContext';

const DestinationCard = ({ id, image, title, description, rating, reviews }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const handleImageClick = () => {
    if (id) {
      navigate(`/hotel/${id}`);
    }
  };

  const handleBookNow = () => {
    const message = `🏨 Hotel Interest: ${title}\n\nI am interested in this hotel and need support to book it. Please assist me.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/201515196284?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-105 duration-300">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-teal-400 to-blue-500 overflow-hidden group cursor-pointer" onClick={handleImageClick}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({reviews} reviews)</span>
        </div>

        {/* Button */}
        <div className={`flex justify-end pt-4 border-t border-gray-200`}>
          <button 
            onClick={handleBookNow}
            className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition font-medium">
            {translations[language].bookNow}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
