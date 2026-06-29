'use client';

import { authClient } from '@/lib/auth-client';
import { ArrowRightFromSquare } from '@gravity-ui/icons';
import { Dropdown } from '@heroui/react';
import { useRouter } from 'next/navigation';

export function ProfileDropdown({ session }) {
  const router = useRouter();
  const userRole = session?.user?.role || 'client';

  const handleDashboardRedirect = () => {
    if (userRole === 'freelancer') {
      router.push('/dashboard/freelancer');
    } else {
      router.push('/dashboard/recruiter');
    }
  };

  return (
    <Dropdown placement="bottom-end">
      {/* Trigger Button with Fixed Circular Constraints */}
      <Dropdown.Trigger className="rounded-full cursor-pointer transition-transform hover:scale-105 active:scale-95 outline-none">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center overflow-hidden border border-amber-200 shadow-sm">
          {session?.user?.image ? (
            <img
              alt="Profile"
              src={session.user.image}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-amber-800 font-bold text-sm">
              {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          )}
        </div>
      </Dropdown.Trigger>

      {/* Popover Container */}
      <Dropdown.Popover className="border border-gray-100 shadow-xl rounded-2xl bg-white min-w-[240px]">
        {/* Header Profile Section */}
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center overflow-hidden shrink-0">
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-amber-800 font-bold text-xs">
                  {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <p className="text-sm font-bold text-gray-900 flex items-center gap-1.5 truncate">
                {session?.user?.name || 'User'}
                {session?.user?.role && (
                  <span className="inline-flex items-center rounded-full bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-200 capitalize">
                    {session?.user?.role}
                  </span>
                )}
              </p>
              <p className="text-xs text-gray-500 truncate mt-0.5">
                {session?.user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Dropdown Navigation Menu — Cleaned up borders */}
        <Dropdown.Menu
          variant="flat"
          className="p-1.5 flex flex-col gap-0.5 border-none outline-none shadow-none"
        >
          <Dropdown.Item
            onClick={handleDashboardRedirect}
            id="dashboard"
            textValue="Dashboard"
            className="rounded-xl data-[hover=true]:bg-amber-50 data-[hover=true]:text-amber-800 text-gray-700 transition-colors duration-150 px-3 py-2 cursor-pointer"
          >
            <span className="font-semibold text-sm block text-current">
              Dashboard
            </span>
          </Dropdown.Item>

          <Dropdown.Item
            id="profile"
            textValue="Profile"
            className="rounded-xl data-[hover=true]:bg-amber-50 data-[hover=true]:text-amber-800 text-gray-700 transition-colors duration-150 px-3 py-2 cursor-pointer"
          >
            <span className="font-semibold text-sm block text-current">
              Profile
            </span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
