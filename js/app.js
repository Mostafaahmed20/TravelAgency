// Travel Agency Application - Almosafer Style
class TravelAgency {
  constructor() {
    this.currentPage = 'home';
    this.searchType = 'flights';
    this.language = 'ar';
    this.formData = {
      from: '', to: '', departure: '', return: '', passengers: '1',
      checkIn: '', checkOut: '', rooms: '1'
    };
    this.whatsappNumber = '966501234567';
    this.init();
  }

  translations = {
    ar: {
      logo: 'المسافر',
      flights: 'طيران',
      hotels: 'فنادق',
      packages: 'رحلات',
      activities: 'أنشطة',
      moreServices: 'المزيد',
      login: 'دخول',
      language: 'English',
      currency: 'SAR',
      contact: '+966501234567',
      planTrip: 'خطط عطلتك بسهولة',
      subtitle: 'احجز رحلات وفنادق وأنشطة سياحية من أفضل المقدمين',
      from: 'من',
      to: 'إلى',
      departure: 'الذهاب',
      return: 'العودة',
      checkIn: 'الدخول',
      checkOut: 'المغادرة',
      passengers: 'مسافرون',
      rooms: 'غرف',
      search: 'بحث',
      backHome: 'العودة',
      specialOffers: 'عروض مميزة',
      activitiesTitle: 'الأنشطة والتجارب',
      packagesTitle: 'الرحلات المنظمة',
      bookNow: 'احجز الآن',
      all: 'الكل',
      destination: 'الوجهة',
      reviews: 'تقييم',
      duration: 'المدة',
      includes: 'يشمل',
      aboutUs: 'عن المسافر',
      about: 'عن الموقع',
      careers: 'الوظائف',
      blog: 'المدونة',
      services: 'الخدمات',
      support: 'الدعم',
      contactUs: 'اتصل بنا',
      faq: 'الأسئلة الشائعة',
      terms: 'الشروط والأحكام',
      followUs: 'تابعنا',
      allRightsReserved: 'جميع الحقوق محفوظة'
    },
    en: {
      logo: 'Almosafer',
      flights: 'Flights',
      hotels: 'Hotels',
      packages: 'Packages',
      activities: 'Activities',
      moreServices: 'More',
      login: 'Login',
      language: 'العربية',
      currency: 'SAR',
      contact: '+966501234567',
      planTrip: 'Plan Your Trip Easily',
      subtitle: 'Book flights, hotels, and activities from the best providers',
      from: 'From',
      to: 'To',
      departure: 'Departure',
      return: 'Return',
      checkIn: 'Check-in',
      checkOut: 'Check-out',
      passengers: 'Passengers',
      rooms: 'Rooms',
      search: 'Search',
      backHome: 'Back',
      specialOffers: 'Special Offers',
      activitiesTitle: 'Activities & Experiences',
      packagesTitle: 'Travel Packages',
      bookNow: 'Book Now',
      all: 'All',
      destination: 'Destination',
      reviews: 'reviews',
      duration: 'Duration',
      includes: 'Includes',
      aboutUs: 'About Us',
      about: 'About',
      careers: 'Careers',
      blog: 'Blog',
      services: 'Services',
      support: 'Support',
      contactUs: 'Contact Us',
      faq: 'FAQ',
      terms: 'Terms',
      followUs: 'Follow Us',
      allRightsReserved: 'All Rights Reserved'
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

  activities = [
    { id: 1, title: { ar: 'جولة برج خليفة', en: 'Burj Khalifa Tour' }, location: { ar: 'دبي', en: 'Dubai' }, price: '245', rating: 4.8, reviews: 2847, image: '🏙️' },
    { id: 2, title: { ar: 'سفاري صحراوية', en: 'Desert Safari' }, location: { ar: 'أبوظبي', en: 'Abu Dhabi' }, price: '189', rating: 4.9, reviews: 1523, image: '🏜️' },
    { id: 3, title: { ar: 'أكواريوم دبي', en: 'Dubai Aquarium' }, location: { ar: 'دبي', en: 'Dubai' }, price: '165', rating: 4.7, reviews: 3201, image: '🐠' },
    { id: 4, title: { ar: 'متحف اللوفر أبوظبي', en: 'Louvre Museum' }, location: { ar: 'أبوظبي', en: 'Abu Dhabi' }, price: '225', rating: 4.9, reviews: 987, image: '🖼️' },
    { id: 5, title: { ar: 'منطاد الهواء', en: 'Hot Air Balloon' }, location: { ar: 'دبي', en: 'Dubai' }, price: '890', rating: 5.0, reviews: 456, image: '🎈' },
    { id: 6, title: { ar: 'ياس ووتروورلد', en: 'Yas Waterworld' }, location: { ar: 'أبوظبي', en: 'Abu Dhabi' }, price: '280', rating: 4.8, reviews: 2156, image: '🌊' }
  ];

  packages = [
    { id: 1, type: 'domestic', title: { ar: 'جدة - البحر الأحمر', en: 'Jeddah - Red Sea' }, duration: { ar: '3 أيام / 2 ليالي', en: '3 Days / 2 Nights' }, price: '899', includes: { ar: 'فندق + إفطار + جولات', en: 'Hotel + Breakfast + Tours' }, rating: 4.6, image: '🏖️' },
    { id: 2, type: 'international', title: { ar: 'باريس - مدينة النور', en: 'Paris - City of Lights' }, duration: { ar: '5 أيام / 4 ليالي', en: '5 Days / 4 Nights' }, price: '3,499', includes: { ar: 'طيران + فندق + جولات', en: 'Flight + Hotel + Tours' }, rating: 4.9, image: '🗼' },
    { id: 3, type: 'domestic', title: { ar: 'الرياض - التراث والحداثة', en: 'Riyadh - Heritage' }, duration: { ar: '2 أيام / 1 ليلة', en: '2 Days / 1 Night' }, price: '649', includes: { ar: 'فندق + إفطار', en: 'Hotel + Breakfast' }, rating: 4.5, image: '🏛️' },
    { id: 4, type: 'international', title: { ar: 'دبي - مدينة المستقبل', en: 'Dubai - City of Future' }, duration: { ar: '4 أيام / 3 ليالي', en: '4 Days / 3 Nights' }, price: '1,899', includes: { ar: 'طيران + فندق فخم', en: 'Flight + Luxury Hotel' }, rating: 4.8, image: '🌆' },
    { id: 5, type: 'cruises', title: { ar: 'رحلة بحرية البحر الأحمر', en: 'Red Sea Cruise' }, duration: { ar: '7 أيام / 6 ليالي', en: '7 Days / 6 Nights' }, price: '5,999', includes: { ar: 'رحلة فاخرة', en: 'All-Inclusive' }, rating: 5.0, image: '🛳️' },
    { id: 6, type: 'umrah', title: { ar: 'عمرة رمضان', en: 'Ramadan Umrah' }, duration: { ar: '10 أيام / 9 ليالي', en: '10 Days / 9 Nights' }, price: '4,499', includes: { ar: 'طيران + فندق + نقل', en: 'Flight + Hotel + Transport' }, rating: 4.9, image: '🕌' }
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
    if (this.searchType === 'flights') {
      if (!this.formData.from || !this.formData.to || !this.formData.departure) {
        alert(this.isRTL ? 'يرجى ملء جميع التفاصيل' : 'Please fill all details');
        return;
      }
      const message = `Flight Search:\nFrom: ${this.formData.from}\nTo: ${this.formData.to}\nDeparture: ${this.formData.departure}`;
      this.sendToWhatsApp(message);
    } else if (this.searchType === 'hotels') {
      if (!this.formData.to || !this.formData.checkIn || !this.formData.checkOut) {
        alert(this.isRTL ? 'يرجى ملء جميع التفاصيل' : 'Please fill all details');
        return;
      }
      const message = `Hotel Search:\nDestination: ${this.formData.to}\nCheck-in: ${this.formData.checkIn}\nCheck-out: ${this.formData.checkOut}`;
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
    
    html += this.renderFooter();
    
    document.body.innerHTML = html;
  }

  renderHeader() {
    return `
      <header>
        <div class="header-top">
          <div class="max-width" style="display: flex; justify-content: space-between; align-items: center; padding: 0 20px;">
            <div style="display: flex; gap: 15px; align-items: center;">
              <a href="#" style="text-decoration: none;">📞 ${this.t.contact}</a>
              <button id="langToggle" style="color: white; background: none; border: none; cursor: pointer; padding: 0;">
                🌐 ${this.t.language}
              </button>
            </div>
            <button id="loginBtn" style="border: 1px solid white; padding: 6px 12px; border-radius: 4px; background: none; color: white; cursor: pointer;">
              ${this.t.login}
            </button>
          </div>
        </div>
        <div class="header-main">
          <div class="max-width" style="display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 0 20px;">
            <div class="logo">🧳 ${this.t.logo}</div>
            <div class="header-actions">
              <input type="text" placeholder="${this.t.search}..." style="padding: 8px 12px; border: none; border-radius: 6px; width: 150px;">
            </div>
          </div>
        </div>
      </header>
    `;
  }

  renderNav() {
    return `
      <nav>
        <div class="max-width" style="padding: 0 20px;">
          <div class="nav-items">
            <button class="nav-btn" data-page="home">✈️ ${this.t.flights}</button>
            <button class="nav-btn" data-page="home">🏨 ${this.t.hotels}</button>
            <button class="nav-btn" data-page="packages">🎫 ${this.t.packages}</button>
            <button class="nav-btn" data-page="activities">🎭 ${this.t.activities}</button>
            <button class="nav-btn" id="servicesBtn">⋯ ${this.t.moreServices}</button>
          </div>
        </div>
      </nav>
      <div id="servicesMenu" class="hidden" style="position: absolute; top: 100%; left: 0; right: 0; background: white; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); z-index: 1000;">
        <div class="max-width" style="padding: 0 20px;">
          <div class="services-menu">
            ${this.services.map(s => `
              <div class="service-item">
                <div class="service-icon">${s.icon}</div>
                <div class="service-name">${s.name[this.language]}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  renderHome() {
    return `
      <section class="hero">
        <div class="hero-content max-width">
          <h1>${this.t.planTrip}</h1>
          <p>${this.t.subtitle}</p>
          
          <div class="search-container">
            <div class="search-tabs">
              <button class="search-tab active" data-type="flights">✈️ ${this.t.flights}</button>
              <button class="search-tab" data-type="hotels">🏨 ${this.t.hotels}</button>
            </div>
            
            <form class="search-form" id="searchForm">
              <div id="flightsForm">
                <div class="form-row">
                  <div class="form-group">
                    <label>${this.t.from}</label>
                    <input type="text" name="from" placeholder="NYC">
                  </div>
                  <div class="form-group">
                    <label>${this.t.to}</label>
                    <input type="text" name="to" placeholder="DXB">
                  </div>
                  <div class="form-group">
                    <label>${this.t.departure}</label>
                    <input type="date" name="departure">
                  </div>
                  <div class="form-group">
                    <label>${this.t.return}</label>
                    <input type="date" name="return">
                  </div>
                  <div class="form-group">
                    <label>${this.t.passengers}</label>
                    <select name="passengers">
                      ${[1,2,3,4,5,6].map(n => `<option value="${n}">${n}</option>`).join('')}
                    </select>
                  </div>
                </div>
              </div>
              
              <div id="hotelsForm" class="hidden">
                <div class="form-row">
                  <div class="form-group">
                    <label>${this.t.destination}</label>
                    <input type="text" name="to" placeholder="Dubai">
                  </div>
                  <div class="form-group">
                    <label>${this.t.checkIn}</label>
                    <input type="date" name="checkIn">
                  </div>
                  <div class="form-group">
                    <label>${this.t.checkOut}</label>
                    <input type="date" name="checkOut">
                  </div>
                  <div class="form-group">
                    <label>${this.t.rooms}</label>
                    <select name="rooms">
                      ${[1,2,3,4,5].map(n => `<option value="${n}">${n}</option>`).join('')}
                    </select>
                  </div>
                </div>
              </div>
              
              <button type="button" class="search-btn" id="searchBtn">🔍 ${this.t.search}</button>
            </form>
          </div>
        </div>
      </section>

      <section class="max-width">
        <h2>${this.t.specialOffers}</h2>
        <div class="cards-grid">
          ${this.packages.slice(0, 3).map(pkg => this.renderPackageCard(pkg)).join('')}
        </div>
      </section>
    `;
  }

  renderActivities() {
    return `
      <section class="max-width">
        <button class="nav-btn" data-page="home" style="margin-bottom: 20px; padding: 8px 12px;">
          ← ${this.t.backHome}
        </button>
        <h2>${this.t.activitiesTitle}</h2>
        
        <div class="cards-grid">
          ${this.activities.map(act => `
            <div class="card">
              <div class="card-image">
                <div>${act.image}</div>
              </div>
              <div class="card-content">
                <h3 class="card-title">${act.title[this.language]}</h3>
                <p class="card-location">📍 ${act.location[this.language]}</p>
                <div class="card-meta">
                  <div class="card-rating">
                    <strong>⭐ ${act.rating}</strong>
                    <span>(${act.reviews} ${this.t.reviews})</span>
                  </div>
                </div>
                <div class="card-footer">
                  <button class="btn-book" data-title="${act.title[this.language]}">${this.t.bookNow}</button>
                  <div class="card-price">
                    <strong>${act.price}</strong>
                    <span>${this.t.currency}</span>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  renderPackages() {
    return `
      <section class="max-width">
        <button class="nav-btn" data-page="home" style="margin-bottom: 20px; padding: 8px 12px;">
          ← ${this.t.backHome}
        </button>
        <h2>${this.t.packagesTitle}</h2>
        
        <div class="cards-grid">
          ${this.packages.map(pkg => this.renderPackageCard(pkg)).join('')}
        </div>
      </section>
    `;
  }

  renderPackageCard(pkg) {
    return `
      <div class="card">
        <div class="card-image">
          <div>${pkg.image}</div>
          <div class="card-badge rating">⭐ ${pkg.rating}</div>
        </div>
        <div class="card-content">
          <h3 class="card-title">${pkg.title[this.language]}</h3>
          <p class="card-location">🕐 ${pkg.duration[this.language]}</p>
          <p style="font-size: 13px; color: var(--text-light); margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid var(--border-color);">
            ${pkg.includes[this.language]}
          </p>
          <div class="card-footer">
            <button class="btn-book" data-title="${pkg.title[this.language]}">${this.t.bookNow}</button>
            <div class="card-price">
              <strong>${pkg.price}</strong>
              <span>${this.t.currency}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderFooter() {
    return `
      <footer>
        <div class="footer-content">
          <div class="footer-section">
            <h4>${this.t.aboutUs}</h4>
            <ul>
              <li><a href="#">${this.t.about}</a></li>
              <li><a href="#">${this.t.careers}</a></li>
              <li><a href="#">${this.t.blog}</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>${this.t.services}</h4>
            <ul>
              <li><a href="#">${this.t.flights}</a></li>
              <li><a href="#">${this.t.hotels}</a></li>
              <li><a href="#">${this.t.activities}</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>${this.t.support}</h4>
            <ul>
              <li><a href="#">${this.t.contactUs}</a></li>
              <li><a href="#">${this.t.faq}</a></li>
              <li><a href="#">${this.t.terms}</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>${this.t.followUs}</h4>
            <div style="display: flex; gap: 10px;">
              <a href="#" style="width: 40px; height: 40px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none;">f</a>
              <a href="#" style="width: 40px; height: 40px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none;">𝕏</a>
              <a href="#" style="width: 40px; height: 40px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none;">in</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 ${this.t.logo} - ${this.t.allRightsReserved}</p>
        </div>
      </footer>
    `;
  }

  attachEventListeners() {
    // Language toggle
    document.getElementById('langToggle')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.language = this.language === 'ar' ? 'en' : 'ar';
      this.render();
      this.attachEventListeners();
    });

    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const page = btn.dataset.page;
        if (page) {
          this.currentPage = page;
          this.render();
          this.attachEventListeners();
        }
      });
    });

    // Search tabs
    document.querySelectorAll('.search-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        this.searchType = tab.dataset.type;
        document.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        document.getElementById('flightsForm')?.classList.toggle('hidden');
        document.getElementById('hotelsForm')?.classList.toggle('hidden');
      });
    });

    // Search button
    document.getElementById('searchBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('input, select').forEach(input => {
        this.formData[input.name] = input.value;
      });
      this.handleSearch();
    });

    // Book buttons
    document.querySelectorAll('.btn-book').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.sendToWhatsApp(`Interested in: ${btn.dataset.title}`);
      });
    });

    // Services menu toggle
    const servicesBtn = document.getElementById('servicesBtn');
    const servicesMenu = document.getElementById('servicesMenu');
    if (servicesBtn && servicesMenu) {
      servicesBtn.addEventListener('click', (e) => {
        e.preventDefault();
        servicesMenu.classList.toggle('hidden');
      });
      document.addEventListener('click', (e) => {
        if (!servicesBtn.contains(e.target) && !servicesMenu.contains(e.target)) {
          servicesMenu.classList.add('hidden');
        }
      });
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TravelAgency();
});
