import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { HotelCardHome } from '../Cards/HotelCardHome';
import { PackageCardHome } from '../Cards/PackageCardHome';
import { useLanguage } from '../../context/LanguageContext';

// City Card Component (for horizontal display)
export const CityCard = ({ cityData, isExpanded, onToggle }) => {
  const { language } = useLanguage();
  const displayCity = language === 'ar' ? cityData.city_ar : cityData.city;

  return (
    <div className="flex-shrink-0 w-80 sm:w-96">
      <button
        onClick={onToggle}
        className="w-full relative h-64 sm:h-72 overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={cityData.image}
            alt={displayCity}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 group-hover:from-black/85 group-hover:via-black/60 group-hover:to-black/40 transition-all duration-300 ${isExpanded ? 'ring-4 ring-teal-500' : ''}`}></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col justify-end p-6">
          <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-lg">
              {displayCity}
            </h3>
          </div>
        </div>

        {/* Active Indicator */}
        {isExpanded && (
          <div className="absolute top-4 right-4 bg-teal-500 rounded-full p-2 shadow-lg">
            <ChevronUp className="w-5 h-5 text-white" />
          </div>
        )}
      </button>
    </div>
  );
};

// Hotels Container Component
export const HotelsContainer = ({ cityData, hotelType, scrollValue, onScroll, onMaxScrollChange, cardComponent }) => {
  const { language } = useLanguage();
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [maxScroll, setMaxScroll] = useState(0);
  
  // Determine which card component to use
  const CardComponent = cardComponent || HotelCardHome;

  useEffect(() => {
    const calculateMaxScroll = () => {
      if (containerRef.current && contentRef.current) {
        // Use actual measured widths
        const containerWidth = containerRef.current.offsetWidth;
        const contentWidth = contentRef.current.scrollWidth;
        // Add a small buffer (2px) to account for rounding issues
        const maxScrollValue = Math.max(0, contentWidth - containerWidth + 2);
        setMaxScroll(maxScrollValue);
        // Notify parent component of max scroll value
        if (onMaxScrollChange) {
          onMaxScrollChange(maxScrollValue);
        }
      }
    };

    // Calculate multiple times to ensure accuracy after DOM renders and images load
    requestAnimationFrame(() => {
      setTimeout(calculateMaxScroll, 0);
    });
    const timeoutId1 = setTimeout(calculateMaxScroll, 50);
    const timeoutId2 = setTimeout(calculateMaxScroll, 200);
    const timeoutId3 = setTimeout(calculateMaxScroll, 500);
    
    window.addEventListener('resize', calculateMaxScroll);
    
    // Also recalculate when images load
    const images = contentRef.current?.querySelectorAll('img');
    if (images) {
      images.forEach(img => {
        if (!img.complete) {
          img.addEventListener('load', calculateMaxScroll);
        }
      });
    }
    
    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
      window.removeEventListener('resize', calculateMaxScroll);
      if (images) {
        images.forEach(img => {
          img.removeEventListener('load', calculateMaxScroll);
        });
      }
    };
  }, [cityData.hotels.length, onMaxScrollChange, scrollValue]);

  // Use a small threshold (5px) to account for rounding differences
  const isAtMaxScroll = maxScroll > 0 && scrollValue >= (maxScroll - 5);

  return (
    <div className="relative p-6 sm:p-8 bg-gradient-to-b from-gray-50 via-white to-gray-50 rounded-2xl shadow-lg">
      {/* Scroll Buttons */}
      {scrollValue > 0 && (
        <button
          onClick={() => onScroll('left')}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white text-gray-800 p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:bg-teal-50 hover:border-teal-600 hover:scale-110"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {!isAtMaxScroll && (
        <button
          onClick={() => onScroll('right')}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white text-gray-800 p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:bg-teal-50 hover:border-teal-600 hover:scale-110"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Hotels Cards */}
      <div ref={containerRef} className="overflow-hidden rounded-xl mx-8">
        <div
          ref={contentRef}
          className="flex gap-6 transition-transform duration-500 ease-out"
          style={{ 
            transform: language === 'ar' 
              ? `translateX(${scrollValue}px)` 
              : `translateX(-${scrollValue}px)` 
          }}
        >
          {cityData.hotels.map((item) => (
            <div key={item.id} className="flex-shrink-0">
              <CardComponent {...item} hotelType={hotelType} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

