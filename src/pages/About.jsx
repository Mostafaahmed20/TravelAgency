import React from 'react';
import { Heart, Award, Users, Globe } from 'lucide-react';
import { useLanguage, translations } from '../context/LanguageContext';

const About = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Customer First',
      description: 'We prioritize your satisfaction in every interaction'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Quality Service',
      description: 'Premium experiences with attention to detail'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Expert Team',
      description: 'Professional travel consultants with years of experience'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Reach',
      description: 'Partnerships with destinations worldwide'
    },
  ];

  const team = [
    {
      name: 'John Smith',
      role: 'Founder & CEO',
      image: 'https://picsum.photos/300/300?random=51'
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of Operations',
      image: 'https://picsum.photos/300/300?random=52'
    },
    {
      name: 'Michael Chen',
      role: 'Travel Coordinator',
      image: 'https://picsum.photos/300/300?random=53'
    },
    {
      name: 'Emma Wilson',
      role: 'Customer Success Manager',
      image: 'https://picsum.photos/300/300?random=54'
    },
  ];

  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">{translations[language].aboutMilesTravel}</h1>
          <p className="text-xl text-gray-100">{translations[language].discoverTheWorld}</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">{translations[language].ourStory}</h2>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              TravelHub was founded with a simple mission: to make travel accessible, affordable, and unforgettable for everyone. We believe that everyone deserves to explore the world and create lasting memories.
            </p>
            <p>
              With our network of trusted partners and industry expertise, we've helped thousands of travelers book their perfect trips. From luxury vacations to budget-friendly adventures, we've got something for everyone.
            </p>
            <p>
              Our commitment to excellence and customer satisfaction drives us every day. We're constantly innovating to provide the best travel experience possible.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">{translations[language].ourValues}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="text-center p-6">
                <div className="flex justify-center mb-4 text-teal-600">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">{translations[language].meetOurTeam}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold mb-2">{member.name}</h3>
                  <p className="text-teal-600 font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <p className="text-gray-100">Happy Travelers</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <p className="text-gray-100">Destinations</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <p className="text-gray-100">Partners</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5 Years</div>
              <p className="text-gray-100">Experience</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
