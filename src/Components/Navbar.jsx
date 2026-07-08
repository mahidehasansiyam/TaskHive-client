'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@heroui/react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { ProfileDropdown } from './ProfileDropdown';
import { ArrowRightFromSquare } from '@gravity-ui/icons';
import { useRouter } from 'next/navigation';
import { CiGrid42 } from 'react-icons/ci';
import { CircleLoader } from 'react-spinners';
import { FaBagShopping } from 'react-icons/fa6';

export default function Navbar({ initialSession }) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  
  const activeSession = session ?? initialSession;
  
  
  const dashboardRoute = activeSession?.user?.role
  ? `/dashboard/${activeSession.user.role}`
  : '/dashboard/client';
  
  
  useEffect(() => {
    if (session?.user?.role) {
      router.prefetch(dashboardRoute);
    }
  }, [session, dashboardRoute, router]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, []);

  const handleSignout = async () => {
    setIsOpen(false);
    await authClient.signOut();
    window.location.href = '/';
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Browse Tasks', href: '/tasks' },
    { label: 'Browse Freelancers', href: '/freelancers' },
  ];

  // Avatar initials helper
  const getInitials = name => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="w-full bg-white sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto h-20 px-6 sm:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold no-underline"
        >
          <div className="bg-[#f59e0b] w-9 h-9 rounded-xl text-white flex items-center justify-center">
            <FaBagShopping />
          </div>
          <span className="text-[#e67e22] font-extrabold">TaskHive</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                prefetch={true}
                className="text-[14px] font-semibold text-gray-600 hover:text-[#f59e0b]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-6">
          {isPending ? (
            <CircleLoader size={30} color="#f59e0b" />
          ) : session ? (
            <>
              <Link
                href={dashboardRoute}
                className="text-[#555] hover:text-[#f59e0b] text-sm font-semibold flex items-center gap-2"
              >
                <CiGrid42 />
                Dashboard
              </Link>
              <ProfileDropdown session={session} />
              <Button
                isIconOnly
                onClick={handleSignout}
                variant="light"
                className="text-gray-500 hover:text-red-600"
              >
                <ArrowRightFromSquare className="size-5" />
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="font-semibold text-gray-600 hover:text-[#f59e0b]"
              >
                Sign In
              </Link>
              <Link href="/auth/register">
                <Button className="bg-gradient-to-r from-[#f39c12] to-[#e67e22] text-white font-bold p-2 rounded-lg hover:from-[#e67e22] hover:to-[#f39c12]">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile: right side (avatar + hamburger) */}
        <div className="md:hidden flex items-center gap-3">
          {/* Show avatar in header bar when logged in */}
          {!isPending && session && (
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center">
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                getInitials(session.user?.name)
              )}
            </div>
          )}

          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-transparent min-w-0 text-black text-xl px-1"
          >
            {isOpen ? '✕' : '☰'}
          </Button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-5 space-y-2">
          {/* Nav links */}
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 font-semibold text-sm hover:bg-amber-50 hover:text-amber-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* Divider */}
          <div className="border-t border-gray-100 my-3" />

          {isPending ? (
            <div className="flex justify-center py-4">
              <CircleLoader size={24} color="#f59e0b" />
            </div>
          ) : session ? (
            <>
              {/* Profile info row */}
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 text-sm font-bold flex items-center justify-center shrink-0 overflow-hidden">
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    getInitials(session.user?.name)
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {session.user?.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {session.user?.email}
                  </p>
                </div>
              </div>

              {/* Dashboard */}
              <Link
                href={dashboardRoute}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-50 text-amber-700 font-bold text-sm hover:bg-amber-100 transition-colors"
              >
                <CiGrid42 className="text-lg" />
                Dashboard
              </Link>

              {/* Logout */}
              <button
                onClick={handleSignout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 font-semibold text-sm hover:bg-red-50 transition-colors"
              >
                <ArrowRightFromSquare className="size-4" />
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center px-4 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center px-4 py-3 rounded-xl bg-gradient-to-r from-[#f39c12] to-[#e67e22] text-white font-bold text-sm"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}