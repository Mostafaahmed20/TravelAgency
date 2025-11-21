// Travel Agency Main Application
const { useState } = React;

// Simple Icon Components
const Icon = ({ name, ...props }) => {
    const icons = {
        phone: React.createElement('svg', { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, React.createElement('path', { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" })),
        globe: React.createElement('svg', { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }),
        star: React.createElement('svg', { ...props, viewBox: "0 0 24 24", fill: "currentColor", stroke: "currentColor", strokeWidth: "2" }),
        mapPin: React.createElement('svg', { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }),
        clock: React.createElement('svg', { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }),
        chevronDown: React.createElement('svg', { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" })
    };
    return icons[name] || null;
};

function TravelAgency() {
    const [currentPage, setCurrentPage] = useState('home');
    const [searchType, setSearchType] = useState('flights');
    const [language, setLanguage] = useState('ar');
    const [formData, setFormData] = useState({
        from: '', to: '', departure: '', return: '', passengers: '1',
        checkIn: '', checkOut: '', rooms: '1'
    });

    const whatsappNumber = '966501234567';

    const translations = {
        ar: {
            planTrip: 'خطط عطلتك الجاية',
            subtitle: 'اختر من بين أكثر من 1.5 مليون فندق و 450 شركة طيران',
            flights: 'طيران', hotels: 'فنادق', packages: 'رحلات منظمة', activities: 'أنشطة',
            from: 'من', to: 'إلى', departure: 'تاريخ المغادرة', return: 'تاريخ العودة',
            checkIn: 'تاريخ الدخول', checkOut: 'تاريخ المغادرة', passengers: 'مسافرين', rooms: 'غرف',
            search: 'بحث', login: 'تسجيل الدخول', bookNow: 'احجز الآن', backHome: 'العودة للرئيسية',
            specialOffers: 'عروض مميزة متنا لك', activitiesTitle: 'الأنشطة والتجارب السياحية',
            packagesTitle: 'الرحلات المنظمة', destination: 'الوجهة'
        },
        en: {
            planTrip: 'Plan Your Next Trip',
            subtitle: 'Choose from over 1.5 million hotels and 450 airlines',
            flights: 'Flights', hotels: 'Hotels', packages: 'Packages', activities: 'Activities',
            from: 'From', to: 'To', departure: 'Departure', return: 'Return',
            checkIn: 'Check-in', checkOut: 'Check-out', passengers: 'Passengers', rooms: 'Rooms',
            search: 'Search', login: 'Login', bookNow: 'Book Now', backHome: 'Back to Home',
            specialOffers: 'Special Offers for You', activitiesTitle: 'Activities & Experiences',
            packagesTitle: 'Travel Packages', destination: 'Destination'
        }
    };

    const t = translations[language];
    const isRTL = language === 'ar';

    const activities = [
        { id: 1, title: { ar: 'جولة في برج خليفة', en: 'Burj Khalifa Tour' }, location: { ar: 'دبي', en: 'Dubai' }, price: '245', rating: 4.8, reviews: 2847, image: '🏙️' },
        { id: 2, title: { ar: 'رحلة سفاري صحراوية', en: 'Desert Safari' }, location: { ar: 'أبوظبي', en: 'Abu Dhabi' }, price: '189', rating: 4.9, reviews: 1523, image: '🏜️' },
        { id: 3, title: { ar: 'دخول أكواريوم دبي', en: 'Dubai Aquarium' }, location: { ar: 'دبي', en: 'Dubai' }, price: '165', rating: 4.7, reviews: 3201, image: '🐠' },
        { id: 4, title: { ar: 'جولة في متحف اللوفر', en: 'Louvre Museum' }, location: { ar: 'أبوظبي', en: 'Abu Dhabi' }, price: '225', rating: 4.9, reviews: 987, image: '🖼️' },
        { id: 5, title: { ar: 'رحلة بالمنطاد', en: 'Hot Air Balloon' }, location: { ar: 'دبي', en: 'Dubai' }, price: '890', rating: 5.0, reviews: 456, image: '🎈' },
        { id: 6, title: { ar: 'ياس ووتروورلد', en: 'Yas Waterworld' }, location: { ar: 'أبوظبي', en: 'Abu Dhabi' }, price: '280', rating: 4.8, reviews: 2156, image: '🌊' }
    ];

    const packages = [
        { id: 1, title: { ar: 'جدة - البحر الأحمر', en: 'Jeddah Red Sea' }, duration: { ar: '3 أيام / 2 ليالي', en: '3 Days / 2 Nights' }, price: '899', image: '🏖️' },
        { id: 2, title: { ar: 'باريس - مدينة النور', en: 'Paris City of Lights' }, duration: { ar: '5 أيام / 4 ليالي', en: '5 Days / 4 Nights' }, price: '3,499', image: '🗼' },
        { id: 3, title: { ar: 'دبي - مدينة المستقبل', en: 'Dubai City of Future' }, duration: { ar: '4 أيام / 3 ليالي', en: '4 Days / 3 Nights' }, price: '1,899', image: '🌆' }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = () => {
        if (searchType === 'flights') {
            if (!formData.from || !formData.to || !formData.departure) {
                alert(isRTL ? 'يرجى ملء جميع التفاصيل' : 'Please fill all details');
                return;
            }
            sendToWhatsApp(`Flight Request: From ${formData.from} to ${formData.to}, Departure: ${formData.departure}, Passengers: ${formData.passengers}`);
        } else {
            if (!formData.to || !formData.checkIn || !formData.checkOut) {
                alert(isRTL ? 'يرجى ملء جميع التفاصيل' : 'Please fill all details');
                return;
            }
            sendToWhatsApp(`Hotel Request: ${formData.to}, Check-in: ${formData.checkIn}, Check-out: ${formData.checkOut}, Rooms: ${formData.rooms}`);
        }
    };

    const sendToWhatsApp = (message) => {
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return React.createElement('div', { className: 'min-h-screen bg-white', dir: isRTL ? 'rtl' : 'ltr' },
        React.createElement('div', { className: 'bg-teal-900 text-white py-2 px-6' },
            React.createElement('div', { className: 'max-w-7xl mx-auto flex justify-between items-center text-xs' },
                React.createElement('div', { className: `flex gap-4 items-center ${isRTL ? '' : 'order-2'}` },
                    React.createElement('button', { className: 'border border-white px-4 py-1 rounded-full hover:bg-teal-800' }, t.login),
                    React.createElement('a', { href: '#', className: 'hover:text-teal-200 flex items-center gap-1' }, '+966554400000'),
                    React.createElement('button', { onClick: () => setLanguage(language === 'ar' ? 'en' : 'ar'), className: 'hover:text-teal-200' }, language === 'ar' ? 'English' : 'عربي')
                ),
                React.createElement('div', { className: `text-xl font-bold ${isRTL ? '' : 'order-1'}` }, 'المسافر')
            )
        ),
        React.createElement('nav', { className: 'bg-teal-900 text-white py-3 px-6 border-t border-teal-800' },
            React.createElement('div', { className: `max-w-7xl mx-auto flex ${isRTL ? 'justify-end' : 'justify-start'} gap-8` },
                React.createElement('button', { onClick: () => setCurrentPage('home'), className: 'hover:text-teal-200' }, t.flights),
                React.createElement('button', { onClick: () => setCurrentPage('home'), className: 'hover:text-teal-200' }, t.hotels),
                React.createElement('button', { onClick: () => setCurrentPage('activities'), className: 'hover:text-teal-200' }, t.activities),
                React.createElement('button', { onClick: () => setCurrentPage('packages'), className: 'hover:text-teal-200' }, t.packages)
            )
        ),
        currentPage === 'home' && React.createElement(React.Fragment, {},
            React.createElement('section', { className: 'bg-gradient-to-b from-teal-600 to-teal-700 text-white py-20 px-6' },
                React.createElement('div', { className: 'max-w-7xl mx-auto' },
                    React.createElement('h1', { className: `text-5xl font-bold mb-3 ${isRTL ? 'text-right' : 'text-left'}` }, t.planTrip),
                    React.createElement('p', { className: `text-teal-100 text-xl mb-8 ${isRTL ? 'text-right' : 'text-left'}` }, t.subtitle),
                    React.createElement('div', { className: 'bg-white text-gray-800 rounded-xl shadow-2xl overflow-hidden' },
                        React.createElement('div', { className: 'flex bg-gray-50 border-b' },
                            ['flights', 'hotels'].map(tab =>
                                React.createElement('button', { key: tab, onClick: () => setSearchType(tab), className: `flex-1 py-4 font-semibold ${searchType === tab ? 'bg-white text-teal-600 border-b-2 border-teal-600' : 'text-gray-600'}` },
                                    (tab === 'flights' ? '✈️' : '🏨') + ' ' + t[tab]
                                )
                            )
                        ),
                        React.createElement('div', { className: 'p-6' },
                            React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-5 gap-4 mb-4' },
                                searchType === 'flights' ? 
                                    [
                                        React.createElement('input', { key: 'from', type: 'text', name: 'from', placeholder: t.from, value: formData.from, onChange: handleInputChange, className: 'px-4 py-3 border rounded-lg' }),
                                        React.createElement('input', { key: 'to', type: 'text', name: 'to', placeholder: t.to, value: formData.to, onChange: handleInputChange, className: 'px-4 py-3 border rounded-lg' }),
                                        React.createElement('input', { key: 'dep', type: 'date', name: 'departure', value: formData.departure, onChange: handleInputChange, className: 'px-4 py-3 border rounded-lg' }),
                                        React.createElement('input', { key: 'ret', type: 'date', name: 'return', value: formData.return, onChange: handleInputChange, className: 'px-4 py-3 border rounded-lg' }),
                                        React.createElement('select', { key: 'pass', name: 'passengers', value: formData.passengers, onChange: handleInputChange, className: 'px-4 py-3 border rounded-lg' },
                                            [1,2,3,4,5,6].map(n => React.createElement('option', { key: n }, n))
                                        )
                                    ]
                                    :
                                    [
                                        React.createElement('input', { key: 'dest', type: 'text', name: 'to', placeholder: t.destination, value: formData.to, onChange: handleInputChange, className: 'px-4 py-3 border rounded-lg col-span-2' }),
                                        React.createElement('input', { key: 'cin', type: 'date', name: 'checkIn', value: formData.checkIn, onChange: handleInputChange, className: 'px-4 py-3 border rounded-lg' }),
                                        React.createElement('input', { key: 'cout', type: 'date', name: 'checkOut', value: formData.checkOut, onChange: handleInputChange, className: 'px-4 py-3 border rounded-lg' }),
                                        React.createElement('select', { key: 'rooms', name: 'rooms', value: formData.rooms, onChange: handleInputChange, className: 'px-4 py-3 border rounded-lg' },
                                            [1,2,3,4,5].map(n => React.createElement('option', { key: n }, n))
                                        )
                                    ]
                            ),
                            React.createElement('button', { onClick: handleSearch, className: 'w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg' },
                                '🔍 ' + t.search
                            )
                        )
                    )
                )
            ),
            React.createElement('section', { className: 'py-16 px-6 bg-gray-50' },
                React.createElement('div', { className: 'max-w-7xl mx-auto' },
                    React.createElement('h2', { className: `text-3xl font-bold mb-8 ${isRTL ? 'text-right' : 'text-left'}` }, t.specialOffers),
                    React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-6' },
                        packages.map(pkg =>
                            React.createElement('div', { key: pkg.id, className: 'bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition' },
                                React.createElement('div', { className: 'h-48 bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-7xl' }, pkg.image),
                                React.createElement('div', { className: 'p-5' },
                                    React.createElement('h3', { className: `text-xl font-bold mb-2 ${isRTL ? 'text-right' : 'text-left'}` }, pkg.title[language]),
                                    React.createElement('p', { className: `text-gray-600 text-sm mb-4 ${isRTL ? 'text-right' : 'text-left'}` }, pkg.duration[language]),
                                    React.createElement('div', { className: 'flex justify-between items-center' },
                                        React.createElement('button', { onClick: () => sendToWhatsApp(`Interested in: ${pkg.title[language]}`), className: 'bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-semibold' }, t.bookNow),
                                        React.createElement('span', { className: 'text-2xl font-bold text-teal-600' }, pkg.price)
                                    )
                                )
                            )
                        )
                    )
                )
            )
        ),
        currentPage === 'activities' && React.createElement('div', { className: 'bg-gray-50 min-h-screen py-12 px-6' },
            React.createElement('div', { className: 'max-w-7xl mx-auto' },
                React.createElement('button', { onClick: () => setCurrentPage('home'), className: 'text-teal-600 mb-4' }, (isRTL ? '→' : '←') + ' ' + t.backHome),
                React.createElement('h1', { className: `text-4xl font-bold mb-8 ${isRTL ? 'text-right' : 'text-left'}` }, t.activitiesTitle),
                React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-6' },
                    activities.map(activity =>
                        React.createElement('div', { key: activity.id, className: 'bg-white rounded-xl shadow-lg overflow-hidden' },
                            React.createElement('div', { className: 'h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-7xl' }, activity.image),
                            React.createElement('div', { className: 'p-5' },
                                React.createElement('div', { className: `flex gap-2 mb-2 ${isRTL ? 'justify-end' : 'justify-start'}` },
                                    React.createElement('span', { className: 'text-sm' }, `(${activity.reviews})`),
                                    React.createElement('span', { className: 'font-bold' }, activity.rating),
                                    '⭐'
                                ),
                                React.createElement('h3', { className: `text-lg font-bold mb-2 ${isRTL ? 'text-right' : 'text-left'}` }, activity.title[language]),
                                React.createElement('p', { className: `text-sm text-gray-600 mb-4 ${isRTL ? 'text-right' : 'text-left'}` },
                                    '📍 ' + activity.location[language]
                                ),
                                React.createElement('div', { className: 'flex justify-between items-center' },
                                    React.createElement('button', { onClick: () => sendToWhatsApp(`Book: ${activity.title[language]}`), className: 'bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-semibold' }, t.bookNow),
                                    React.createElement('span', { className: 'text-xl font-bold text-teal-600' }, activity.price)
                                )
                            )
                        )
                    )
                )
            )
        ),
        currentPage === 'packages' && React.createElement('div', { className: 'bg-gray-50 min-h-screen py-12 px-6' },
            React.createElement('div', { className: 'max-w-7xl mx-auto' },
                React.createElement('button', { onClick: () => setCurrentPage('home'), className: 'text-teal-600 mb-4' }, (isRTL ? '→' : '←') + ' ' + t.backHome),
                React.createElement('h1', { className: `text-4xl font-bold mb-8 ${isRTL ? 'text-right' : 'text-left'}` }, t.packagesTitle),
                React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-6' },
                    packages.map(pkg =>
                        React.createElement('div', { key: pkg.id, className: 'bg-white rounded-xl shadow-lg overflow-hidden' },
                            React.createElement('div', { className: 'h-52 bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-7xl' }, pkg.image),
                            React.createElement('div', { className: 'p-5' },
                                React.createElement('h3', { className: `text-xl font-bold mb-2 ${isRTL ? 'text-right' : 'text-left'}` }, pkg.title[language]),
                                React.createElement('p', { className: `text-gray-600 text-sm mb-4 ${isRTL ? 'text-right' : 'text-left'}` },
                                    '🕐 ' + pkg.duration[language]
                                ),
                                React.createElement('div', { className: 'flex justify-between items-center pt-4 border-t' },
                                    React.createElement('button', { onClick: () => sendToWhatsApp(`Book: ${pkg.title[language]}`), className: 'bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg text-sm font-semibold' }, t.bookNow),
                                    React.createElement('span', { className: 'text-2xl font-bold text-teal-600' }, pkg.price)
                                )
                            )
                        )
                    )
                )
            )
        ),
        React.createElement('footer', { className: 'bg-gray-100 py-12 px-6' },
            React.createElement('div', { className: 'max-w-7xl mx-auto text-center' },
                React.createElement('p', { className: 'text-sm text-gray-600' }, `© 2025 ${language === 'ar' ? 'المسافر - جميع الحقوق محفوظة' : 'Almosafer - All Rights Reserved'}`)
            )
        )
    );
}

ReactDOM.render(React.createElement(TravelAgency), document.getElementById('root'));
