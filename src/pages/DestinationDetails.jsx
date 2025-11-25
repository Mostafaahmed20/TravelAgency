import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, DollarSign, MapPin, Star, ChevronRight } from 'lucide-react';
import { destinationsData } from '../data/destinationsData';
import { RatingStars } from '../components/Common/RatingStars';
import { openWhatsApp } from '../utils/whatsappRedirect';

const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const destination = destinationsData.find(d => d.id === parseInt(id));

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Destination Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleBookNow = () => {
    const message = `Hello, I want to book ${destination.city}, ${destination.country} package.`;
    openWhatsApp(message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      {/* Header Navigation */}
      <div className="bg-white shadow-sm sticky top-20 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Destinations
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="rounded-2xl overflow-hidden shadow-2xl h-96 md:h-[500px]">
          <img
            src={destination.image}
            alt={destination.city}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header Info */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                {destination.city}
              </h1>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-blue-600 text-lg">
                  <MapPin className="w-5 h-5" />
                  <span>{destination.country}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-lg">
                  <Clock className="w-5 h-5" />
                  <span>{destination.days}</span>
                </div>
              </div>
              <div className="mt-4">
                <RatingStars rating={destination.rating} size="lg" />
              </div>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About this Destination</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {destination.description}
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                Immerse yourself in the rich culture, stunning landscapes, and unforgettable experiences that await you in {destination.city}. Whether you're seeking adventure, relaxation, or cultural enrichment, this destination offers something special for every traveler.
              </p>
            </div>

            {/* Activities Section */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Activities & Experiences</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.activities.map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                  >
                    <ChevronRight className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-800 font-medium">{activity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights Section */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Trip Highlights</h2>
              <div className="space-y-3">
                {destination.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-3 border-l-4 border-blue-500 bg-white rounded-r-lg">
                    <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-800">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Booking Card */}
            <div className="bg-gradient-to-b from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-lg sticky top-32">
              <div className="mb-6">
                <p className="text-gray-600 text-sm mb-2">Starting from</p>
                <div className="text-4xl font-bold text-blue-600 mb-2">{destination.price}</div>
                <p className="text-gray-700 font-semibold">for {destination.days}</p>
              </div>

              <div className="space-y-4 mb-8 pb-8 border-b border-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-700">Duration:</span>
                  <span className="font-semibold text-gray-800">{destination.days}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Rating:</span>
                  <span className="font-semibold text-gray-800">{destination.rating}/5.0</span>
                </div>
              </div>

              <button
                onClick={handleBookNow}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 mb-4"
              >
                Book Now via WhatsApp
              </button>

              <p className="text-xs text-gray-600 text-center">
                Click to contact us directly for more information and booking
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Destinations */}
      <section className="bg-gray-50 py-16 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Similar Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destinationsData
              .filter(d => d.id !== destination.id)
              .slice(0, 3)
              .map((dest) => (
                <div
                  key={dest.id}
                  onClick={() => navigate(`/destinations/${dest.id}`)}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer"
                >
                  <img
                    src={dest.image}
                    alt={dest.city}
                    className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{dest.city}</h3>
                    <p className="text-gray-600 text-sm mb-3">{dest.country}</p>
                    <RatingStars rating={dest.rating} size="sm" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationDetails;
