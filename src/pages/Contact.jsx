import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useLanguage, translations } from '../context/LanguageContext';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const whatsappMessage = `📧 CONTACT FORM SUBMISSION\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone || 'Not provided'}\n` +
      `Subject: ${formData.subject}\n\n` +
      `Message:\n${formData.message}`;
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/201515196284?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      titleKey: 'phone',
      details: '015 1519628',
      link: 'https://wa.me/201515196284'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      titleKey: 'email',
      details: 'Reservations@miles-travel.com',
      link: 'mailto:Reservations@miles-travel.com'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      titleKey: 'address',
      details: '1 Moustafa El Nahas, Nasr City, Cairo, Egypt',
      link: 'https://maps.google.com/?q=1+Moustafa+El+Nahas+Nasr+City+Cairo+Egypt'
    },
  ];

  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-600 via-teal-500 to-blue-600 text-white py-20 px-4 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/30">
              {language === 'ar' ? 'تواصل معنا' : 'Get in Touch'}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {translations[language].getInTouch}
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
            {translations[language].contactInformation}
          </p>
        </div>
        
        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 text-gray-50" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,100 350,0 500,50 C650,100 850,0 1000,50 L1200,50 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8">{translations[language].contactInformation}</h2>

              <div className="space-y-6 mb-12">
                {contactInfo.map((info, idx) => (
                  <a
                    key={idx}
                    href={info.link}
                    className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition"
                  >
                    <div className="text-teal-600 flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{translations[language][info.titleKey]}</h3>
                      <p className="text-gray-600">{info.details}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* FAQ */}
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-4">{translations[language].frequentlyAskedQuestions}</h3>
                <div className="space-y-4 text-sm text-gray-600">
                  <div>
                    <p className="font-bold text-gray-800 mb-1">{translations[language].businessHoursQ}</p>
                    <p>{translations[language].businessHoursA}</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 mb-1">{translations[language].refundsQ}</p>
                    <p>{translations[language].refundsA}</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 mb-1">{translations[language].modifyBookingQ}</p>
                    <p>{translations[language].modifyBookingA}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-8">{translations[language].sendMessage}</h2>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="text-green-600 text-4xl mb-3">✓</div>
                  <h3 className="text-lg font-bold text-green-800 mb-2">{translations[language].messageSentTitle}</h3>
                  <p className="text-green-700">{translations[language].messageSentBody}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translations[language].fullName}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {translations[language].emailAddress}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {translations[language].phoneNumber}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                        placeholder="+966 50 1234567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translations[language].subject}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                      placeholder={language === 'ar' ? 'كيف يمكننا مساعدتك؟' : 'How can we help?'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translations[language].message}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition resize-none"
                      placeholder={language === 'ar' ? 'أخبرنا المزيد عن استفسارك...' : 'Tell us more about your inquiry...'}
                    />
                  </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2"
                    >
                      <Send size={20} />
                      {translations[language].sendMessage}
                    </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">{translations[language].findUsOnMap}</h2>
          <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.2635289936!2d31.32845!3d30.05891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583f4d1e2a8d0f%3A0x7e9b9e9e8e8e8e8e!2s1%20Moustafa%20El%20Nahas%2C%20Nasr%20City%2C%20Cairo%20Governorate%2C%20Egypt!5e0!3m2!1sen!2s!4v1732800000000!5m2!1sen!2s"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Miles Travel Location - 1 Moustafa El Nahas, Nasr City, Cairo, Egypt"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
