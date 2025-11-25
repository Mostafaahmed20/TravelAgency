import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage, translations } from './context/LanguageContext';
import { CurrencyProvider } from './context/CurrencyContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Flights from './pages/Flights';
import Hotels from './pages/Hotels';
import HotelDetails from './pages/HotelDetails';
import DestinationDetails from './pages/DestinationDetails';
import HotelDetailsPage from './pages/HotelDetailsPage';
import PackageDetails from './pages/PackageDetails';
import Offers from './pages/Offers';
import About from './pages/About';
import Contact from './pages/Contact';
import './styles/globals.css';

function usePageMetadata(language) {
  const location = useLocation();

  useEffect(() => {
    // set html lang and dir
    try {
      document.documentElement.lang = language === 'ar' ? 'ar' : 'en';
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    } catch (e) {
      // ignore for SSR-less env
    }

    // dynamic title and description per route
    const path = location.pathname;
    let titleKey = 'exploreTheWorld';
    let desc = translations[language]?.findAmazingDeals || '';

    if (path.startsWith('/flights')) {
      titleKey = 'bookYourFlight';
      desc = translations[language]?.findTheFlightDeals;
    } else if (path.startsWith('/hotels')) {
      titleKey = 'findYourHotel';
      desc = translations[language]?.findTheHotelDeals;
    } else if (path.startsWith('/offers')) {
      titleKey = 'exclusiveTravelOffers';
      desc = translations[language]?.findAmazingDeals;
    } else if (path.startsWith('/about')) {
      titleKey = 'aboutMilesTravel';
      desc = translations[language]?.discoverTheWorld;
    } else if (path.startsWith('/contact')) {
      titleKey = 'getInTouch';
      desc = translations[language]?.contactInformation;
    }

    const title = `${translations[language]?.[titleKey] || 'TravelHub'} - Miles Travel`;
    document.title = title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc || 'TravelHub - travel platform');

    // update og:title/description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    if (ogDesc) ogDesc.setAttribute('content', desc || '');
  }, [location, language]);
}

function AppContent() {
  const { language } = useLanguage();
  usePageMetadata(language);

  return (
    <div className="flex flex-col min-h-screen" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route path="/destinations/:id" element={<DestinationDetails />} />
          <Route path="/hotels-eg/:id" element={<HotelDetailsPage />} />
          <Route path="/hotels-sa/:id" element={<HotelDetailsPage />} />
          <Route path="/packages/:id" element={<PackageDetails />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <Router>
          <AppContent />
        </Router>
      </CurrencyProvider>
    </LanguageProvider>
  );
}

export default App;
