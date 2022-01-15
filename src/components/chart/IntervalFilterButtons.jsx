import React, { useState } from 'react';
import { INTERVAL_FILTERS } from './constants';

export const IntervalFilterButtons = ({ initialFiltersValue, onChange }) => {
  const [filter, setFilter] = useState(initialFiltersValue);

  const setCurrentFilter = (e) => {
    const intervalValue = INTERVAL_FILTERS[e.target.textContent];
    setFilter(intervalValue);
    onChange(intervalValue);
  };

  return (
    <div aria-label="buttons to select time interval" className="flex gap-2 flex-wrap">
      {Object.keys(INTERVAL_FILTERS).map((t) => {
        return (
          <button
            key={t}
            onClick={(e) => setCurrentFilter(e)}
            className={`p-2 blue-glassmorphism text-white px-5 ${
              INTERVAL_FILTERS[t] === filter && 'bg-gray-700'
            }`}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
};

export default IntervalFilterButtons;
