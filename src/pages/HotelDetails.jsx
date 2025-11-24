import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, ChevronLeft, Check, X } from 'lucide-react';
import { getHotelById } from '../data/hotelData';
import { useCurrency } from '../context/CurrencyContext';
import { useLanguage, translations } from '../context/LanguageContext';

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotel = getHotelById(id);
  const { formatPrice } = useCurrency();
  const { language } = useLanguage();
  const [selectedRooms, setSelectedRooms] = useState({});
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

  const handleSelectRoom = (roomId) => {
    setSelectedRooms(prev => ({
      ...prev,
      [roomId]: !prev[roomId]
    }));
  };

  const handleBooking = () => {
    const selected = Object.keys(selectedRooms).filter(roomId => selectedRooms[roomId]);
    if (selected.length === 0) {
      alert('Please select at least one room');
      return;
    }
    // TODO: Implement booking logic
    alert(`Booking ${selected.length} room(s) for ${hotel.title}`);
  };

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
                  <p className="text-sm text-gray-600 mb-1">Starting Price</p>
                  <p className="text-2xl font-bold text-teal-600">{formatPrice(hotel.baseprice)}</p>
                  <p className="text-xs text-gray-500">{translations[language].night}</p>
                </div>
                <div className="border-t border-gray-300 pt-4">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Room Types Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Available Rooms</h2>
          
          <div className="space-y-6">
            {hotel.rooms.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition"
              >
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                    {/* Room Type and Details */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{room.type}</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p><strong>Bed:</strong> {room.bed}</p>
                        <p><strong>Guests:</strong> Up to {room.maxGuests}</p>
                      </div>
                    </div>

                    {/* Refundable Status */}
                    <div>
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                        room.refundable 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {room.refundable ? (
                          <>
                            <Check size={16} />
                            Refundable
                          </>
                        ) : (
                          <>
                            <X size={16} />
                            Non-Refundable
                          </>
                        )}
                      </div>
                      
                      {/* Room Amenities */}
                      <div className="mt-4">
                        <p className="text-xs text-gray-600 mb-2 font-semibold">Amenities:</p>
                        <div className="flex flex-wrap gap-2">
                          {room.amenities.slice(0, 3).map((amenity, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              {amenity}
                            </span>
                          ))}
                          {room.amenities.length > 3 && (
                            <span className="text-xs text-gray-500 px-2 py-1">
                              +{room.amenities.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="md:text-center">
                      <p className="text-sm text-gray-600 mb-1">Per Night</p>
                      <p className="text-3xl font-bold text-teal-600">{formatPrice(room.price)}</p>
                    </div>

                    {/* Select Button */}
                    <div>
                      <button
                        onClick={() => handleSelectRoom(room.id)}
                        className={`w-full py-3 px-4 rounded-lg font-semibold transition ${
                          selectedRooms[room.id]
                            ? 'bg-teal-600 text-white hover:bg-teal-700'
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                      >
                        {selectedRooms[room.id] ? 'Selected ✓' : 'Select Room'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Booking Summary and Button */}
          <div className="mt-12 bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl p-8 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Ready to Book?</h3>
                <p className="text-teal-100">
                  {Object.values(selectedRooms).filter(Boolean).length > 0 
                    ? `${Object.values(selectedRooms).filter(Boolean).length} room(s) selected` 
                    : 'Select rooms to proceed with booking'}
                </p>
              </div>
              <button
                onClick={handleBooking}
                className="bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition hover:shadow-xl"
              >
                Proceed to Booking
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotelDetails;
