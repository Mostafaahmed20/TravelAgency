// Travel Agency Application
class TravelAgency {
  constructor() {
    this.currentPage = 'home';
    this.searchType = 'flights';
    this.showServices = false;
    this.language = 'ar';
    this.currency = 'SAR';
    this.formData = {
      from: '', to: '', departure: '', return: '', passengers: '1',
      checkIn: '', checkOut: '', rooms: '1'
    };
    this.whatsappNumber = '201515196284';
    this.init();
  }

  translations = {
    ar: {
      planTrip: 'خطط عطلتك الجاية',
      subtitle: 'اختر من بين أكثر من 1.5 مليون فندق و 450 شركة طيران',
      flights: 'طيران', hotels: 'فنادق', packages: 'رحلات منظمة', activities: 'أنشطة',
      from: 'من', to: 'إلى', departure: 'تاريخ المغادرة', return: 'تاريخ العودة',
      checkIn: 'تاريخ الدخول', checkOut: 'تاريخ المغادرة', passengers: 'مسافرين', rooms: 'غرف',
      search: 'بحث', moreServices: 'المزيد من الخدمات', login: 'تسجيل الدخول', bookNow: 'احجز الآن', 
      backHome: 'العودة للرئيسية', specialOffers: 'عروض مميزة متنا لك', popularDestinations: 'أشهر الوجهات السياحية',
      activitiesTitle: 'الأنشطة والتجارب السياحية', packagesTitle: 'الرحلات المنظمة', all: 'الكل',
      domestic: 'رحلات داخلية', international: 'رحلات دولية', unique: 'تجارب فريدة', destination: 'الوجهة'
    },
    en: {
      planTrip: 'Plan Your Next Trip', subtitle: 'Choose from over 1.5 million hotels and 450 airlines',
      flights: 'Flights', hotels: 'Hotels', packages: 'Packages', activities: 'Activities',
      from: 'From', to: 'To', departure: 'Departure', return: 'Return',
      checkIn: 'Check-in', checkOut: 'Check-out', passengers: 'Passengers', rooms: 'Rooms',
      search: 'Search', moreServices: 'More Services', login: 'Login', bookNow: 'Book Now', 
      backHome: 'Back to Home', specialOffers: 'Special Offers for You', popularDestinations: 'Popular Destinations',
      activitiesTitle: 'Activities & Experiences', packagesTitle: 'Travel Packages', all: 'All',
      domestic: 'Domestic', international: 'International', unique: 'Unique Experiences', destination: 'Destination'
    }
  };

  services = [
    { icon: '✈️', name: { ar: 'حجوزات الطيران', en: 'Flight Booking' } },
    { icon: '🏨', name: { ar: 'حجز الفنادق', en: 'Hotel Booking' } },
    { icon: '🎭', name: { ar: 'أنشطة سياحية', en: 'Activities' } },
    { icon: '🚗', name: { ar: 'تأجير السيارات', en: 'Car Rental' } },
    { icon: '🏖️', name: { ar: 'رحلات منظمة', en: 'Packages' } },
    { icon: '🛳️', name: { ar: 'رحلات بحرية', en: 'Cruises' } },
    { icon: '🎫', name: { ar: 'عمرة وحج', en: 'Umrah & Hajj' } },
    { icon: '🚌', name: { ar: 'حافلات سياحية', en: 'Tour Buses' } },
    { icon: '🏛️', name: { ar: 'تذاكر المتاحف', en: 'Museum Tickets' } },
    { icon: '🎪', name: { ar: 'تذاكر الفعاليات', en: 'Event Tickets' } },
    { icon: '📋', name: { ar: 'تأشيرات السفر', en: 'Visas' } },
    { icon: '🛡️', name: { ar: 'التأمين', en: 'Insurance' } }
  ];

  activityCategories = [
    { id: 'adventure', name: { ar: 'مغامرات', en: 'Adventure' }, icon: '🏔️' },
    { id: 'water', name: { ar: 'رياضات مائية', en: 'Water Sports' }, icon: '🌊' },
    { id: 'cultural', name: { ar: 'ثقافية وتراثية', en: 'Cultural' }, icon: '🏛️' },
    { id: 'family', name: { ar: 'عائلية', en: 'Family' }, icon: '👨‍👩‍👧‍👦' },
    { id: 'nature', name: { ar: 'طبيعة', en: 'Nature' }, icon: '��' },
    { id: 'food', name: { ar: 'طعام وتذوق', en: 'Food & Dining' }, icon: '🍽️' }
  ];

