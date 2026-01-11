import React from 'react';

export const SectionTitle = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`mb-10 ${className}`}>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-600 text-base md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
};
