import React, { useState, useRef, useEffect } from 'react';
import { sendWhatsAppMessage } from '../../utils/whatsappRedirect';
import { useLanguage, translations } from '../../context/LanguageContext';
import { destinationsData, hotelsEgyptData, hotelsSaudiData } from '../../data/destinationsData';
import { MapPin } from 'lucide-react';

const HotelSearch = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    rooms: '1',
    guests: '1'
  });
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Create destinations list for autocomplete (memoized with useMemo)
  const allDestinations = React.useMemo(() => {
    const dests = [
      // From destinationsData (cities)
      ...destinationsData.map(dest => ({
        name: language === 'ar' ? dest.city_ar : dest.city,
        nameEn: dest.city,
        nameAr: dest.city_ar,
        country: language === 'ar' ? dest.country_ar : dest.country,
        countryEn: dest.country,
        countryAr: dest.country_ar,
        type: 'city'
      })),
      // From Egypt hotels by city
      ...hotelsEgyptData.map(hotel => ({
        name: language === 'ar' ? hotel.city_ar : hotel.city,
        nameEn: hotel.city,
        nameAr: hotel.city_ar,
        country: language === 'ar' ? 'مصر' : 'Egypt',
        countryEn: 'Egypt',
        countryAr: 'مصر',
        type: 'city'
      })),
      // From Saudi Arabia hotels by city
      ...hotelsSaudiData.map(hotel => ({
        name: language === 'ar' ? hotel.city_ar : hotel.city,
        nameEn: hotel.city,
        nameAr: hotel.city_ar,
        country: language === 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia',
        countryEn: 'Saudi Arabia',
        countryAr: 'المملكة العربية السعودية',
        type: 'city'
      }))
    ];
    // Remove duplicates based on name
    const uniqueDests = [];
    const seen = new Set();
    dests.forEach(dest => {
      const key = `${dest.nameEn}-${dest.nameAr}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueDests.push(dest);
      }
    });
    return uniqueDests;
  }, [language]);

  // Comprehensive travel-related keywords for smart suggestions (like Google autocomplete)
  const getSmartSuggestions = React.useCallback((searchTerm) => {
    const normalized = searchTerm.toLowerCase().trim();
    const originalTerm = searchTerm.trim();
    const suggestions = [];
    
    // Comprehensive pattern matching for all common travel searches
    const patterns = {
      // English patterns
      'tur': [
        { name: 'Turkey', nameEn: 'Turkey', nameAr: 'تركيا', country: 'Turkey', countryEn: 'Turkey', countryAr: 'تركيا', type: 'country', priority: 1 },
        { name: 'Turkmenistan', nameEn: 'Turkmenistan', nameAr: 'تركمانستان', country: 'Turkmenistan', countryEn: 'Turkmenistan', countryAr: 'تركمانستان', type: 'country', priority: 2 },
        { name: 'Tours', nameEn: 'Tours', nameAr: 'جولات', country: 'France', countryEn: 'France', countryAr: 'فرنسا', type: 'city', priority: 3 },
        { name: 'Tourism', nameEn: 'Tourism', nameAr: 'سياحة', country: '', countryEn: '', countryAr: '', type: 'keyword', priority: 4 },
        { name: 'Turin', nameEn: 'Turin', nameAr: 'تورينو', country: 'Italy', countryEn: 'Italy', countryAr: 'إيطاليا', type: 'city', priority: 5 }
      ],
      'fra': [
        { name: 'France', nameEn: 'France', nameAr: 'فرنسا', country: 'France', countryEn: 'France', countryAr: 'فرنسا', type: 'country', priority: 1 },
        { name: 'Frankfurt', nameEn: 'Frankfurt', nameAr: 'فرانكفورت', country: 'Germany', countryEn: 'Germany', countryAr: 'ألمانيا', type: 'city', priority: 2 },
        { name: 'Fraser Island', nameEn: 'Fraser Island', nameAr: 'جزيرة فريزر', country: 'Australia', countryEn: 'Australia', countryAr: 'أستراليا', type: 'destination', priority: 3 }
      ],
      'egy': [
        { name: 'Egypt', nameEn: 'Egypt', nameAr: 'مصر', country: 'Egypt', countryEn: 'Egypt', countryAr: 'مصر', type: 'country', priority: 1 },
        { name: 'Cairo', nameEn: 'Cairo', nameAr: 'القاهرة', country: 'Egypt', countryEn: 'Egypt', countryAr: 'مصر', type: 'city', priority: 2 },
        { name: 'Sharm El Sheikh', nameEn: 'Sharm El Sheikh', nameAr: 'شرم الشيخ', country: 'Egypt', countryEn: 'Egypt', countryAr: 'مصر', type: 'city', priority: 3 },
        { name: 'Hurghada', nameEn: 'Hurghada', nameAr: 'الغردقة', country: 'Egypt', countryEn: 'Egypt', countryAr: 'مصر', type: 'city', priority: 4 },
        { name: 'Luxor', nameEn: 'Luxor', nameAr: 'الأقصر', country: 'Egypt', countryEn: 'Egypt', countryAr: 'مصر', type: 'city', priority: 5 }
      ],
      'dub': [
        { name: 'Dubai', nameEn: 'Dubai', nameAr: 'دبي', country: 'UAE', countryEn: 'UAE', countryAr: 'الإمارات', type: 'city', priority: 1 },
        { name: 'Dublin', nameEn: 'Dublin', nameAr: 'دبلن', country: 'Ireland', countryEn: 'Ireland', countryAr: 'أيرلندا', type: 'city', priority: 2 }
      ],
      'lon': [
        { name: 'London', nameEn: 'London', nameAr: 'لندن', country: 'UK', countryEn: 'UK', countryAr: 'بريطانيا', type: 'city', priority: 1 },
        { name: 'Long Beach', nameEn: 'Long Beach', nameAr: 'لونج بيتش', country: 'USA', countryEn: 'USA', countryAr: 'الولايات المتحدة', type: 'city', priority: 2 }
      ],
      'par': [
        { name: 'Paris', nameEn: 'Paris', nameAr: 'باريس', country: 'France', countryEn: 'France', countryAr: 'فرنسا', type: 'city', priority: 1 },
        { name: 'Prague', nameEn: 'Prague', nameAr: 'براغ', country: 'Czech Republic', countryEn: 'Czech Republic', countryAr: 'التشيك', type: 'city', priority: 2 },
        { name: 'Phuket', nameEn: 'Phuket', nameAr: 'بوكيت', country: 'Thailand', countryEn: 'Thailand', countryAr: 'تايلاند', type: 'city', priority: 3 }
      ],
      'ist': [
        { name: 'Istanbul', nameEn: 'Istanbul', nameAr: 'إسطنبول', country: 'Turkey', countryEn: 'Turkey', countryAr: 'تركيا', type: 'city', priority: 1 },
        { name: 'Israel', nameEn: 'Israel', nameAr: 'إسرائيل', country: 'Israel', countryEn: 'Israel', countryAr: 'إسرائيل', type: 'country', priority: 2 }
      ],
      'mal': [
        { name: 'Maldives', nameEn: 'Maldives', nameAr: 'المالديف', country: 'Maldives', countryEn: 'Maldives', countryAr: 'المالديف', type: 'country', priority: 1 },
        { name: 'Malaysia', nameEn: 'Malaysia', nameAr: 'ماليزيا', country: 'Malaysia', countryEn: 'Malaysia', countryAr: 'ماليزيا', type: 'country', priority: 2 },
        { name: 'Mallorca', nameEn: 'Mallorca', nameAr: 'مايوركا', country: 'Spain', countryEn: 'Spain', countryAr: 'إسبانيا', type: 'city', priority: 3 },
        { name: 'Malta', nameEn: 'Malta', nameAr: 'مالطا', country: 'Malta', countryEn: 'Malta', countryAr: 'مالطا', type: 'country', priority: 4 },
        { name: 'Maldives', nameEn: 'Maldives', nameAr: 'المالديف', country: 'Maldives', countryEn: 'Maldives', countryAr: 'المالديف', type: 'country', priority: 5 }
      ],
      'ger': [
        { name: 'Germany', nameEn: 'Germany', nameAr: 'ألمانيا', country: 'Germany', countryEn: 'Germany', countryAr: 'ألمانيا', type: 'country', priority: 1 },
        { name: 'Georgia', nameEn: 'Georgia', nameAr: 'جورجيا', country: 'Georgia', countryEn: 'Georgia', countryAr: 'جورجيا', type: 'country', priority: 2 }
      ],
      'sau': [
        { name: 'Saudi Arabia', nameEn: 'Saudi Arabia', nameAr: 'المملكة العربية السعودية', country: 'Saudi Arabia', countryEn: 'Saudi Arabia', countryAr: 'المملكة العربية السعودية', type: 'country', priority: 1 },
        { name: 'Makkah', nameEn: 'Makkah', nameAr: 'مكة المكرمة', country: 'Saudi Arabia', countryEn: 'Saudi Arabia', countryAr: 'المملكة العربية السعودية', type: 'city', priority: 2 },
        { name: 'Madinah', nameEn: 'Madinah', nameAr: 'المدينة المنورة', country: 'Saudi Arabia', countryEn: 'Saudi Arabia', countryAr: 'المملكة العربية السعودية', type: 'city', priority: 3 },
        { name: 'Riyadh', nameEn: 'Riyadh', nameAr: 'الرياض', country: 'Saudi Arabia', countryEn: 'Saudi Arabia', countryAr: 'المملكة العربية السعودية', type: 'city', priority: 4 },
        { name: 'Jeddah', nameEn: 'Jeddah', nameAr: 'جدة', country: 'Saudi Arabia', countryEn: 'Saudi Arabia', countryAr: 'المملكة العربية السعودية', type: 'city', priority: 5 }
      ],
      'aze': [
        { name: 'Azerbaijan', nameEn: 'Azerbaijan', nameAr: 'أذربيجان', country: 'Azerbaijan', countryEn: 'Azerbaijan', countryAr: 'أذربيجان', type: 'country', priority: 1 },
        { name: 'Baku', nameEn: 'Baku', nameAr: 'باكو', country: 'Azerbaijan', countryEn: 'Azerbaijan', countryAr: 'أذربيجان', type: 'city', priority: 2 }
      ],
      'geo': [
        { name: 'Georgia', nameEn: 'Georgia', nameAr: 'جورجيا', country: 'Georgia', countryEn: 'Georgia', countryAr: 'جورجيا', type: 'country', priority: 1 },
        { name: 'Tbilisi', nameEn: 'Tbilisi', nameAr: 'تبليسي', country: 'Georgia', countryEn: 'Georgia', countryAr: 'جورجيا', type: 'city', priority: 2 },
        { name: 'Batumi', nameEn: 'Batumi', nameAr: 'باتومي', country: 'Georgia', countryEn: 'Georgia', countryAr: 'جورجيا', type: 'city', priority: 3 }
      ],
      'pol': [
        { name: 'Poland', nameEn: 'Poland', nameAr: 'بولندا', country: 'Poland', countryEn: 'Poland', countryAr: 'بولندا', type: 'country', priority: 1 },
        { name: 'Warsaw', nameEn: 'Warsaw', nameAr: 'وارسو', country: 'Poland', countryEn: 'Poland', countryAr: 'بولندا', type: 'city', priority: 2 },
        { name: 'Krakow', nameEn: 'Krakow', nameAr: 'كراكوف', country: 'Poland', countryEn: 'Poland', countryAr: 'بولندا', type: 'city', priority: 3 }
      ],
      'maur': [
        { name: 'Mauritius', nameEn: 'Mauritius', nameAr: 'موريشيوس', country: 'Mauritius', countryEn: 'Mauritius', countryAr: 'موريشيوس', type: 'country', priority: 1 }
      ],
      // Arabic patterns
      'ترك': [
        { name: 'تركيا', nameEn: 'Turkey', nameAr: 'تركيا', country: 'Turkey', countryEn: 'Turkey', countryAr: 'تركيا', type: 'country', priority: 1 },
        { name: 'تركمانستان', nameEn: 'Turkmenistan', nameAr: 'تركمانستان', country: 'Turkmenistan', countryEn: 'Turkmenistan', countryAr: 'تركمانستان', type: 'country', priority: 2 },
        { name: 'تركي', nameEn: 'Turkish', nameAr: 'تركي', country: 'Turkey', countryEn: 'Turkey', countryAr: 'تركيا', type: 'keyword', priority: 3 },
        { name: 'ترك', nameEn: 'Turkey', nameAr: 'ترك', country: 'Turkey', countryEn: 'Turkey', countryAr: 'تركيا', type: 'country', priority: 4 },
        { name: 'تركية', nameEn: 'Turkish', nameAr: 'تركية', country: 'Turkey', countryEn: 'Turkey', countryAr: 'تركيا', type: 'keyword', priority: 5 }
      ],
      'مصر': [
        { name: 'مصر', nameEn: 'Egypt', nameAr: 'مصر', country: 'Egypt', countryEn: 'Egypt', countryAr: 'مصر', type: 'country', priority: 1 },
        { name: 'القاهرة', nameEn: 'Cairo', nameAr: 'القاهرة', country: 'Egypt', countryEn: 'Egypt', countryAr: 'مصر', type: 'city', priority: 2 },
        { name: 'شرم الشيخ', nameEn: 'Sharm El Sheikh', nameAr: 'شرم الشيخ', country: 'Egypt', countryEn: 'Egypt', countryAr: 'مصر', type: 'city', priority: 3 },
        { name: 'الغردقة', nameEn: 'Hurghada', nameAr: 'الغردقة', country: 'Egypt', countryEn: 'Egypt', countryAr: 'مصر', type: 'city', priority: 4 },
        { name: 'الأقصر', nameEn: 'Luxor', nameAr: 'الأقصر', country: 'Egypt', countryEn: 'Egypt', countryAr: 'مصر', type: 'city', priority: 5 }
      ],
      'دبي': [
        { name: 'دبي', nameEn: 'Dubai', nameAr: 'دبي', country: 'UAE', countryEn: 'UAE', countryAr: 'الإمارات', type: 'city', priority: 1 }
      ],
      'السعودية': [
        { name: 'المملكة العربية السعودية', nameEn: 'Saudi Arabia', nameAr: 'المملكة العربية السعودية', country: 'Saudi Arabia', countryEn: 'Saudi Arabia', countryAr: 'المملكة العربية السعودية', type: 'country', priority: 1 },
        { name: 'مكة المكرمة', nameEn: 'Makkah', nameAr: 'مكة المكرمة', country: 'Saudi Arabia', countryEn: 'Saudi Arabia', countryAr: 'المملكة العربية السعودية', type: 'city', priority: 2 },
        { name: 'المدينة المنورة', nameEn: 'Madinah', nameAr: 'المدينة المنورة', country: 'Saudi Arabia', countryEn: 'Saudi Arabia', countryAr: 'المملكة العربية السعودية', type: 'city', priority: 3 },
        { name: 'الرياض', nameEn: 'Riyadh', nameAr: 'الرياض', country: 'Saudi Arabia', countryEn: 'Saudi Arabia', countryAr: 'المملكة العربية السعودية', type: 'city', priority: 4 },
        { name: 'جدة', nameEn: 'Jeddah', nameAr: 'جدة', country: 'Saudi Arabia', countryEn: 'Saudi Arabia', countryAr: 'المملكة العربية السعودية', type: 'city', priority: 5 }
      ],
      'فرنسا': [
        { name: 'فرنسا', nameEn: 'France', nameAr: 'فرنسا', country: 'France', countryEn: 'France', countryAr: 'فرنسا', type: 'country', priority: 1 },
        { name: 'باريس', nameEn: 'Paris', nameAr: 'باريس', country: 'France', countryEn: 'France', countryAr: 'فرنسا', type: 'city', priority: 2 }
      ],
      'ألمانيا': [
        { name: 'ألمانيا', nameEn: 'Germany', nameAr: 'ألمانيا', country: 'Germany', countryEn: 'Germany', countryAr: 'ألمانيا', type: 'country', priority: 1 },
        { name: 'برلين', nameEn: 'Berlin', nameAr: 'برلين', country: 'Germany', countryEn: 'Germany', countryAr: 'ألمانيا', type: 'city', priority: 2 },
        { name: 'ميونخ', nameEn: 'Munich', nameAr: 'ميونخ', country: 'Germany', countryEn: 'Germany', countryAr: 'ألمانيا', type: 'city', priority: 3 }
      ],
      'جورجيا': [
        { name: 'جورجيا', nameEn: 'Georgia', nameAr: 'جورجيا', country: 'Georgia', countryEn: 'Georgia', countryAr: 'جورجيا', type: 'country', priority: 1 },
        { name: 'تبليسي', nameEn: 'Tbilisi', nameAr: 'تبليسي', country: 'Georgia', countryEn: 'Georgia', countryAr: 'جورجيا', type: 'city', priority: 2 },
        { name: 'باتومي', nameEn: 'Batumi', nameAr: 'باتومي', country: 'Georgia', countryEn: 'Georgia', countryAr: 'جورجيا', type: 'city', priority: 3 }
      ],
      'أذربيجان': [
        { name: 'أذربيجان', nameEn: 'Azerbaijan', nameAr: 'أذربيجان', country: 'Azerbaijan', countryEn: 'Azerbaijan', countryAr: 'أذربيجان', type: 'country', priority: 1 },
        { name: 'باكو', nameEn: 'Baku', nameAr: 'باكو', country: 'Azerbaijan', countryEn: 'Azerbaijan', countryAr: 'أذربيجان', type: 'city', priority: 2 }
      ],
      'المالديف': [
        { name: 'المالديف', nameEn: 'Maldives', nameAr: 'المالديف', country: 'Maldives', countryEn: 'Maldives', countryAr: 'المالديف', type: 'country', priority: 1 }
      ],
      'موريشيوس': [
        { name: 'موريشيوس', nameEn: 'Mauritius', nameAr: 'موريشيوس', country: 'Mauritius', countryEn: 'Mauritius', countryAr: 'موريشيوس', type: 'country', priority: 1 }
      ],
      'بولندا': [
        { name: 'بولندا', nameEn: 'Poland', nameAr: 'بولندا', country: 'Poland', countryEn: 'Poland', countryAr: 'بولندا', type: 'country', priority: 1 },
        { name: 'وارسو', nameEn: 'Warsaw', nameAr: 'وارسو', country: 'Poland', countryEn: 'Poland', countryAr: 'بولندا', type: 'city', priority: 2 },
        { name: 'كراكوف', nameEn: 'Krakow', nameAr: 'كراكوف', country: 'Poland', countryEn: 'Poland', countryAr: 'بولندا', type: 'city', priority: 3 }
      ]
    };
    
    // Check for matching patterns (first 3-4 characters)
    // Check both normalized (for English) and original (for Arabic)
    for (const [pattern, patternSuggestions] of Object.entries(patterns)) {
      const patternLower = pattern.toLowerCase();
      // Check if search term starts with pattern (for English) or contains pattern (for Arabic)
      if (
        normalized.startsWith(patternLower) || 
        originalTerm.includes(pattern) ||
        normalized.includes(patternLower)
      ) {
        suggestions.push(...patternSuggestions);
        break; // Use first matching pattern
      }
    }
    
    return suggestions;
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Autocomplete for destination field - only show after 3 characters (like Google)
    if (name === 'destination') {
      const trimmedValue = value.trim();
      if (trimmedValue.length >= 3) {
        const searchTerm = trimmedValue;
        const normalized = searchTerm.toLowerCase();
        const originalTerm = searchTerm; // Keep original for Arabic matching
        
        // Get smart suggestions first (Google-like patterns)
        const smartSuggestions = getSmartSuggestions(searchTerm);
        
        // Combine with regular destinations
        const allOptions = [...smartSuggestions, ...allDestinations];
        
        // Smart filtering and scoring - comprehensive search for ALL destinations
        const scored = allOptions.map(dest => {
          let score = 0;
          const normalize = (str) => str ? str.toLowerCase().trim() : '';
          
          // Check both normalized and original for better Arabic support
          const searchLower = normalized;
          const searchOriginal = originalTerm;
          
          // Exact match at start gets highest score (most relevant)
          if (normalize(dest.name).startsWith(searchLower)) score += 100;
          if (normalize(dest.nameEn).startsWith(searchLower)) score += 100;
          if (normalize(dest.nameAr).startsWith(searchLower)) score += 100;
          // Also check original term for Arabic
          if (dest.nameAr && dest.nameAr.includes(searchOriginal)) score += 100;
          if (dest.name && dest.name.includes(searchOriginal)) score += 100;
          
          // Exact match anywhere gets high score
          if (normalize(dest.name) === searchLower) score += 150;
          if (normalize(dest.nameEn) === searchLower) score += 150;
          if (normalize(dest.nameAr) === searchLower) score += 150;
          
          // Contains match gets lower score
          if (normalize(dest.name).includes(searchLower)) score += 50;
          if (normalize(dest.nameEn).includes(searchLower)) score += 50;
          if (normalize(dest.nameAr).includes(searchLower)) score += 50;
          // Also check original for Arabic
          if (dest.nameAr && dest.nameAr.includes(searchOriginal)) score += 50;
          
          // Country match
          if (normalize(dest.country).includes(searchLower)) score += 30;
          if (normalize(dest.countryEn).includes(searchLower)) score += 30;
          if (normalize(dest.countryAr).includes(searchLower)) score += 30;
          if (dest.countryAr && dest.countryAr.includes(searchOriginal)) score += 30;
          
          // Partial word match (for multi-word destinations)
          const nameWords = normalize(dest.name).split(/\s+/);
          const nameEnWords = normalize(dest.nameEn).split(/\s+/);
          const nameArWords = dest.nameAr ? dest.nameAr.split(/\s+/) : [];
          
          nameWords.forEach(word => {
            if (word.startsWith(searchLower)) score += 40;
            if (word.includes(searchLower)) score += 20;
          });
          nameEnWords.forEach(word => {
            if (word.startsWith(searchLower)) score += 40;
            if (word.includes(searchLower)) score += 20;
          });
          nameArWords.forEach(word => {
            if (word.includes(searchOriginal)) score += 40;
            if (word.includes(searchLower)) score += 20;
          });
          
          // Priority boost (lower number = higher priority)
          if (dest.priority) score += (6 - dest.priority) * 10;
          
          // Boost for countries over cities
          if (dest.type === 'country') score += 5;
          
          return { ...dest, score };
        }).filter(item => item.score > 0)
          .sort((a, b) => {
            // Sort by score (highest first), then by priority (lower first)
            if (b.score !== a.score) return b.score - a.score;
            return (a.priority || 999) - (b.priority || 999);
          })
          .slice(0, 10); // Get top 10 first, then filter to 5 unique
        
        // Remove duplicates
        const unique = [];
        const seen = new Set();
        scored.forEach(item => {
          const key = `${item.nameEn || ''}-${item.nameAr || ''}`;
          if (!seen.has(key) && key !== '-') {
            seen.add(key);
            unique.push(item);
          }
        });
        
        setSuggestions(unique.slice(0, 5));
        setShowSuggestions(unique.length > 0);
        setSelectedIndex(-1);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setFormData(prev => ({
      ...prev,
      destination: suggestion.name
    }));
    setShowSuggestions(false);
    setSuggestions([]);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSelectSuggestion(suggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!formData.destination || !formData.checkIn || !formData.checkOut) {
      alert(translations[language].findTheHotelDeals);
      return;
    }
    sendWhatsAppMessage(formData, 'hotel');
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-8 -mt-12 relative z-20 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{translations[language].bookYourHotel}</h2>
      
      <form onSubmit={handleSearch} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Destination */}
          <div className="lg:col-span-1 relative z-50">
            <label className="block text-sm font-medium text-gray-700 mb-2">{translations[language].destination}</label>
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  if (formData.destination.trim().length > 0 && suggestions.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                placeholder={language === 'ar' ? 'أين تريد الذهاب؟' : 'Where do you want to go?'}
                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                autoComplete="off"
              />
              <MapPin className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none ${language === 'ar' ? 'left-3' : 'right-3'}`} />
              
              {/* Autocomplete Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div
                  ref={suggestionsRef}
                  className="absolute z-[100] w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-auto"
                >
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={`${suggestion.nameEn}-${index}`}
                      type="button"
                      onClick={() => handleSelectSuggestion(suggestion)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full px-4 py-3 hover:bg-teal-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                        index === selectedIndex ? 'bg-teal-50' : ''
                      } ${language === 'ar' ? 'text-right' : 'text-left'}`}
                    >
                      <div className={`flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0" />
                        <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                          <div className="font-medium text-gray-900">{suggestion.name}</div>
                          {suggestion.type === 'city' && (
                            <div className="text-sm text-gray-500">{suggestion.country}</div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Check-in Date */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">{translations[language].checkIn}</label>
            <input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            />
          </div>

          {/* Check-out Date */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">{translations[language].checkOut}</label>
            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            />
          </div>

          {/* Rooms */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">{translations[language].rooms}</label>
            <select
              name="rooms"
              value={formData.rooms}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            >
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Guests */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">{translations[language].guests}</label>
            <select
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            >
              {[1, 2, 3, 4, 5, 6].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full md:w-48 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition transform hover:scale-105"
          >
            🔍 {translations[language].searchHotels}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelSearch;
