'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Categories() {
  const categories = [
    {
      label: 'Design',
      href: '#',
      bgColor: 'bg-[#f5ebff]',
      borderColor: 'border-[#ebd6ff]',
      textColor: 'text-[#b966ff]',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
    },
    {
      label: 'Writing',
      href: '#',
      bgColor: 'bg-[#e6f0ff]',
      borderColor: 'border-[#cce0ff]',
      textColor: 'text-[#3b82f6]',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      label: 'Development',
      href: '#',
      bgColor: 'bg-[#fdf2e2]',
      borderColor: 'border-[#fbe3c3]',
      textColor: 'text-[#f59e0b]',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      label: 'Marketing',
      href: '#',
      bgColor: 'bg-[#e6f7f0]',
      borderColor: 'border-[#ccf0e1]',
      textColor: 'text-[#10b981]',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      label: 'Other',
      href: '#',
      bgColor: 'bg-[#e1f5fa]',
      borderColor: 'border-[#cbebf2]',
      textColor: 'text-[#06b6d4]',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full py-20 px-6 relative overflow-hidden bg-white dark:bg-gray-900">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col items-center">
        {/* Top Header Label */}
        <motion.span 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#f59e0b] font-extrabold text-[13px] tracking-[0.15em] uppercase mb-4"
        >
          Categories
        </motion.span>

        {/* Section Heading */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gray-900 dark:text-white font-extrabold text-4xl sm:text-[44px] tracking-tight mb-16 text-center"
        >
          Popular Categories
        </motion.h2>

        {/* Responsive Grid System */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 max-w-6xl"
        >
          {categories.map((category, index) => (
            <motion.div key={index} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
              <Link
                href={category.href}
                className={`group flex flex-col items-center justify-center py-10 px-4 rounded-[22px] border ${category.bgColor} ${category.borderColor} ${category.textColor} dark:bg-gray-800/40 dark:border-gray-700/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(245,158,11,0.15)] select-none no-underline text-center relative overflow-hidden`}
              >
                {/* Glassmorphism shine effect on hover */}
                <div className="absolute inset-0 bg-white/40 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Graphic Icon Wrapper */}
                <div className="mb-4 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>

                {/* Title Identity */}
                <span className="font-bold text-[16px] tracking-tight relative z-10 dark:text-gray-200">
                  {category.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
