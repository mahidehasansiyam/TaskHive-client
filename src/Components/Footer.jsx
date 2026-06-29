'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Evaluates to 2026

  return (
    <footer className="w-full bg-[#fafafa] border-t border-gray-100 text-gray-600 font-sans mt-auto">
      {/* Top Section: Main Content Grid */}
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Column 1: Brand & Subtext */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl select-none no-underline"
          >
            <div className="bg-[#f59e0b] w-9 h-9 rounded-xl text-white flex items-center justify-center shadow-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="text-[#111111] text-lg font-extrabold tracking-wide">
              TaskHive
            </span>
          </Link>
          <p className="text-gray-400 text-[14px] leading-relaxed max-w-sm">
            Connect with skilled freelancers or find micro-tasks to grow your
            career.
          </p>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="text-gray-900 font-bold text-[15px] tracking-wide">
            Navigation
          </h4>
          <ul className="flex flex-col gap-3 list-none p-0 m-0">
            <li>
              <Link
                href="/"
                className="text-gray-400 hover:text-[#f59e0b] text-[14px] transition-colors no-underline"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/browse-tasks"
                className="text-gray-400 hover:text-[#f59e0b] text-[14px] transition-colors no-underline"
              >
                Browse Tasks
              </Link>
            </li>
            <li>
              <Link
                href="/browse-freelancers"
                className="text-gray-400 hover:text-[#f59e0b] text-[14px] transition-colors no-underline"
              >
                Freelancers
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="text-gray-400 hover:text-[#f59e0b] text-[14px] transition-colors no-underline"
              >
                Sign In
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="text-gray-900 font-bold text-[15px] tracking-wide">
            Contact
          </h4>
          <ul className="flex flex-col gap-3 list-none p-0 m-0 text-[14px] text-gray-400">
            <li>
              <a
                href="mailto:support@taskhive.com"
                className="hover:text-[#f59e0b] transition-colors no-underline text-gray-400"
              >
                support@taskhive.com
              </a>
            </li>
            <li>Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Column 4: Social Icons / Follow Us */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <h4 className="text-gray-900 font-bold text-[15px] tracking-wide">
            Follow Us
          </h4>
          <div className="flex items-center gap-3">
            {/* Modern X Icon Box */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700 hover:text-black hover:bg-gray-100 transition-colors"
            >
              <span className="font-extrabold text-[13px] font-mono">X</span>
            </a>
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700 hover:text-[#1877f2] hover:bg-gray-100 transition-colors"
            >
              <span className="font-bold text-[14px]">f</span>
            </a>
            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700 hover:text-[#0a66c2] hover:bg-gray-100 transition-colors"
            >
              <span className="font-semibold text-[13px]">in</span>
            </a>
            {/* GitHub */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700 hover:text-black hover:bg-gray-100 transition-colors"
            >
              <span className="font-bold text-[12px]">GH</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section: Separator and Copyright */}
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 pb-10">
        <div className="w-full border-t border-gray-100 pt-8 flex items-center justify-center text-center">
          <p className="text-gray-400 text-[13px] tracking-wide m-0">
            &copy; {currentYear} TaskHive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
