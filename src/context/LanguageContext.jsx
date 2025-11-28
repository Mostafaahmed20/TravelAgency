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
    discoverYourNextAdventure: 'Discover Your Next Adventure',
    exploreBreathtakingDestinations: 'Explore breathtaking destinations and book your dream trip today',
    startExploring: 'Start Exploring',
    whatsappCtaDescription: 'Contact us via WhatsApp for personalized travel recommendations',
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
    featuredHotels: 'Featured Hotels',
    viewAll: 'View All',
    specialOffers: 'Special Offers',
    explorMore: 'Explore More',
    exploreMostPopularDestinations: 'Explore the most popular and breathtaking destinations',
    hotelsInEgypt: 'Hotels in Egypt',
    hotelsInEgyptDesc: "Experience luxury and comfort in Egypt's finest hotels",
    hotelsInSaudiArabia: 'Hotels in Saudi Arabia',
    hotelsInSaudiDesc: "Discover premium hospitality in Saudi Arabia's major cities",
    travelPackages: 'Travel Packages',
    allInclusivePackages: 'All-inclusive packages for unforgettable journeys',
    readyToBook: 'Ready to Book Your Next Adventure?',
    readyToExplore: 'Ready to Explore?',
    getExclusiveDeals: 'Get exclusive deals and special offers delivered to your inbox',
    enterEmail: 'Enter your email',
    subscribe: 'Subscribe',
    contactViaWhatsApp: 'Contact via WhatsApp',
    
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

    // Flights Page
    popularFlightRoutes: 'Popular Flight Routes',
    findYourFlight: 'Find Your Flight',

    // Hotels Page
    findYourHotel: 'Find Your Hotel',
    featuredHotelsHeading: 'Featured Hotels',

    // Offers Page
    exclusiveTravelOffers: 'Exclusive Travel Offers',
    allAvailablePackages: 'All Available Packages',
    hotDeals: 'Hot Deals',
    hotDealsDesc: 'Limited time offers on popular destinations',
    premiumPackages: 'Premium Packages',
    premiumPackagesDesc: 'Luxury experiences for discerning travelers',
    specialPromotions: 'Special Promotions',
    specialPromotionsDesc: 'Exclusive deals for our valued members',

    // About Page
    ourStory: 'Our Story',
    ourValues: 'Our Values',
    meetOurTeam: 'Meet Our Team',
    aboutStoryP1: 'TravelHub was founded with a simple mission: to make travel accessible, affordable, and unforgettable for everyone. We believe that everyone deserves to explore the world and create lasting memories.',
    aboutStoryP2: "With our network of trusted partners and industry expertise, we've helped thousands of travelers book their perfect trips. From luxury vacations to budget-friendly adventures, we've got something for everyone.",
    aboutStoryP3: "Our commitment to excellence and customer satisfaction drives us every day. We're constantly innovating to provide the best travel experience possible.",
    customerFirst: 'Customer First',
    customerFirstDesc: 'We prioritize your satisfaction in every interaction',
    qualityService: 'Quality Service',
    qualityServiceDesc: 'Premium experiences with attention to detail',
    expertTeam: 'Expert Team',
    expertTeamDesc: 'Professional travel consultants with years of experience',
    globalReach: 'Global Reach',
    globalReachDesc: 'Partnerships with destinations worldwide',
    happyTravelers: 'Happy Travelers',
    destinations: 'Destinations',
    partners: 'Partners',
    experience: 'Experience',

    // Contact Page
    getInTouch: 'Get in Touch',
    contactInformation: 'Reach us via phone, email, or our office',
    frequentlyAskedQuestions: 'Frequently Asked Questions',
    businessHoursQ: 'Q: What are your business hours?',
    businessHoursA: "A: We're available 24/7 to assist you with your travel needs.",
    refundsQ: 'Q: Do you offer refunds?',
    refundsA: 'A: Yes, refunds are available subject to our cancellation policy.',
    modifyBookingQ: 'Q: How do I modify my booking?',
    modifyBookingA: 'A: Contact our support team for assistance with modifications.',
    findUsOnMap: 'Find Us On The Map',
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    phoneNumber: 'Phone Number',
    subject: 'Subject',
    message: 'Message',
    messageSentTitle: 'Message Sent!',
    messageSentBody: "Thank you for reaching out. We'll get back to you soon.",

    // Details Pages Common
    destinationNotFound: 'Destination Not Found',
    hotelNotFound: 'Hotel Not Found',
    packageNotFound: 'Package Not Found',
    backToHome: 'Back to Home',
    backToDestinations: 'Back to Destinations',
    backToHotels: 'Back to Hotels',
    bookNowWhatsApp: 'Book Now via WhatsApp',
    startingFrom: 'Starting from',
    forDuration: 'for',
    duration: 'Duration',
    ratingLabel: 'Rating',
    location: 'Location',
    pricePerNight: 'Price per Night',
    stars: 'Stars',
    aboutThisHotel: 'About This Hotel',
    hotelAmenities: 'Hotel Amenities',
    quickInfo: 'Quick Info',
    reviews: 'Reviews',
    hotelGallery: 'Hotel Gallery',
    aboutDestination: 'About this Destination',
    tripHighlights: 'Trip Highlights',
    similarDestinations: 'Similar Destinations',
    roomInformation: 'Room Information',
    roomTypes: 'Room Types',
    occupancy: 'Occupancy',
    amenitiesLabel: 'Amenities',
    checkInLabel: 'Check-in',
    backToPackages: 'Back to Packages',
    clickToExplore: 'Click to explore',
    clickForDetails: 'Click for details',
    clickToViewDetails: 'Click to view details',
    routePrefix: 'Route',
    popularFlightRouteCardDesc: 'Popular flight route with great deals and premium service',
    travelPackagePrefix: 'Travel Package',
    daysWord: 'Days',
    nightsWord: 'Nights',
    offerIncludesGeneric: 'Flights, hotels, meals, and guided tours included',
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
    discoverYourNextAdventure: 'اكتشف مغامرتك القادمة',
    exploreBreathtakingDestinations: 'استكشف الوجهات الخلابة واحجز رحلة أحلامك اليوم',
    startExploring: 'ابدأ الاستكشاف',
    whatsappCtaDescription: 'اتصل بنا عبر WhatsApp للحصول على توصيات سفر مخصصة',
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
    featuredHotels: 'فنادق مميزة',
    viewAll: 'عرض الكل',
    specialOffers: 'عروض خاصة',
    explorMore: 'استكشف المزيد',
    exploreMostPopularDestinations: 'استكشف الوجهات الأشهر والأكثر جمالاً',
    hotelsInEgypt: 'الفنادق في مصر',
    hotelsInEgyptDesc: 'استمتع بالفخامة والراحة في أفضل فنادق مصر',
    hotelsInSaudiArabia: 'الفنادق في المملكة العربية السعودية',
    hotelsInSaudiDesc: 'اكتشف الضيافة الفاخرة في مدن المملكة الرئيسية',
    travelPackages: 'حزم السفر',
    allInclusivePackages: 'حزم شاملة لرحلات لا تُنسى',
    readyToBook: 'هل أنت مستعد لحجز رحلتك القادمة؟',
    readyToExplore: 'هل أنت مستعد للاستكشاف؟',
    getExclusiveDeals: 'احصل على عروض حصرية وتخفيضات خاصة في بريدك',
    enterEmail: 'أدخل بريدك الإلكتروني',
    subscribe: 'اشترك',
    contactViaWhatsApp: 'اتصل عبر WhatsApp',
    
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

    // Flights Page
    popularFlightRoutes: 'أفضل مسارات الرحلات',
    findYourFlight: 'ابحث عن رحلتك',

    // Hotels Page
    findYourHotel: 'ابحث عن فندقك',
    featuredHotelsHeading: 'فنادق مميزة',

    // Offers Page
    exclusiveTravelOffers: 'عروض سفر حصرية',
    allAvailablePackages: 'كل الحزم المتاحة',
    hotDeals: 'عروض ساخنة',
    hotDealsDesc: 'عروض لفترة محدودة على وجهات شهيرة',
    premiumPackages: 'حزم فاخرة',
    premiumPackagesDesc: 'تجارب فاخرة للمسافرين المميزين',
    specialPromotions: 'عروض خاصة',
    specialPromotionsDesc: 'عروض حصرية لأعضائنا المميزين',

    // About Page
    ourStory: 'قصتنا',
    ourValues: 'قيمنا',
    meetOurTeam: 'تعرف على فريقنا',
    aboutStoryP1: 'تأسست TravelHub برؤية بسيطة: جعل السفر متاحًا وميسورًا ولا يُنسى للجميع. نؤمن أن لكل شخص الحق في استكشاف العالم وصنع ذكريات تدوم.',
    aboutStoryP2: 'بفضل شبكة شركائنا الموثوقين وخبرتنا في المجال، ساعدنا آلاف المسافرين على حجز رحلاتهم المثالية. من الإجازات الفاخرة إلى المغامرات الاقتصادية، لدينا ما يناسب الجميع.',
    aboutStoryP3: 'التزامنا بالتميّز ورضا العملاء يدفعنا كل يوم. نبتكر باستمرار لنقدم أفضل تجربة سفر ممكنة.',
    customerFirst: 'العميل أولاً',
    customerFirstDesc: 'نضع رضاك في المقام الأول في كل تواصل',
    qualityService: 'خدمة عالية الجودة',
    qualityServiceDesc: 'تجارب فاخرة مع عناية بالتفاصيل',
    expertTeam: 'فريق خبير',
    expertTeamDesc: 'مستشارو سفر محترفون وذوو خبرة',
    globalReach: 'انتشار عالمي',
    globalReachDesc: 'شراكات مع وجهات حول العالم',
    happyTravelers: 'مسافرون سعداء',
    destinations: 'وجهات',
    partners: 'شركاء',
    experience: 'خبرة',

    // Contact Page
    getInTouch: 'تواصل معنا',
    contactInformation: 'تواصل عبر الهاتف أو البريد أو مكتبنا',
    frequentlyAskedQuestions: 'الأسئلة الشائعة',
    businessHoursQ: 'س: ما هي ساعات العمل؟',
    businessHoursA: 'ج: نحن متاحون على مدار الساعة لمساعدتك في احتياجات السفر.',
    refundsQ: 'س: هل تقدمون استرداداً؟',
    refundsA: 'ج: نعم، يتوفر الاسترداد وفق سياسة الإلغاء لدينا.',
    modifyBookingQ: 'س: كيف أعدّل حجزي؟',
    modifyBookingA: 'ج: تواصل مع فريق الدعم لمساعدتك في التعديلات.',
    findUsOnMap: 'اعثر علينا على الخريطة',
    fullName: 'الاسم الكامل',
    emailAddress: 'البريد الإلكتروني',
    phoneNumber: 'رقم الهاتف',
    subject: 'الموضوع',
    message: 'الرسالة',
    messageSentTitle: 'تم إرسال الرسالة!',
    messageSentBody: 'شكراً لتواصلك معنا. سنرد عليك قريباً.',

    // Details Pages Common
    destinationNotFound: 'الوجهة غير موجودة',
    hotelNotFound: 'الفندق غير موجود',
    packageNotFound: 'الحزمة غير موجودة',
    backToHome: 'العودة للرئيسية',
    backToDestinations: 'العودة للوجهات',
    backToHotels: 'العودة للفنادق',
    bookNowWhatsApp: 'احجز الآن عبر WhatsApp',
    startingFrom: 'ابدأ من',
    forDuration: 'لمدة',
    duration: 'المدة',
    ratingLabel: 'التقييم',
    location: 'الموقع',
    pricePerNight: 'السعر في الليلة',
    stars: 'النجوم',
    aboutThisHotel: 'عن هذا الفندق',
    hotelAmenities: 'مرافق الفندق',
    quickInfo: 'معلومات سريعة',
    reviews: 'التقييمات',
    hotelGallery: 'معرض الفندق',
    aboutDestination: 'عن هذه الوجهة',
    tripHighlights: 'أهم معالم الرحلة',
    similarDestinations: 'وجهات مشابهة',
    roomInformation: 'معلومات الغرفة',
    roomTypes: 'أنواع الغرف',
    occupancy: 'السعة',
    amenitiesLabel: 'المرافق',
    checkInLabel: 'تسجيل الدخول',
    backToPackages: 'العودة للحزم',
    clickToExplore: 'انقر للاستكشاف',
    clickForDetails: 'انقر للتفاصيل',
    clickToViewDetails: 'انقر لعرض التفاصيل',
    routePrefix: 'المسار',
    popularFlightRouteCardDesc: 'مسار طيران شائع بعروض رائعة وخدمة مميزة',
    travelPackagePrefix: 'حزمة سفر',
    daysWord: 'أيام',
    nightsWord: 'ليالٍ',
    offerIncludesGeneric: 'تشمل الرحلات والفنادق والوجبات والجولات المصحوبة بمرشدين',
  }
};
