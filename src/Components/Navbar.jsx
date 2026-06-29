'use client';

import React, { useState } from 'react';
import { Button } from '@heroui/react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { ProfileDropdown } from './ProfileDropdown';
import { PiSignOutFill } from 'react-icons/pi';
import { ArrowRightFromSquare } from '@gravity-ui/icons';
import { useRouter } from 'next/navigation';
import { CiGrid42 } from 'react-icons/ci';
import { CircleLoader } from 'react-spinners';


export default  function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  // console.log(session);
  

  const handleSignout = async () => {
    setIsOpen(false);
    await authClient.signOut();
  };

  const handleDashboardRedirect = () => {
    setIsOpen(false);
    const userRole = session?.user?.role || 'client';
    if (userRole === 'freelancer') {
      router.push('/dashboard/freelancer');
    } else {
      router.push('/dashboard/recruiter');
    }
  };

  const navLinks = [
    { label: 'Home', href: '/', active: true },
    { label: 'Browse Tasks', href: '/tasks', active: false },
    { label: 'Browse Freelancers', href: '/freelancers', active: false },
  ];

  // if (isPending) {
  //   return (
  //     <div className="w-full h-20 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-sm text-gray-400">
  //       Loading...
  //     </div>
  //   );
  // }

  return (
    <header className="w-full bg-white backdrop-blur-md sticky top-0 z-50 transition-all border-b border-gray-100">
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

        {/* Right: Desktop Actions View */}
        <div className="hidden md:flex items-center gap-8">
          {isPending ? (
            <div>
              <CircleLoader size={40} color="#f59e0b" />
            </div>
          ) : session ? (
            <div className="flex items-center gap-4 justify-center">
              <div>
                <Link
                  href={`/dashboard/${session?.user.role}`}
                  className="text-[#555] hover:text-[#f59e0b] text-[14px] font-semibold transition-colors no-underline flex justify-center items-center gap-2"
                >
                  <CiGrid42 />
                  Dashboard
                </Link>
              </div>

              <ProfileDropdown session={session} />

              <Button
                isIconOnly
                onClick={handleSignout}
                variant="light"
                className="text-gray-500 hover:text-red-600 min-w-0 p-2 rounded-xl"
              >
                <ArrowRightFromSquare className="size-5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link
                href="/auth/login"
                className="text-[#555] hover:text-[#f59e0b] text-[14px] font-semibold transition-colors no-underline"
              >
                Sign In
              </Link>

              <Link href="/login">
                <Button
                  radius="md"
                  className="bg-gradient-to-r from-[#f39c12] to-[#e67e22] text-white font-bold px-6 h-11 text-[14px] shadow-sm rounded-2xl"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          )}
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

      {/* Mobile responsive Dropdown overlay matches 1000004674.jpg layout */}
      {isOpen && (
        <div className="absolute top-20 left-0 right-0 bg-white border-b border-gray-100 p-6 shadow-2xl z-[999] flex flex-col justify-between h-[calc(100vh-80px)] md:hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Top Section: Navigation Links */}
          <ul className="flex flex-col gap-4 list-none m-0 p-0 w-full">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-base font-bold block py-2.5 px-4 rounded-xl no-underline transition-all ${
                    link.active
                      ? 'bg-amber-50 text-[#f59e0b]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Bottom Section: Auth / Profile Placement */}
          <div className="w-full mt-auto pt-6 border-t border-gray-100">
            {session ? (
              <div className="flex items-center justify-between w-full bg-gray-50/50 p-3 rounded-2xl border border-gray-100">
                {/* Clickable Profile Detail Block */}
                <div
                  onClick={handleDashboardRedirect}
                  className="flex items-center gap-3 cursor-pointer flex-1 min-w-0 group"
                >
                  <div className="w-11 h-11 rounded-full bg-amber-100 flex items-center justify-center overflow-hidden shrink-0 border border-amber-200">
                    {session?.user?.image ? (
                      <img
                        src={session.user.image}
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-amber-800 font-bold text-sm">
                        {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold  truncate text-amber-600 transition-colors">
                      {session?.user?.name || 'User'}
                    </span>
                    {session?.user?.role && (
                      <span className="w-max inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-100 capitalize mt-0.5">
                        {session?.user?.role}
                      </span>
                    )}
                  </div>
                </div>

                {/* Immediate Logout Action Hook */}
                <Button
                  isIconOnly
                  onClick={handleSignout}
                  variant="light"
                  className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-xl min-w-0 shrink-0"
                >
                  <ArrowRightFromSquare className="size-5" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 w-full">
                <Link
                  href="/auth/login"
                  className="text-gray-600 text-[15px] font-bold transition-colors no-underline text-center py-2.5 rounded-xl hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/login"
                  className="w-full no-underline"
                  onClick={() => setIsOpen(false)}
                >
                  <Button
                    radius="md"
                    className="w-full bg-gradient-to-r from-[#f39c12] to-[#e67e22] text-white font-bold h-11 text-[15px] border-none rounded-xl"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
