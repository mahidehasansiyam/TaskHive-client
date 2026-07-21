'use client';

import React from 'react';
import { Button } from '@heroui/react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { BeatLoader } from 'react-spinners';
import { motion } from 'framer-motion';

export default function HeroSection() {

  const {
    data: session,
    isPending,
  } = authClient.useSession(); 
 
  const user = session?.user;

  return (
    <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center bg-[#fafafa] dark:bg-gray-950 px-6 overflow-hidden">
      {/* Animated Background radial gradient mesh */}
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 pointer-events-none mix-blend-multiply dark:mix-blend-screen"
        style={{
          background:
            'radial-gradient(circle at 10% 20%, rgba(245, 158, 11, 0.15) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(234, 88, 12, 0.1) 0%, transparent 50%)',
        }}
      />


      {/* Main Content Content Layout Wrapper */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Top Badge: "The modern freelance platform" */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#f59d051f] dark:bg-amber-500/10 border border-amber-200/60 dark:border-amber-700/40 rounded-full mb-8 shadow-sm"
        >
          <svg className="w-3.5 h-3.5 text-[#f59e0b]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.812 11.238L12 3.25l2.188 7.988H22l-6.313 4.587L18.125 23.5 12 18.913 5.875 23.5l2.438-7.675L2 11.238h7.812z" />
          </svg>
          <span className="text-[#db8727] dark:text-amber-400 text-[13px] font-semibold tracking-wide">
            The modern freelance platform
          </span>
        </motion.div>
        
        {/* Dynamic Typography Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-[72px] font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-6 select-none"
        >
          Get your tasks done <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f59e0b] to-[#ea580c]">
            <span className="text-black dark:text-gray-200">by</span> skilled freelancers
          </span>
        </motion.h1>

        {/* Subtitle Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed mb-10 tracking-wide font-medium"
        >
          TaskHive connects clients with skilled freelancers for micro-tasks.
          Post, propose, pay — all in one seamless platform.
        </motion.p>

        {/* Action Triggers Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          {isPending ? (
            <div>
              <BeatLoader size={20} color="#f39c12" />
            </div>
          ) : session?.user?.role === 'client' ? (
            <Link href="/dashboard/client/tasks/new" className="w-full sm:w-auto no-underline">
              <Button radius="xl" className="w-full sm:w-auto bg-gradient-to-r from-[#f59e0b] to-[#ea580c] text-white font-bold px-8 h-14 text-[15px] shadow-lg shadow-orange-500/30 border-none flex items-center justify-center gap-2 group rounded-2xl transition-transform hover:scale-105">
                <span>Post a Task</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Button>
            </Link>
          ) : session?.user?.role === 'freelancer' ? (
            <Link href="/tasks" className="w-full sm:w-auto no-underline">
              <Button radius="xl" className="w-full sm:w-auto bg-gradient-to-r from-[#f59e0b] to-[#ea580c] text-white font-bold px-8 h-14 text-[15px] shadow-lg shadow-orange-500/30 border-none flex items-center justify-center gap-2 group rounded-2xl transition-transform hover:scale-105">
                <span>Browse Tasks</span>
                <svg className="w-3.5 h-3.5 text-white transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </Link>
          ) : (
             <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
               <Link href="/auth/register" className="w-full sm:w-auto no-underline">
                 <Button radius="xl" className="w-full sm:w-auto bg-gradient-to-r from-[#f59e0b] to-[#ea580c] text-white font-bold px-8 h-14 text-[15px] shadow-lg shadow-orange-500/30 border-none flex items-center justify-center gap-2 group rounded-2xl transition-transform hover:scale-105">
                   <span>Get Started</span>
                   <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                   </svg>
                 </Button>
               </Link>
               <Link href="/tasks" className="w-full sm:w-auto no-underline">
                 <Button radius="xl" variant="flat" className="w-full sm:w-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-900 dark:text-white font-bold px-8 h-14 text-[15px] shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center gap-2 group rounded-2xl transition-transform hover:scale-105">
                   <span>Browse Tasks</span>
                 </Button>
               </Link>
             </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
