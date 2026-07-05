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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const dashboardRoute = session?.user?.role
    ? `/dashboard/${session.user.role}`
    : '/dashboard/client';

  // Prefetch dashboard page automatically
  useEffect(() => {
    if (session?.user?.role) {
      router.prefetch(dashboardRoute);
    }
  }, [session, dashboardRoute, router]);

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
                className="text-[14px] font-semibold text-gray-600 hover:text-[#f59e0b]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-6">
          {isPending ? (
            <CircleLoader size={30} color="#f59e0b" />
          ) : session ? (
            <>
              {/* Fast Dashboard Link */}
              <Link
                href={dashboardRoute}
                prefetch={true}
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
                <Button className="bg-gradient-to-r from-[#f39c12] to-[#e67e22] text-white font-bold">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-transparent min-w-0"
          >
            ☰
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden p-6 bg-white border-t">
          {session && (
            <Link
              href={dashboardRoute}
              prefetch={true}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 text-amber-700 font-bold"
            >
              <CiGrid42 />
              Dashboard
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
