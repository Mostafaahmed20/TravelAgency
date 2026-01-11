import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <span className="font-bold text-lg sm:text-xl text-gray-800">
        MILES<span className="text-teal-600"> TRAVEL</span>
      </span>
    </Link>
  );
};

export default Logo;