  tourCategories = [
    { id: 'domestic', name: { ar: 'جولات محلية', en: 'Domestic Tours' }, icon: '🏙️' },
    { id: 'international', name: { ar: 'جولات دولية', en: 'International Tours' }, icon: '✈️' },
    { id: 'cruises', name: { ar: 'رحلات بحرية', en: 'Cruises' }, icon: '🛳️' },
    { id: 'umrah', name: { ar: 'عمرة وحج', en: 'Umrah & Hajj' }, icon: '🕌' }
  ];

  activities = [
    { id: 1, title: { ar: 'جولة في برج خليفة', en: 'Burj Khalifa Tour' }, location: { ar: 'دبي', en: 'Dubai' }, price: '245', rating: 4.8, reviews: 2847, image: '🏙️', category: 'cultural' },
    { id: 2, title: { ar: 'رحلة سفاري صحراوية', en: 'Desert Safari' }, location: { ar: 'أبوظبي', en: 'Abu Dhabi' }, price: '189', rating: 4.9, reviews: 1523, image: '🏜️', category: 'adventure' },
    { id: 3, title: { ar: 'دخول أكواريوم دبي', en: 'Dubai Aquarium' }, location: { ar: 'دبي', en: 'Dubai' }, price: '165', rating: 4.7, reviews: 3201, image: '🐠', category: 'family' },
    { id: 4, title: { ar: 'جولة في متحف اللوفر', en: 'Louvre Museum Tour' }, location: { ar: 'أبوظبي', en: 'Abu Dhabi' }, price: '225', rating: 4.9, reviews: 987, image: '🖼️', category: 'cultural' },
    { id: 5, title: { ar: 'رحلة بالمنطاد', en: 'Hot Air Balloon' }, location: { ar: 'دبي', en: 'Dubai' }, price: '890', rating: 5.0, reviews: 456, image: '🎈', category: 'adventure' },
    { id: 6, title: { ar: 'ياس ووتروورلد', en: 'Yas Waterworld' }, location: { ar: 'أبوظبي', en: 'Abu Dhabi' }, price: '280', rating: 4.8, reviews: 2156, image: '🌊', category: 'water' },
    { id: 7, title: { ar: 'جولة تذوق طعام', en: 'Food Tasting Tour' }, location: { ar: 'دبي', en: 'Dubai' }, price: '320', rating: 4.6, reviews: 1234, image: '🍽️', category: 'food' },
    { id: 8, title: { ar: 'رحلة في الطبيعة', en: 'Nature Hike' }, location: { ar: 'أبوظبي', en: 'Abu Dhabi' }, price: '150', rating: 4.7, reviews: 890, image: '🌳', category: 'nature' }
  ];

  packages = [
    { id: 1, type: 'domestic', title: { ar: 'جدة - البحر الأحمر', en: 'Jeddah - Red Sea' }, duration: { ar: '3 أيام / 2 ليالي', en: '3 Days / 2 Nights' }, price: '899', includes: { ar: 'فندق + إفطار + جولات', en: 'Hotel + Breakfast + Tours' }, rating: 4.6, image: '🏖️', category: 'domestic' },
    { id: 2, type: 'international', title: { ar: 'باريس - مدينة النور', en: 'Paris - City of Lights' }, duration: { ar: '5 أيام / 4 ليالي', en: '5 Days / 4 Nights' }, price: '3,499', includes: { ar: 'طيران + فندق + جولات', en: 'Flight + Hotel + Tours' }, rating: 4.9, image: '🗼', category: 'international' },
    { id: 3, type: 'domestic', title: { ar: 'الرياض - التراث والحداثة', en: 'Riyadh - Heritage & Modernity' }, duration: { ar: '2 أيام / 1 ليلة', en: '2 Days / 1 Night' }, price: '649', includes: { ar: 'فندق + إفطار', en: 'Hotel + Breakfast' }, rating: 4.5, image: '🏛️', category: 'domestic' },
    { id: 4, type: 'international', title: { ar: 'دبي - مدينة المستقبل', en: 'Dubai - City of Future' }, duration: { ar: '4 أيام / 3 ليالي', en: '4 Days / 3 Nights' }, price: '1,899', includes: { ar: 'طيران + فندق فخم + أنشطة', en: 'Flight + Luxury Hotel + Activities' }, rating: 4.8, image: '🌆', category: 'international' },
    { id: 5, type: 'cruises', title: { ar: 'رحلة بحرية في البحر الأحمر', en: 'Red Sea Cruise' }, duration: { ar: '7 أيام / 6 ليالي', en: '7 Days / 6 Nights' }, price: '5,999', includes: { ar: 'رحلة بحرية فاخرة شاملة', en: 'All-Inclusive Luxury Cruise' }, rating: 5.0, image: '🛳️', category: 'cruises' },
    { id: 6, type: 'umrah', title: { ar: 'عمرة رمضان', en: 'Ramadan Umrah' }, duration: { ar: '10 أيام / 9 ليالي', en: '10 Days / 9 Nights' }, price: '4,499', includes: { ar: 'طيران + فندق قريب من الحرم + نقل', en: 'Flight + Hotel near Haram + Transport' }, rating: 4.9, image: '🕌', category: 'umrah' }
  ];

