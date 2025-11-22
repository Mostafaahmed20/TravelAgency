import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { useLanguage, translations } from '../../context/LanguageContext';

const DestinationCard = ({ image, title, description, price, rating, reviews }) => {
  const { formatPrice, currency } = useCurrency();
  const { language } = useLanguage();
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-105 duration-300">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-teal-400 to-blue-500 overflow-hidden group">
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

        {/* Price and Button */}
        <div className={`flex justify-between items-center pt-4 border-t border-gray-200 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <div>
            <span className="text-2xl font-bold text-teal-600">{formatPrice(price)}</span>
            <span className="text-sm text-gray-600">{translations[language].night}</span>
          </div>
          <button className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition font-medium">
            {translations[language].bookNow}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
