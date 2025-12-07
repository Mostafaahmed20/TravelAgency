import React from 'react';

export const SectionTitle = ({ title, subtitle, className = '', center = false }) => {
  return (
    <div className={`mb-10 ${center ? 'text-center' : ''} ${className}`}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
