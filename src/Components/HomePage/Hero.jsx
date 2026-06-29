'use client';

import React from 'react';
import { Button } from '@heroui/react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { BeatLoader } from 'react-spinners';

export default function HeroSection() {

  const {
    data: session,
    isPending,
    
  } = authClient.useSession(); 
 
  const user = session?.user;

  return (
    <section className="relative w-full min-h-[75vh] flex flex-col items-center justify-center bg-[#fafafa] px-6 overflow-hidden">
      {/* Background radial gradient mesh matching the subtle glowing ambiance in image_89d72c.png */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
        style={{
          background:
            'radial-gradient(circle at 10% 20%, rgba(245, 158, 11, 0.08) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(234, 88, 12, 0.05) 0%, transparent 50%)',
        }}
      />

      {/* Main Content Content Layout Wrapper */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Top Badge: "The modern freelance platform" */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#f59d051f] border border-amber-200/60 rounded-full mb-8 shadow-sm">
          {/* Sparkle Icon */}
          <svg
            className="w-3.5 h-3.5 text-[#f59e0b]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9.812 11.238L12 3.25l2.188 7.988H22l-6.313 4.587L18.125 23.5 12 18.913 5.875 23.5l2.438-7.675L2 11.238h7.812z" />
          </svg>
          <span className="text-[#db8727] text-[13px] font-semibold tracking-wide">
            The modern freelance platform
          </span>
        </div>

        {/* Dynamic Typography Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6 select-none">
          Get your tasks done <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f59e0b] to-[#ea580c]">
            <span className="text-black">by</span> skilled freelancers
          </span>
        </h1>

        {/* Subtitle Description */}
        <p className="text-gray-500 text-base sm:text-lg max-w-2xl leading-relaxed mb-10 tracking-wide font-medium">
          TaskHive connects clients with skilled freelancers for micro-tasks.
          Post, propose, pay — all in one seamless platform.
        </p>

        {/* Action Triggers Grid */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Primary Action: Post a Task with Shadow Glow */}
          {isPending ? (
            <div>
              {' '}
              <BeatLoader size={20} color="#f39c12" />{' '}
            </div>
          ) : session?.user?.role === 'client' ? (
            <Link
              href="/dashboard/client/tasks/new"
              className="w-full sm:w-auto no-underline"
            >
              <Button
                radius="xl"
                className="w-full sm:w-auto bg-gradient-to-r from-[#f59e0b] to-[#ea580c] text-white font-bold px-8 h-14 text-[15px] shadow-lg shadow-orange-500/30 border-none flex items-center justify-center gap-2 group rounded-2xl"
              >
                <span>Post a Task</span>

                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
          ) : session?.user?.role === 'freelancer' ? (
            <Link href="/tasks" className="w-full sm:w-auto no-underline">
              <Button
                radius="xl"
                variant="bordered"
                className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-800 font-bold px-8 h-14 text-[15px] border border-gray-100 shadow-sm flex items-center justify-center gap-2 rounded-2xl"
              >
                <span>Browse Tasks</span>

                <svg
                  className="w-3.5 h-3.5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
