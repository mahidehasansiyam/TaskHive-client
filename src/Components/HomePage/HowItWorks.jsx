'use client';

import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Post a Task',
      description: 'Describe what you need, set your budget and deadline.',
      gradient: 'from-[#ff9f00] to-[#ff6600]',
      shadow: 'shadow-[0_10px_20px_rgba(255,102,0,0.2)]',
    },
    {
      number: '02',
      title: 'Get Proposals',
      description: 'Review proposals from freelancers and pick the best fit.',
      gradient: 'from-[#00c6ff] to-[#0072ff]', // Exact vibrant teal-to-blue gradient
      styleOverride: {
        background: 'linear-gradient(135deg, #00cb97 0%, #00a896 100%)',
      }, // Matching image color
      shadow: 'shadow-[0_10px_20px_rgba(0,168,150,0.2)]',
    },
    {
      number: '03',
      title: 'Hire and Pay',
      description: 'Approve the work, make secure payment, and leave a review.',
      gradient: 'from-[#4facfe] to-[#00f2fe]',
      styleOverride: {
        background: 'linear-gradient(135deg, #4d7cff 0%, #3b50ff 100%)',
      }, // Matching image blue
      shadow: 'shadow-[0_10px_20px_rgba(77,124,255,0.2)]',
    },
  ];

  return (
    <section className="w-full  py-20 px-6 relative overflow-hidden">
      {/* Container matching full-width section parameters */}
      <div className="w-full max-w-[1440px] mx-auto flex flex-col items-center">
        {/* Top Tagline */}
        <span className="text-[#f59e0b] font-extrabold text-[13px] tracking-[0.15em] uppercase mb-4">
          How It Works
        </span>

        {/* Main Section Title */}
        <h2 className="text-gray-900 font-extrabold text-4xl sm:text-[44px] tracking-tight mb-20 text-center">
          Three simple steps
        </h2>

        {/* Steps Grid Wrapper */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
          {/* Decorative Horizontal Connector Line (Hidden on mobile viewports) */}
          <div
            className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[1px] bg-gray-100/70 z-0"
            aria-hidden="true"
          />

          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center relative z-10 px-4"
            >
              {/* Rounded Corner Gradient Number Block */}
              <div
                style={step.styleOverride || {}}
                className={`w-[72px] h-[72px] rounded-[22px] flex items-center justify-center text-white font-extrabold text-2xl tracking-wide bg-gradient-to-br ${step.gradient} ${step.shadow} mb-8 select-none`}
              >
                {step.number}
              </div>

              {/* Title Text */}
              <h3 className="text-gray-900 font-bold text-[19px] tracking-tight mb-3">
                {step.title}
              </h3>

              {/* Description Body Paragraph */}
              <p className="text-gray-400 text-[14px] leading-relaxed max-w-[280px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
