'use client';

import React, { useState } from 'react';
import { Button } from '@heroui/react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

export default function CustomNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: session,
    isPending,
    
  } = authClient.useSession();
  console.log(session,isPending);

  // Links as defined in the platform guidelines
  const navLinks = [
    {
      label: 'Home',
      href: '/',
      active: true, // Highlights the home button as seen in the mockup
    },
    {
      label: 'Browse Tasks',
      href: '/browse-tasks',
      active: false,
    },
    {
      label: 'Browse Freelancers',
      href: '/browse-freelancers',
      active: false,
    },
  ];

  return (
    <header className="w-full bg-white backdrop-blur-md sticky top-0 z-50 transition-all">
      {/* Container matching full-width layout parameters */}
      <div className="w-full max-w-[1440px] mx-auto h-20 px-6 sm:px-12 flex items-center justify-between">
        {/* Left: Brand logo section */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl tracking-tight select-none no-underline group"
        >
          <div className="bg-[#f59e0b] w-9 h-9 rounded-xl text-white flex items-center justify-center shadow-sm shadow-amber-500/20">
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
          <span className="text-[#e67e22] text-lg font-extrabold tracking-wide">
            TaskHive
          </span>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-[14px] font-semibold tracking-wide transition-colors no-underline ${
                  link.active
                    ? 'text-[#f59e0b]'
                    : 'text-[#7f8c8d] hover:text-[#f59e0b]'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Actions View incorporating requested button gradient */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/auth/login"
            className="text-[#555] hover:text-[#f59e0b] text-[14px] font-semibold transition-colors no-underline"
          >
            Sign In
          </Link>
          <Link href="/login">
            <Button
              radius="md"
              className="bg-gradient-to-r from-[#f39c12] to-[#e67e22] hover:from-[#e67e22] hover:to-[#d35400] text-white font-bold px-6 h-11 text-[14px] shadow-sm shadow-amber-500/20 transition-all border-none rounded-2xl"
            >
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile menu trigger toggle */}
        <div className="md:hidden flex items-center">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-500 hover:text-gray-800 focus:outline-none p-2 min-w-0 bg-transparent"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile responsive Dropdown overlay */}
      {isOpen && (
        <div className="absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-100 p-6 shadow-xl z-[999] flex flex-col gap-5 md:hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <ul className="flex flex-col gap-4 list-none m-0 p-0">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-base font-semibold block py-1 no-underline ${
                    link.active ? 'text-[#f59e0b]' : 'text-gray-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <hr className="border-gray-100 my-0" />
          <div className="flex flex-col gap-3 w-full">
            <Link
              href="/login"
              className="text-gray-600 text-[15px] font-semibold transition-colors no-underline text-center py-2"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/login"
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              <Button
                radius="md"
                className="w-full bg-gradient-to-r from-[#f39c12] to-[#e67e22] text-white font-bold h-11 text-[15px] border-none"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
