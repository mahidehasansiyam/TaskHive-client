'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Features() {
  const features = [
    {
      title: 'Post Tasks Easily',
      description:
        'Describe your task, set a budget and deadline. Freelancers apply in minutes.',
      iconBg: 'bg-[#fffbeb]',
      iconBorder: 'border-[#fef3c7]',
      iconColor: 'text-[#d97706]',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
    {
      title: 'Find Top Talent',
      description:
        'Browse proposals from skilled freelancers. Compare budgets and timelines.',
      iconBg: 'bg-[#eff6ff]',
      iconBorder: 'border-[#dbeafe]',
      iconColor: 'text-[#2563eb]',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
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
      title: 'Secure Payments',
      description:
        'Pay only when the task is done. Funds are held safely until you approve.',
      iconBg: 'bg-[#ecfdf5]',
      iconBorder: 'border-[#d1fae5]',
      iconColor: 'text-[#059669]',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      title: 'Reviews & Ratings',
      description:
        'Build trust through honest reviews. Rate freelancers and get rated as a client.',
      iconBg: 'bg-[#f5f3ff]',
      iconBorder: 'border-[#ede9fe]',
      iconColor: 'text-[#7c3aed]',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ),
    },
    {
      title: 'Lightning Fast',
      description:
        'No complex bidding wars. Post a task, pick a freelancer, done.',
      iconBg: 'bg-[#fff7ed]',
      iconBorder: 'border-[#ffedd5]',
      iconColor: 'text-[#ea580c]',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
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
      title: 'Role-Based Access',
      description: 'Dedicated dashboards for clients, freelancers, and admins.',
      iconBg: 'bg-[#e0f7fa]',
      iconBorder: 'border-[#b2ebf2]',
      iconColor: 'text-[#00acc1]',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full py-24 px-6 relative overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col items-center">
        {/* Top Header Label */}
        <motion.span 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#f59e0b] font-extrabold text-[13px] tracking-[0.15em] uppercase mb-4"
        >
          Features
        </motion.span>

        {/* Section Heading with Custom Gradient Accent */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gray-900 dark:text-white font-extrabold text-4xl sm:text-[44px] tracking-tight mb-20 text-center leading-tight"
        >
          Everything you need to{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f59e0b] to-[#ea580c]">
            succeed
          </span>
        </motion.h2>

        {/* 3x2 Grid for Desktop, Single Column for Mobile */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl"
        >
          {features.map((feature, index) => (
            <motion.div
              variants={{ hidden: { opacity: 0, scale: 0.95, y: 20 }, show: { opacity: 1, scale: 1, y: 0 } }}
              key={index}
              className="bg-[#fbfbfb] dark:bg-gray-800/60 backdrop-blur-sm border border-gray-100/70 dark:border-gray-700/60 p-8 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(245,158,11,0.1)] transition-all duration-300 flex flex-col items-start text-left group hover:-translate-y-2"
            >
              {/* Feature Icon Container with Soft Border Pill Framing */}
              <div
                className={`w-12 h-12 rounded-[16px] border ${feature.iconBg} ${feature.iconBorder} ${feature.iconColor} flex items-center justify-center mb-6 select-none shadow-sm transition-transform duration-300 group-hover:scale-110`}
              >
                {feature.icon}
              </div>

              {/* Feature Title */}
              <h3 className="text-gray-900 dark:text-white font-bold text-[18px] tracking-tight mb-3">
                {feature.title}
              </h3>

              {/* Feature Description Paragraph */}
              <p className="text-gray-400 dark:text-gray-400 text-[14px] leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
