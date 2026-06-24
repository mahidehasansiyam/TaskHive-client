'use client';

import React from 'react';
import { Button } from '@heroui/react';
import Link from 'next/link';

export default function GetStart() {
  return (
    <section className="w-full  py-16 px-6 relative overflow-hidden">
      {/* Central Card Wrapper with subtle ambient aura glow */}
      <div className="w-full max-w-5xl mx-auto rounded-[32px] border border-orange-100/70 bg-gradient-to-b from-[#fffbf4] to-[#ffffff] p-12 sm:p-16 text-center relative overflow-hidden shadow-[0_10px_40px_rgba(245,158,11,0.03)]">
        {/* Abstract structural glow elements matching the backdrop of image_8a57e3.jpg */}
        <div
          className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-gradient-to-br from-[#f59e0b]/5 to-transparent blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-tl from-[#ea580c]/5 to-transparent blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Content Container */}
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          {/* Main Title Heading */}
          <h2 className="text-gray-900 font-extrabold text-3xl sm:text-[40px] tracking-tight mb-4 leading-tight">
            Ready to get started?
          </h2>

          {/* Descriptive Subtext */}
          <p className="text-gray-400 text-sm sm:text-[15px] font-medium leading-relaxed max-w-md mb-8">
            Join TaskHive today and start posting tasks or finding work. Free to
            sign up.
          </p>

          {/* Action Button styled explicitly to match image_8a57e3.jpg */}
          <Link href="/register" className="no-underline w-full sm:w-auto">
            <Button
              radius="xl"
              className="w-full sm:w-auto bg-gradient-to-r from-[#f59e0b] to-[#ea580c] hover:from-[#ea580c] hover:to-[#d97706] text-white font-bold px-8 h-14 text-[15px] shadow-[0_10px_25px_rgba(234,88,12,0.3)] border-none transition-all duration-200 flex items-center justify-center gap-2 group rounded-2xl"
            >
              <span>Create Your Account</span>
              {/* Arrow Indicator Icon */}
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
