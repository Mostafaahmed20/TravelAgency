import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('language') || 'en';
    } catch (e) {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('language', lang);
    } catch (e) {
      // ignore
    }
  }, [lang]);

  const toggleLanguage = () => {
    setLang(l => (l === 'en' ? 'ar' : 'en'));
  };

  const setLanguage = (l) => {
    if (l !== 'en' && l !== 'ar') return;
    setLang(l);
  };

  return (
    <LanguageContext.Provider value={{ language: lang, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

// Translation object
export const translations = {
  en: {
    // Header
    home: 'Home',
    flights: 'Flights',
    hotels: 'Hotels',
    offers: 'Offers',
    services: 'Services',
    about: 'About',
    contact: 'Contact',
    bookNow: 'Book Now',
    myBookings: 'My Bookings',
    help: 'Help',
    signIn: 'Sign In',
    
    // Search
    bookYourFlight: 'Book Your Flight',
    findTheFlightDeals: 'Find the best flight deals and book in seconds',
    from: 'From',
    to: 'To',
    departure: 'Departure',
    return: 'Return',
    passengers: 'Passengers',
    class: 'Class',
    searchFlights: 'Search Flights',
    
    bookYourHotel: 'Book Your Hotel',
    findTheHotelDeals: 'Search through thousands of hotels and book your stay',
    destination: 'Destination',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    rooms: 'Rooms',
    guests: 'Guests',
    searchHotels: 'Search Hotels',
    
    // Home
    exploreTheWorld: 'Explore the World',
    findAmazingDeals: 'Find amazing deals on flights, hotels, and travel packages',
    whyChooseMilesTravel: 'Why Choose Miles Travel',
    bestFlightDeals: 'Best Flight Deals',
    findTheLowestPrices: 'Find the lowest prices on flights worldwide',
    premiumHotels: 'Premium Hotels',
    stayInLuxury: 'Stay in luxury accommodations at great rates',
    uniqueExperiences: 'Unique Experiences',
    discoverUnforgettable: 'Discover unforgettable destinations',
    support24_7: '24/7 Support',
    getHelpWhenever: 'Get help whenever you need it',
    
    featuredDestinations: 'Featured Destinations',
    viewAll: 'View All',
    specialOffers: 'Special Offers',
    explorMore: 'Explore More',
    readyToBook: 'Ready to Book Your Next Adventure?',
    getExclusiveDeals: 'Get exclusive deals and special offers delivered to your inbox',
    enterEmail: 'Enter your email',
    subscribe: 'Subscribe',
    
    // Footer
    aboutMilesTravel: 'About Miles Travel',
    discoverTheWorld: 'Discover the world with Miles Travel. We provide the best travel deals, flight bookings, and unforgettable experiences.',
    quickLinks: 'Quick Links',
    flightBooking: 'Flight Booking',
    hotelReservations: 'Hotel Reservations',
    tourPackages: 'Tour Packages',
    visaAssistance: 'Visa Assistance',
    carRentals: 'Car Rentals',
    contactUs: 'Contact Us',
    phone: 'Phone',
    email: 'Email',
    address: 'Address',
    privacyPolicy: 'Privacy Policy',
    allRightsReserved: 'All Rights Reserved',
    termsConditions: 'Terms & Conditions',
    
    // Services
    servicesTitle: 'Our Services',
    servicesSubtitle: 'Discover everything we offer to make your travel seamless',
    flightBookingService: 'Flight Booking',
    bookFlightsGlobally: 'Book flights to any destination with competitive prices',
    hotelBookingService: 'Hotel Booking',
    bookHotelsWorldwide: 'Reserve hotels worldwide with exclusive deals',
    activitiesExperiences: 'Activities & Experiences',
    unforgettableActivities: 'Book unforgettable activities and tours',
    carRentalService: 'Car Rental',
    rentCarsEverywhere: 'Rent cars in cities around the world',
    travelInsurance: 'Travel Insurance',
    protectYourJourney: 'Protect your trip with comprehensive insurance',
    visaSupport: 'Visa Support',
    visaApplicationHelp: 'Get expert help with visa applications',
    cruisePackages: 'Cruise Packages',
    luxuryCruiseVoyages: 'Experience luxury on the world\'s best cruises',
    groupTours: 'Group Tours',
    travelWithYourGroup: 'Organize and book tours for your entire group',
    customPackages: 'Custom Packages',
    tailorMadeTravel: 'Create your own perfect travel package',
    businessTravel: 'Business Travel',
    corporateTravelSolutions: 'Complete solutions for corporate travel needs',
    airportTransfer: 'Airport Transfer',
    reliableTransportation: 'Reliable airport pickup and drop-off services',
    travelConcierge: 'Travel Concierge',
    personalizedTravelPlanning: 'Personalized travel planning and assistance',
    
    // Prices
    night: '/night',
    person: '/person',
    
    // Common
    economy: 'Economy',
    business: 'Business',
    first: 'First',
  },
  ar: {
    // Header
    home: 'الرئيسية',
    flights: 'الرحلات',
    hotels: 'الفنادق',
    offers: 'العروض',
    services: 'الخدمات',
    about: 'عنا',
    contact: 'التواصل',
    bookNow: 'احجز الآن',
    myBookings: 'حجوزاتي',
    help: 'المساعدة',
    signIn: 'تسجيل الدخول',
    
    // Search
    bookYourFlight: 'احجز رحلتك',
    findTheFlightDeals: 'ابحث عن أفضل أسعار الرحلات واحجز في ثوان',
    from: 'من',
    to: 'إلى',
    departure: 'الذهاب',
    return: 'العودة',
    passengers: 'المسافرون',
    class: 'الدرجة',
    searchFlights: 'البحث عن الرحلات',
    
    bookYourHotel: 'احجز فندقك',
    findTheHotelDeals: 'ابحث عن آلاف الفنادق واحجز إقامتك',
    destination: 'الوجهة',
    checkIn: 'تاريخ الدخول',
    checkOut: 'تاريخ الخروج',
    rooms: 'الغرف',
    guests: 'النزلاء',
    searchHotels: 'البحث عن الفنادق',
    
    // Home
    exploreTheWorld: 'اكتشف العالم',
    findAmazingDeals: 'ابحث عن عروض مذهلة على الرحلات والفنادق وحزم السفر',
    whyChooseMilesTravel: 'لماذا تختار Miles Travel',
    bestFlightDeals: 'أفضل أسعار الرحلات',
    findTheLowestPrices: 'ابحث عن أقل الأسعار على الرحلات حول العالم',
    premiumHotels: 'فنادق فاخرة',
    stayInLuxury: 'ابق في فنادق فاخرة بأسعار رائعة',
    uniqueExperiences: 'تجارب فريدة',
    discoverUnforgettable: 'اكتشف وجهات لا تُنسى',
    support24_7: 'دعم 24/7',
    getHelpWhenever: 'احصل على المساعدة في أي وقت',
    
    featuredDestinations: 'الوجهات المميزة',
    viewAll: 'عرض الكل',
    specialOffers: 'عروض خاصة',
    explorMore: 'استكشف المزيد',
    readyToBook: 'هل أنت مستعد لحجز رحلتك القادمة؟',
    getExclusiveDeals: 'احصل على عروض حصرية وتخفيضات خاصة في بريدك',
    enterEmail: 'أدخل بريدك الإلكتروني',
    subscribe: 'اشترك',
    
    // Footer
    aboutMilesTravel: 'عن Miles Travel',
    discoverTheWorld: 'اكتشف العالم مع Miles Travel. نوفر أفضل عروض السفر وحجوزات الرحلات والتجارب التي لا تنسى.',
    quickLinks: 'روابط سريعة',
    flightBooking: 'حجز الرحلات',
    hotelReservations: 'حجز الفنادق',
    tourPackages: 'حزم السفر',
    visaAssistance: 'مساعدة التأشيرات',
    carRentals: 'تأجير السيارات',
    contactUs: 'اتصل بنا',
    phone: 'الهاتف',
    email: 'البريد الإلكتروني',
    address: 'العنوان',
    privacyPolicy: 'سياسة الخصوصية',
    allRightsReserved: 'جميع الحقوق محفوظة',
    termsConditions: 'الشروط والأحكام',
    
    // Services
    servicesTitle: 'خدماتنا',
    servicesSubtitle: 'اكتشف كل ما نقدمه لجعل سفرك سلس',
    flightBookingService: 'حجز الرحلات',
    bookFlightsGlobally: 'احجز رحلات إلى أي وجهة بأسعار تنافسية',
    hotelBookingService: 'حجز الفنادق',
    bookHotelsWorldwide: 'احجز الفنادق في جميع أنحاء العالم بعروض حصرية',
    activitiesExperiences: 'الأنشطة والتجارب',
    unforgettableActivities: 'احجز أنشطة وجولات لا تُنسى',
    carRentalService: 'تأجير السيارات',
    rentCarsEverywhere: 'استأجر السيارات في المدن حول العالم',
    travelInsurance: 'التأمين على السفر',
    protectYourJourney: 'احم رحلتك بتأمين شامل',
    visaSupport: 'مساعدة التأشيرات',
    visaApplicationHelp: 'احصل على مساعدة خبراء في طلبات التأشيرة',
    cruisePackages: 'حزم الرحلات البحرية',
    luxuryCruiseVoyages: 'استمتع بالفخامة على أفضل الرحلات البحرية',
    groupTours: 'الجولات الجماعية',
    travelWithYourGroup: 'نظم واحجز جولات لكل مجموعتك',
    customPackages: 'حزم مخصصة',
    tailorMadeTravel: 'أنشئ حزمة سفر مثالية خاصة بك',
    businessTravel: 'السفر للعمل',
    corporateTravelSolutions: 'حلول كاملة لاحتياجات السفر للشركات',
    airportTransfer: 'نقل المطار',
    reliableTransportation: 'خدمات موثوقة لاستقبال والتوصيل من المطار',
    travelConcierge: 'خدمة كونسيرج السفر',
    personalizedTravelPlanning: 'تخطيط سفر مخصص ومساعدة',
    
    // Prices
    night: '/الليلة',
    person: '/شخص',
    
    // Common
    economy: 'اقتصادي',
    business: 'رجال أعمال',
    first: 'درجة أولى',
  }
};
