import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
        ✈️
      </div>
      <span className="hidden md:block font-bold text-lg text-gray-800">
        MILES<span className="text-teal-600"> TRAVEL</span>
      </span>
    </Link>
  );
};

export default Logo;
