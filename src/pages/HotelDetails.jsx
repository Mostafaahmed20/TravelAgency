import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, ChevronLeft, Check } from 'lucide-react';
import { getHotelById } from '../data/hotelData';
import { useLanguage, translations } from '../context/LanguageContext';

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotel = getHotelById(id);
  const { language } = useLanguage();
  const displayTitle = language === 'ar' && hotel?.title_ar ? hotel.title_ar : hotel?.title;

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Hotel Not Found</h1>
          <button
            onClick={() => navigate('/hotels')}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
          >
            Back to Hotels
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/hotels')}
            className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium"
          >
            <ChevronLeft size={20} />
            Back to Hotels
          </button>
        </div>
      </div>

      {/* Hero Section with Hotel Image */}
      <section className="relative h-96 bg-gray-800 overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="bg-gradient-to-t from-black to-transparent p-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{displayTitle}</h1>
            <div className="flex items-center gap-4 text-lg">
              <div className="flex items-center gap-2">
                <MapPin size={20} />
                <span>{hotel.location}</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.floor(hotel.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}
                  />
                ))}
                <span className="ml-2">({hotel.reviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Information Section */}
      <section className="py-12 px-4 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Description */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Hotel</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{hotel.description}</p>
              
              {/* Amenities */}
              <h3 className="text-xl font-bold text-gray-800 mb-4">Hotel Amenities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hotel.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-700">
                    <Check size={20} className="text-teal-600" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Info Card */}
            <div className="bg-gray-50 rounded-xl p-6 h-fit border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Info</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Rating</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-800">{hotel.rating}</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < Math.floor(hotel.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-300 pt-4">
                  <p className="text-sm text-gray-600 mb-2">Reviews</p>
                  <p className="text-lg font-semibold text-gray-800">{hotel.reviews} guest reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Gallery Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Hotel Gallery</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Main hotel image */}
            <div className="lg:col-span-2 lg:row-span-2 rounded-xl overflow-hidden shadow-lg h-96">
              <img
                src={hotel.image}
                alt={hotel.title}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>

            {/* Additional hotel images - using placeholder images for now */}
            <div className="rounded-xl overflow-hidden shadow-lg h-44">
              <img
                src="https://images.unsplash.com/photo-1631049307038-da0ec9d70304?w=400&h=300&fit=crop"
                alt="Hotel Interior"
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg h-44">
              <img
                src="https://images.unsplash.com/photo-1566163566359-90f06ba7c364?w=400&h=300&fit=crop"
                alt="Hotel Amenities"
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg h-44">
              <img
                src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop"
                alt="Hotel Room"
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg h-44">
              <img
                src="https://images.unsplash.com/photo-1512453076900-730b63b2c189?w=400&h=300&fit=crop"
                alt="Hotel Restaurant"
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotelDetails;