  init() {
    this.render();
    this.attachEventListeners();
  }

  get t() {
    return this.translations[this.language];
  }

  get isRTL() {
    return this.language === 'ar';
  }

  sendToWhatsApp(message) {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`, '_blank');
  }

  handleSearch() {
    // Collect all input values before validation
    const inputs = document.querySelectorAll('#flightsForm input, #flightsForm select, #hotelsForm input, #hotelsForm select');
    inputs.forEach(input => {
      if (input.name) {
        this.formData[input.name] = input.value;
      }
    });

    if (this.searchType === 'flights') {
      if (!this.formData.from || !this.formData.to || !this.formData.departure) {
        alert(this.isRTL ? 'يرجى ملء جميع التفاصيل' : 'Please fill all details');
        return;
      }
      const message = `Flight Search Request:\nFrom: ${this.formData.from}\nTo: ${this.formData.to}\nDeparture: ${this.formData.departure}${this.formData.return ? `\nReturn: ${this.formData.return}` : ''}\nPassengers: ${this.formData.passengers}`;
      this.sendToWhatsApp(message);
    } else if (this.searchType === 'hotels') {
      if (!this.formData.to || !this.formData.checkIn || !this.formData.checkOut) {
        alert(this.isRTL ? 'يرجى ملء جميع التفاصيل' : 'Please fill all details');
        return;
      }
      const message = `Hotel Search Request:\nDestination: ${this.formData.to}\nCheck-in: ${this.formData.checkIn}\nCheck-out: ${this.formData.checkOut}\nRooms: ${this.formData.rooms}`;
      this.sendToWhatsApp(message);
    }
  }

  render() {
    document.documentElement.lang = this.language;
    document.documentElement.dir = this.isRTL ? 'rtl' : 'ltr';
    
    let html = this.renderHeader();
    html += this.renderNav();
    
    if (this.currentPage === 'home') html += this.renderHome();
    else if (this.currentPage === 'activities') html += this.renderActivities();
    else if (this.currentPage === 'packages') html += this.renderPackages();
    else if (this.currentPage === 'tours') html += this.renderTours();
    
    html += this.renderFooter();
    
    document.body.innerHTML = html;
  }

  renderHeader() {
    return `
      <div class="bg-teal-900 text-white py-2 px-6">
        <div class="max-w-7xl mx-auto flex justify-between items-center text-xs">
          <div class="flex gap-4 items-center ${this.isRTL ? '' : 'order-2'}">
            <button class="border border-white px-4 py-1 rounded-full hover:bg-teal-800">${this.t.login}</button>
            <a href="#" class="hover:text-teal-200 flex items-center gap-1">
              <span>📞</span> +201515196284
            </a>
            <button id="langToggle" class="hover:text-teal-200 flex items-center gap-1">
              <span>🌐</span>
              ${this.language === 'ar' ? 'English' : 'عربي'}
            </button>
            <select id="currencyToggle" class="bg-teal-800 text-white px-2 py-1 rounded hover:bg-teal-700 cursor-pointer">
              <option value="SAR" ${this.currency === 'SAR' ? 'selected' : ''}>SAR</option>
              <option value="AED" ${this.currency === 'AED' ? 'selected' : ''}>AED</option>
              <option value="USD" ${this.currency === 'USD' ? 'selected' : ''}>USD</option>
              <option value="EGP" ${this.currency === 'EGP' ? 'selected' : ''}>EGP</option>
            </select>
          </div>
          <button id="logoBtn" class="flex items-center gap-2 hover:opacity-90 ${this.isRTL ? '' : 'order-1'} cursor-pointer">
            <img src="assets/icons/logo.png" alt="MILES TRAVEL" class="h-10 w-10 rounded-md bg-white p-1 object-contain">
            <span class="text-sm font-bold tracking-wider text-white ${this.isRTL ? 'mr-2' : 'ml-2'}">MILES TRAVEL</span>
          </button>
        </div>
      </div>
    `;
  }

  renderNav() {
    return `
      <nav class="bg-teal-900 text-white py-3 px-6 border-t border-teal-800">
        <div class="max-w-7xl mx-auto flex ${this.isRTL ? 'justify-end' : 'justify-start'} gap-8 items-center">
          <button class="nav-btn hover:text-teal-200" data-page="home">${this.t.flights}</button>
          <button class="nav-btn hover:text-teal-200" data-page="home">${this.t.hotels}</button>
          <button class="nav-btn hover:text-teal-200" data-page="activities">${this.t.activities}</button>
          <button class="nav-btn hover:text-teal-200" data-page="packages">${this.t.packages}</button>
          <div class="relative">
            <button id="servicesBtn" class="hover:text-teal-200 flex items-center gap-1">
              ${this.t.moreServices} <span>▼</span>
            </button>
            <div id="servicesMenu" class="hidden absolute ${this.isRTL ? 'left-0' : 'right-0'} top-full mt-2 bg-white text-gray-800 rounded-lg shadow-2xl p-6 w-screen max-w-3xl z-50">
              <div class="grid grid-cols-6 gap-4">
                ${this.services.map((s, i) => `
                  <button class="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition">
                    <div class="text-2xl">${s.icon}</div>
                    <span class="text-xs text-center">${s.name[this.language]}</span>
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </nav>
    `;
  }

  renderHome() {
    return `
      <section class="bg-gradient-to-b from-teal-600 to-teal-700 text-white py-20 px-6">
        <div class="max-w-7xl mx-auto">
          <div class="${this.isRTL ? 'text-right' : 'text-left'} mb-8">
            <h1 class="text-5xl font-bold mb-3">${this.t.planTrip}</h1>
            <p class="text-teal-100 text-xl">${this.t.subtitle}</p>
          </div>
          
          <div class="bg-white text-gray-800 rounded-xl shadow-2xl overflow-hidden">
            <div class="flex bg-gray-50 border-b">
              <button class="search-tab flex-1 py-4 px-6 font-semibold text-center transition bg-white text-teal-600 border-b-2 border-teal-600" data-type="flights">✈️ ${this.t.flights}</button>
              <button class="search-tab flex-1 py-4 px-6 font-semibold text-center transition text-gray-600 hover:bg-white" data-type="hotels">🏨 ${this.t.hotels}</button>
            </div>
            
            <div class="p-6">
              <div id="flightsForm" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <input type="text" name="from" placeholder="${this.t.from}" class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500">
                  <input type="text" name="to" placeholder="${this.t.to}" class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500">
                  <input type="date" name="departure" class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500">
                  <input type="date" name="return" class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500">
                  <select name="passengers" class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500">
                    ${[1,2,3,4,5,6].map(n => `<option value="${n}">${n}</option>`).join('')}
                  </select>
                </div>
                <button id="searchBtn" class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition text-lg">🔍 ${this.t.search}</button>
              </div>
              
              <div id="hotelsForm" class="hidden space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <input type="text" name="to" placeholder="${this.t.destination}" class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500">
                  <input type="date" name="checkIn" class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500">
                  <input type="date" name="checkOut" class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500">
                  <select name="rooms" class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500">
                    ${[1,2,3,4,5].map(n => `<option value="${n}">${n}</option>`).join('')}
                  </select>
                </div>
                <button id="searchBtn" class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition text-lg">🔍 ${this.t.search}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-16 px-6 bg-gray-50">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-3xl font-bold ${this.isRTL ? 'text-right' : 'text-left'} mb-8">${this.t.specialOffers}</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${this.packages.slice(0, 3).map(pkg => `
              <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <div class="relative h-48 bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
                  <div class="text-7xl">${pkg.image}</div>
                </div>
                <div class="p-5">
                  <h3 class="text-xl font-bold ${this.isRTL ? 'text-right' : 'text-left'} mb-2">${pkg.title[this.language]}</h3>
                  <p class="text-gray-600 ${this.isRTL ? 'text-right' : 'text-left'} text-sm mb-1">${pkg.duration[this.language]}</p>
                  <p class="text-gray-500 ${this.isRTL ? 'text-right' : 'text-left'} text-xs mb-4">${pkg.includes[this.language]}</p>
                  <div class="flex justify-between items-center">
                    <button class="book-btn bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-semibold" data-title="${pkg.title[this.language]}">${this.t.bookNow}</button>
                    <div>
                      <span class="text-2xl font-bold text-teal-600">${pkg.price}</span>
                      <span class="text-sm text-gray-600"> ${this.language === 'ar' ? 'ر.س' : 'SAR'}</span>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  renderActivities() {
    return `
      <div class="bg-gray-50 min-h-screen py-12 px-6">
        <div class="max-w-7xl mx-auto">
          <button class="nav-btn text-teal-600 hover:text-teal-700 mb-4" data-page="home">
            ${this.isRTL ? '→' : '←'} ${this.t.backHome}
          </button>
          <h1 class="text-4xl font-bold ${this.isRTL ? 'text-right' : 'text-left'} mb-4">${this.t.activitiesTitle}</h1>
          
          <div class="flex gap-3 ${this.isRTL ? 'justify-end' : 'justify-start'} mb-6 flex-wrap">
            <button class="category-filter px-6 py-2 rounded-full font-semibold transition bg-teal-600 text-white" data-cat="all">${this.t.all}</button>
            ${this.activityCategories.map(cat => `
              <button class="category-filter px-6 py-2 rounded-full font-semibold transition bg-white text-gray-700 hover:bg-gray-100" data-cat="${cat.id}">
                <span>${cat.icon}</span> <span>${cat.name[this.language]}</span>
              </button>
            `).join('')}
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${this.activities.map(act => `
              <div class="activity-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition" data-category="${act.category}">
                <div class="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <div class="text-7xl">${act.image}</div>
                </div>
                <div class="p-5">
                  <div class="flex items-center gap-2 mb-2 ${this.isRTL ? 'justify-end' : 'justify-start'}">
                    <span class="text-sm text-gray-600">(${act.reviews})</span>
                    <span class="font-bold">${act.rating}</span> <span>⭐</span>
                  </div>
                  <h3 class="text-lg font-bold ${this.isRTL ? 'text-right' : 'text-left'} mb-2">${act.title[this.language]}</h3>
                  <p class="text-sm text-gray-600 ${this.isRTL ? 'text-right' : 'text-left'} mb-4 flex items-center gap-1 ${this.isRTL ? 'justify-end' : 'justify-start'}">
                    <span>${act.location[this.language]}</span> <span>📍</span>
                  </p>
                  <div class="flex justify-between items-center">
                    <button class="book-btn bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-semibold" data-title="${act.title[this.language]}">${this.t.bookNow}</button>
                    <div>
                      <span class="text-xl font-bold text-teal-600">${act.price}</span>
                      <span class="text-sm text-gray-600"> ${this.language === 'ar' ? 'ر.س' : 'SAR'}</span>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  renderPackages() {
    return `
      <div class="bg-gray-50 min-h-screen py-12 px-6">
        <div class="max-w-7xl mx-auto">
          <button class="nav-btn text-teal-600 hover:text-teal-700 mb-4" data-page="home">
            ${this.isRTL ? '→' : '←'} ${this.t.backHome}
          </button>
          <h1 class="text-4xl font-bold ${this.isRTL ? 'text-right' : 'text-left'} mb-4">${this.t.packagesTitle}</h1>
          
          <div class="flex gap-3 ${this.isRTL ? 'justify-end' : 'justify-start'} mb-6 flex-wrap">
            <button class="pkg-filter px-6 py-2 rounded-full font-semibold transition bg-teal-600 text-white" data-cat="all">${this.t.all}</button>
            <button class="pkg-filter px-6 py-2 rounded-full font-semibold transition bg-white text-gray-700 hover:bg-gray-100" data-cat="domestic">${this.t.domestic}</button>
            <button class="pkg-filter px-6 py-2 rounded-full font-semibold transition bg-white text-gray-700 hover:bg-gray-100" data-cat="international">${this.t.international}</button>
            <button class="pkg-filter px-6 py-2 rounded-full font-semibold transition bg-white text-gray-700 hover:bg-gray-100" data-cat="cruises">${this.language === 'ar' ? 'رحلات بحرية' : 'Cruises'}</button>
            <button class="pkg-filter px-6 py-2 rounded-full font-semibold transition bg-white text-gray-700 hover:bg-gray-100" data-cat="umrah">${this.language === 'ar' ? 'عمرة وحج' : 'Umrah & Hajj'}</button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${this.packages.map(pkg => `
              <div class="pkg-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition" data-category="${pkg.category}">
                <div class="relative h-52 bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
                  <div class="text-7xl">${pkg.image}</div>
                  <div class="absolute top-4 right-4 flex items-center gap-1 bg-white px-3 py-1 rounded-full">
                    <span class="text-sm font-bold">${pkg.rating}</span> <span>⭐</span>
                  </div>
                </div>
                <div class="p-5">
                  <h3 class="text-xl font-bold ${this.isRTL ? 'text-right' : 'text-left'} mb-2">${pkg.title[this.language]}</h3>
                  <div class="flex items-center gap-2 text-gray-600 text-sm mb-1 ${this.isRTL ? 'justify-end' : 'justify-start'}">
                    <span>${pkg.duration[this.language]}</span> <span>🕐</span>
                  </div>
                  <p class="text-gray-500 ${this.isRTL ? 'text-right' : 'text-left'} text-sm mb-4">${pkg.includes[this.language]}</p>
                  <div class="flex justify-between items-center pt-4 border-t">
                    <button class="book-btn bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg text-sm font-semibold" data-title="${pkg.title[this.language]}">${this.t.bookNow}</button>
                    <div>
                      <span class="text-2xl font-bold text-teal-600">${pkg.price}</span>
                      <span class="text-sm text-gray-600"> ${this.language === 'ar' ? 'ر.س' : 'SAR'}</span>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  renderTours() {
    return `
      <div class="bg-gray-50 min-h-screen py-12 px-6">
        <div class="max-w-7xl mx-auto">
          <button class="nav-btn text-teal-600 hover:text-teal-700 mb-4" data-page="home">
            ${this.isRTL ? '→' : '←'} ${this.t.backHome}
          </button>
          <h1 class="text-4xl font-bold ${this.isRTL ? 'text-right' : 'text-left'} mb-4">
            ${this.language === 'ar' ? 'الجولات السياحية' : 'Tours & Experiences'}
          </h1>
          <h2>${this.t.packagesTitle}</h2>
        </div>
      </div>
    `;
  }

  renderFooter() {
    return `
      <footer class="bg-gray-100 py-12 px-6">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 ${this.isRTL ? 'text-right' : 'text-left'}">
            <div>
              <h4 class="font-bold mb-4 text-teal-900">${this.language === 'ar' ? 'عن المسافر' : 'About Us'}</h4>
              <ul class="space-y-2 text-sm text-gray-600">
                <li><a href="#" class="hover:text-teal-600">${this.language === 'ar' ? 'من نحن' : 'About'}</a></li>
                <li><a href="#" class="hover:text-teal-600">${this.language === 'ar' ? 'الوظائف' : 'Careers'}</a></li>
                <li><a href="#" class="hover:text-teal-600">${this.language === 'ar' ? 'المدونة' : 'Blog'}</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold mb-4 text-teal-900">${this.language === 'ar' ? 'الخدمات' : 'Services'}</h4>
              <ul class="space-y-2 text-sm text-gray-600">
                <li><a href="#" class="hover:text-teal-600">${this.t.flights}</a></li>
                <li><a href="#" class="hover:text-teal-600">${this.t.hotels}</a></li>
                <li><a href="#" class="hover:text-teal-600">${this.t.activities}</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold mb-4 text-teal-900">${this.language === 'ar' ? 'الدعم' : 'Support'}</h4>
              <ul class="space-y-2 text-sm text-gray-600">
                <li><a href="#" class="hover:text-teal-600">${this.language === 'ar' ? 'اتصل بنا' : 'Contact Us'}</a></li>
                <li><a href="#" class="hover:text-teal-600">${this.language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}</a></li>
                <li><a href="#" class="hover:text-teal-600">${this.language === 'ar' ? 'الشروط والأحكام' : 'Terms'}</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold mb-4 text-teal-900">${this.language === 'ar' ? 'تابعنا' : 'Follow Us'}</h4>
              <div class="flex gap-3 ${this.isRTL ? 'justify-end' : 'justify-start'}">
                <a href="#" class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-teal-600 hover:text-white transition">f</a>
                <a href="#" class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-teal-600 hover:text-white transition">t</a>
                <a href="#" class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-teal-600 hover:text-white transition">in</a>
              </div>
            </div>
          </div>
          <div class="border-t border-gray-300 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2025 ${this.language === 'ar' ? 'مايلز ترافيل - جميع الحقوق محفوظة' : 'MILES TRAVEL - All Rights Reserved'}</p>
          </div>
        </div>
      </footer>
    `;
  }

  attachEventListeners() {
    // Logo click - redirect to home
    document.getElementById('logoBtn')?.addEventListener('click', () => {
      this.currentPage = 'home';
      this.render();
      this.attachEventListeners();
    });

    // Language toggle
    document.getElementById('langToggle')?.addEventListener('click', () => {
      this.language = this.language === 'ar' ? 'en' : 'ar';
      this.render();
      this.attachEventListeners();
    });

    // Currency toggle
    document.getElementById('currencyToggle')?.addEventListener('change', (e) => {
      this.currency = e.target.value;
      this.render();
      this.attachEventListeners();
    });

    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentPage = btn.dataset.page;
        this.render();
        this.attachEventListeners();
      });
    });

    // Search tabs
    document.querySelectorAll('.search-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        this.searchType = tab.dataset.type;
        document.querySelectorAll('.search-tab').forEach(t => {
          t.classList.remove('bg-white', 'text-teal-600', 'border-b-2', 'border-teal-600');
          t.classList.add('text-gray-600', 'hover:bg-white');
        });
        tab.classList.remove('text-gray-600', 'hover:bg-white');
        tab.classList.add('bg-white', 'text-teal-600', 'border-b-2', 'border-teal-600');
        
        document.getElementById('flightsForm')?.classList.toggle('hidden');
        document.getElementById('hotelsForm')?.classList.toggle('hidden');
      });
    });

    // Search button
    document.getElementById('searchBtn')?.addEventListener('click', () => {
      this.handleSearch();
    });

    // Book buttons
    document.querySelectorAll('.book-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.sendToWhatsApp(`Interested in: ${btn.dataset.title}`);
      });
    });

    // Services menu toggle
    const servicesBtn = document.getElementById('servicesBtn');
    const servicesMenu = document.getElementById('servicesMenu');
    if (servicesBtn && servicesMenu) {
      servicesBtn.addEventListener('click', () => {
        servicesMenu.classList.toggle('hidden');
      });
    }

    // Category filters
    document.querySelectorAll('.category-filter, .pkg-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.cat;
        
        // Update active button styling
        btn.parentElement?.querySelectorAll('button').forEach(b => {
          b.classList.remove('bg-teal-600', 'text-white');
          b.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-100');
        });
        btn.classList.remove('bg-white', 'text-gray-700', 'hover:bg-gray-100');
        btn.classList.add('bg-teal-600', 'text-white');
        
        // Filter cards
        if (btn.classList.contains('category-filter')) {
          document.querySelectorAll('.activity-card').forEach(card => {
            if (cat === 'all' || card.dataset.category === cat) {
              card.style.display = '';
            } else {
              card.style.display = 'none';
            }
          });
        } else {
          document.querySelectorAll('.pkg-card').forEach(card => {
            if (cat === 'all' || card.dataset.category === cat) {
              card.style.display = '';
            } else {
              card.style.display = 'none';
            }
          });
        }
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TravelAgency();
});
