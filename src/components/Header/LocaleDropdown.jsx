import React, { useState, useRef, useEffect } from 'react';

const LocaleDropdown = ({ value, options = [], onChange, label }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const selected = options.find(o => o.value === value) || options[0];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 bg-white bg-opacity-10 text-white px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-sm">{selected?.flag}</span>
        <span className="text-sm font-medium">{selected?.label}</span>
        <svg className={`w-3 h-3 ml-1 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50"
        >
          {options.map(opt => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 ${opt.value === value ? 'bg-gray-100' : ''}`}
            >
              <span className="text-lg">{opt.flag}</span>
              <div className="flex-1 text-sm">
                <div className="font-medium text-gray-800">{opt.label}</div>
                {opt.subtitle && <div className="text-xs text-gray-500">{opt.subtitle}</div>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocaleDropdown;
