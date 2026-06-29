'use client';

import React from 'react';

export default function Stats({ data }) {
  // Fallback defaults matching the mockup values in image_89ea49.png
  const stats = data || [
    { value: '2+', label: 'Tasks Posted' },
    { value: '6+', label: 'Users' },
    { value: '$90', label: 'Total Payout' },
  ];

  return (
    <section className="w-full bg- py-12 flex justify-center items-center">
      <div className="flex items-center justify-center gap-4 sm:gap-10 md:gap-14 select-none">
        {stats.map((stat, index) => (
          <React.Fragment key={index}>
            {/* Stat Item Card */}
            <div className="flex flex-col items-center text-center px-4 min-w-[100px] sm:min-w-[140px]">
              <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                {stat.value}
              </span>
              <span className="text-xs sm:text-[14px] text-gray-400 font-medium tracking-wide">
                {stat.label}
              </span>
            </div>

            {/* Subtle Divider between metric sections */}
            {index < stats.length - 1 && (
              <div
                className="h-12 w-[1px] bg-gray-100/80 self-center"
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
