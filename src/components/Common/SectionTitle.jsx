export const SectionTitle = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`mb-8 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-600 text-lg">
          {subtitle}
        </p>
      )}
      <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded mt-4"></div>
    </div>
  );
};
