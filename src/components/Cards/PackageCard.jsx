import React from 'react';
import { Star, MapPin, Calendar } from 'lucide-react';

const PackageCard = ({ image, title, duration, price, rating, includes }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-105 duration-300">
      {/* Image */}
      <div className="relative h-52 bg-gradient-to-br from-teal-400 to-blue-500 overflow-hidden group">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-lg">
          <Star size={16} className="fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-bold">{rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        
        <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
          <Calendar size={16} />
          <span>{duration}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4">{includes}</p>

        {/* Price and Button */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div>
            <span className="text-2xl font-bold text-teal-600">${price}</span>
            <span className="text-sm text-gray-600"> /person</span>
          </div>
          <button className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition font-medium">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
