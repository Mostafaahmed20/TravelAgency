import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DestinationCardHome } from '../components/Cards/DestinationCardHome';
import { PackageCardHome } from '../components/Cards/PackageCardHome';
import { SectionTitle } from '../components/Common/SectionTitle';
import { destinationsData, hotelsEgyptData, hotelsSaudiData, packagesData } from '../data/destinationsData';
import { CityCard, HotelsContainer } from '../components/CityHotelsSection/CityHotelsSection';
import TabbedSearch from '../components/SearchBox/TabbedSearch';
import { useLanguage, translations } from '../context/LanguageContext';

const Home = () => {
  const [destinationScroll, setDestinationScroll] = useState(0);
  
  // City scroll states
  const [egyptCityScroll, setEgyptCityScroll] = useState(0);
  const [saudiCityScroll, setSaudiCityScroll] = useState(0);
  const [packageCityScroll, setPackageCityScroll] = useState(0);
  
  // Hotel scroll states for each city
  const [egyptHotelScroll, setEgyptHotelScroll] = useState(0);
  const [saudiHotelScroll, setSaudiHotelScroll] = useState(0);
  const [packageScroll, setPackageScroll] = useState(0);
  
  // Max scroll states
  const [egyptCityMaxScroll, setEgyptCityMaxScroll] = useState(0);
  const [saudiCityMaxScroll, setSaudiCityMaxScroll] = useState(0);
  const [packageCityMaxScroll, setPackageCityMaxScroll] = useState(0);
  const [egyptHotelMaxScroll, setEgyptHotelMaxScroll] = useState(0);
  const [saudiHotelMaxScroll, setSaudiHotelMaxScroll] = useState(0);
  const [packageMaxScroll, setPackageMaxScroll] = useState(0);
  
  // Expanded city states
  const [expandedEgyptCity, setExpandedEgyptCity] = useState(null);
  const [expandedSaudiCity, setExpandedSaudiCity] = useState(null);
  const [expandedPackageCity, setExpandedPackageCity] = useState(null);
  
  // Refs for city carousels
  const egyptCityContainerRef = useRef(null);
  const egyptCityContentRef = useRef(null);
  const saudiCityContainerRef = useRef(null);
  const saudiCityContentRef = useRef(null);
  const packageCityContainerRef = useRef(null);
  const packageCityContentRef = useRef(null);

  const { language } = useLanguage();

  // Get Egypt cities from destinationsData (same as old version)
  const egyptCities = React.useMemo(() => {
    return destinationsData
      .filter(dest => dest.country === "Egypt")
      .map(dest => ({
        id: dest.id,
        city: dest.city,
        city_ar: dest.city_ar,
        image: dest.image,
        hotels: hotelsEgyptData.filter(hotel => {
          // Match hotels to cities (handle variations like "Cairo - Zamalek" -> "Cairo")
          const hotelCity = hotel.city.split(' - ')[0].trim();
          return hotelCity === dest.city;
        })
      }))
      .filter(city => city.hotels.length > 0); // Only show cities with hotels
  }, []);

  // Get Saudi cities from destinationsData or create from hotels
  const saudiCities = React.useMemo(() => {
    const saudiDests = destinationsData.filter(dest => dest.country === "Saudi Arabia");
    if (saudiDests.length > 0) {
      return saudiDests.map(dest => ({
        id: dest.id,
        city: dest.city,
        city_ar: dest.city_ar,
        image: dest.image,
        hotels: hotelsSaudiData.filter(hotel => {
          const hotelCity = hotel.city.split(' - ')[0].trim();
          return hotelCity === dest.city;
        })
      })).filter(city => city.hotels.length > 0);
    } else {
      // Fallback: group by hotel cities
      const grouped = {};
      hotelsSaudiData.forEach(hotel => {
        const cityKey = hotel.city.split(' - ')[0].trim();
        if (!grouped[cityKey]) {
          grouped[cityKey] = {
            id: cityKey,
            city: cityKey,
            city_ar: hotel.city_ar.split(' - ')[0].trim(),
            image: hotel.image,
            hotels: []
          };
        }
        grouped[cityKey].hotels.push(hotel);
      });
      return Object.values(grouped);
    }
  }, []);

  // Group packages by country
  const packagesByCity = React.useMemo(() => {
    const grouped = {};
    packagesData.forEach(pkg => {
      const cityKey = pkg.country;
      if (!grouped[cityKey]) {
        grouped[cityKey] = {
          id: cityKey,
          city: pkg.country,
          city_ar: pkg.country_ar,
          image: pkg.image,
          hotels: [pkg] // Using 'hotels' key for consistency with HotelsContainer
        };
      } else {
        grouped[cityKey].hotels.push(pkg);
      }
    });
    return Object.values(grouped);
  }, []);

  // Calculate max scroll for city carousels
  useEffect(() => {
    const calculateMaxScroll = (containerRef, contentRef, setMaxScroll) => {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const contentWidth = contentRef.current.scrollWidth;
        const maxScrollValue = Math.max(0, contentWidth - containerWidth);
        setMaxScroll(maxScrollValue);
      }
    };

    const scheduleCalculation = () => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          calculateMaxScroll(egyptCityContainerRef, egyptCityContentRef, setEgyptCityMaxScroll);
          calculateMaxScroll(saudiCityContainerRef, saudiCityContentRef, setSaudiCityMaxScroll);
          calculateMaxScroll(packageCityContainerRef, packageCityContentRef, setPackageCityMaxScroll);
        }, 100);
      });
    };

    scheduleCalculation();
    window.addEventListener('resize', scheduleCalculation);
    return () => window.removeEventListener('resize', scheduleCalculation);
  }, [egyptHotelsByCity.length, saudiHotelsByCity.length, packagesByCity.length]);

  // Clamp scroll values to max scroll
  useEffect(() => {
    if (egyptCityScroll > egyptCityMaxScroll) {
      setEgyptCityScroll(egyptCityMaxScroll);
    }
    if (saudiCityScroll > saudiCityMaxScroll) {
      setSaudiCityScroll(saudiCityMaxScroll);
    }
    if (packageCityScroll > packageCityMaxScroll) {
      setPackageCityScroll(packageCityMaxScroll);
    }
  }, [egyptCityMaxScroll, saudiCityMaxScroll, packageCityMaxScroll]);

  const scroll = (section, direction, setter, maxScroll) => {
    const scrollAmount = 400;
    
    if (direction === 'left') {
      setter(prev => Math.max(0, prev - scrollAmount));
    } else {
      setter(prev => {
        const newValue = prev + scrollAmount;
        return Math.min(maxScroll, newValue);
      });
    }
  };

  const renderCityBasedSection = (
    title,
    subtitle,
    citiesData,
    expandedCity,
    setExpandedCity,
    cityScroll,
    setCityScroll,
    cityMaxScroll,
    cityContainerRef,
    cityContentRef,
    hotelScroll,
    setHotelScroll,
    hotelMaxScroll,
    setHotelMaxScroll,
    hotelType
  ) => {
    return (
      <section className="relative py-16 sm:py-20 px-4 sm:px-8 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          <SectionTitle title={title} subtitle={subtitle} />

          {/* Cities Horizontal Scroll */}
          <div className="relative mb-8">
            {/* City Scroll Buttons */}
            {cityScroll > 0 && (
              <button
                onClick={() => scroll('city', 'left', setCityScroll, cityMaxScroll)}
                className={`absolute -left-4 sm:left-0 top-1/2 -translate-y-1/2 z-20 bg-white text-gray-800 p-3 sm:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:bg-teal-50 hover:border-teal-600 hover:scale-110`}
                aria-label="Scroll cities left"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            )}

            {cityMaxScroll > 0 && cityScroll < (cityMaxScroll - 5) && (
              <button
                onClick={() => scroll('city', 'right', setCityScroll, cityMaxScroll)}
                className="absolute -right-4 sm:right-0 top-1/2 -translate-y-1/2 z-20 bg-white text-gray-800 p-3 sm:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:bg-teal-50 hover:border-teal-600 hover:scale-110"
                aria-label="Scroll cities right"
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            )}

            {/* Cities Row */}
            <div ref={cityContainerRef} className="overflow-hidden mx-8 sm:mx-12">
              <div
                ref={cityContentRef}
                className="flex gap-6 transition-transform duration-500 ease-out pb-4"
                style={{
                  transform: language === 'ar'
                    ? `translateX(${cityScroll}px)`
                    : `translateX(-${cityScroll}px)`
                }}
              >
                {citiesData.map((cityData) => (
                  <CityCard
                    key={cityData.id}
                    cityData={cityData}
                    isExpanded={expandedCity === cityData.id}
                    onToggle={() => {
                      setExpandedCity(expandedCity === cityData.id ? null : cityData.id);
                      setHotelScroll(0);
                      setHotelMaxScroll(0);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Expanded Hotels Section */}
          {expandedCity && (
            <div className="mt-6">
              {citiesData
                .filter(city => city.id === expandedCity)
                .map((cityData) => (
                  <HotelsContainer
                    key={cityData.id}
                    cityData={cityData}
                    hotelType={hotelType}
                    scrollValue={hotelScroll}
                    onMaxScrollChange={setHotelMaxScroll}
                    cardComponent={hotelType === 'package' ? PackageCardHome : undefined}
                    onScroll={(direction) => {
                      const scrollAmount = 360;
                      if (direction === 'left') {
                        setHotelScroll(prev => Math.max(0, prev - scrollAmount));
                      } else {
                        setHotelScroll(prev => {
                          const newValue = prev + scrollAmount;
                          return Math.min(hotelMaxScroll, newValue);
                        });
                      }
                    }}
                  />
                ))}
            </div>
          )}
        </div>
      </section>
    );
  };

  const renderScrollableSection = (title, subtitle, data, CardComponent, scrollValue, setter, sectionName, cardProps = {}, maxScroll = Infinity) => {
    return (
      <section className="py-12 sm:py-16 px-4 sm:px-8">
        <SectionTitle title={title} subtitle={subtitle} />

        <div className="relative">
          {/* Scroll Buttons */}
          {scrollValue > 0 && (
            <button
              onClick={() => scroll(sectionName, 'left', setter, maxScroll)}
              className={`absolute -left-4 sm:left-0 top-1/2 -translate-y-1/2 z-20 bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-gray-300 hover:bg-teal-50 hover:border-teal-600`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          {maxScroll > 0 && scrollValue < (maxScroll - 5) && (
            <button
              onClick={() => scroll(sectionName, 'right', setter, maxScroll)}
              className="absolute -right-4 sm:right-0 top-1/2 -translate-y-1/2 z-20 bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-gray-300 hover:bg-teal-50 hover:border-teal-600"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          {/* Cards Container */}
          <div className="overflow-hidden rounded-xl mx-8 sm:mx-12">
            <div
              className="flex gap-4 sm:gap-6 transition-transform duration-500 ease-out"
              style={{ 
                transform: language === 'ar' 
                  ? `translateX(${scrollValue}px)` 
                  : `translateX(-${scrollValue}px)` 
              }}
            >
              {data.map((item) => (
                <div key={item.id} className="flex-shrink-0">
                  <CardComponent {...item} {...cardProps} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section with Integrated Search - Almosafer Style */}
      <section className="relative overflow-hidden h-[550px] sm:h-[600px] md:h-[650px]">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="images/8f27feb9-9821-4b40-8796-6c6aa176ee46.jpeg"
            alt="Travel Agency hero banner"
            className="w-full h-full object-cover object-center"
          />
          {/* Clean gradient overlay - Almosafer style */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-8 pt-16">
          <div className="max-w-7xl mx-auto w-full">
            {/* Hero Text - Minimalist */}
            <div className="text-center text-white mb-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight">
                {translations[language].discoverYourNextAdventure}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light">
                {translations[language].exploreBreathtakingDestinations}
              </p>
            </div>

            {/* Tabbed Search Component */}
            <div className="max-w-5xl mx-auto">
              <TabbedSearch />
            </div>
          </div>
        </div>
      </section>

      {/* Hotels in Egypt - City-Based Structure */}
      <div className="bg-gray-50 py-1"></div>
      {renderCityBasedSection(
        translations[language].hotelsInEgypt,
        translations[language].hotelsInEgyptDesc,
        egyptCities,
        expandedEgyptCity,
        setExpandedEgyptCity,
        egyptCityScroll,
        setEgyptCityScroll,
        egyptCityMaxScroll,
        egyptCityContainerRef,
        egyptCityContentRef,
        egyptHotelScroll,
        setEgyptHotelScroll,
        egyptHotelMaxScroll,
        setEgyptHotelMaxScroll,
        'egypt'
      )}

      {/* Hotels in Saudi Arabia - City-Based Structure */}
      {renderCityBasedSection(
        translations[language].hotelsInSaudiArabia,
        translations[language].hotelsInSaudiDesc,
        saudiHotelsByCity,
        expandedSaudiCity,
        setExpandedSaudiCity,
        saudiCityScroll,
        setSaudiCityScroll,
        saudiCityMaxScroll,
        saudiCityContainerRef,
        saudiCityContentRef,
        saudiHotelScroll,
        setSaudiHotelScroll,
        saudiHotelMaxScroll,
        setSaudiHotelMaxScroll,
        'saudi'
      )}

      {/* Travel Packages - City-Based Structure */}
      {renderCityBasedSection(
        translations[language].travelPackages,
        translations[language].allInclusivePackages,
        packagesByCity,
        expandedPackageCity,
        setExpandedPackageCity,
        packageCityScroll,
        setPackageCityScroll,
        packageCityMaxScroll,
        packageCityContainerRef,
        packageCityContentRef,
        packageScroll,
        setPackageScroll,
        packageMaxScroll,
        setPackageMaxScroll,
        'package'
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-16 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{translations[language].readyToExplore}</h2>
          <p className="text-lg mb-8 text-teal-50">
            {translations[language].whatsappCtaDescription}
          </p>
          <a
            href="https://wa.me/201515196284?text=Hello%20I%20want%20to%20explore%20travel%20packages"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {translations[language].contactViaWhatsApp}
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
