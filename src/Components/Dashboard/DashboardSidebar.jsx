import { getUserSession } from '@/lib/core/session';
import { Bars } from '@gravity-ui/icons';
import { Button, Drawer } from '@heroui/react';
import Link from 'next/link';

import {
  FaBorderAll,
  FaListCheck,
  FaCirclePlus,
  FaFolderOpen,
  FaDollarSign,
  FaMagnifyingGlass,
  FaFileLines,
  FaBriefcase,
  FaUserPen,
  FaUsers,
  FaSuitcase,
} from 'react-icons/fa6';

import DashboardLogout from './DashboardLogout';

export async function DashboardSidebar() {
  const user = await getUserSession();
  const userRole = user?.role || 'client';

  const clientNavItems = [
    {
      icon: FaBorderAll,
      href: '/dashboard/client',
      label: 'Overview',
      isActive: true,
    },
    {
      icon: FaListCheck,
      href: '/dashboard/client/tasks',
      label: 'My Tasks',
    },
    {
      icon: FaCirclePlus,
      href: '/dashboard/client/tasks/new',
      label: 'Post Task',
    },
    {
      icon: FaFolderOpen,
      href: '/dashboard/client/proposals',
      label: 'Proposals',
    },
    {
      icon: FaDollarSign,
      href: '/dashboard/client/payments',
      label: 'Payments',
    },
    {
      icon: FaUserPen,
      href: '/dashboard/client/profile',
      label: 'Edit Profile',
    },
  ];

  const freelancerNavItems = [
    {
      icon: FaBorderAll,
      href: '/dashboard/freelancer',
      label: 'Overview',
      isActive: true,
    },
    {
      icon: FaMagnifyingGlass,
      href: '/tasks',
      label: 'Browse Tasks',
    },
    {
      icon: FaFileLines,
      href: '/dashboard/freelancer/proposals',
      label: 'My Proposals',
    },
    {
      icon: FaBriefcase,
      href: '/dashboard/freelancer/projects',
      label: 'Active Projects',
    },
    {
      icon: FaDollarSign,
      href: '/dashboard/freelancer/earnings',
      label: 'Earnings',
    },
    {
      icon: FaUserPen,
      href: '/dashboard/freelancer/profile',
      label: 'Edit Profile',
    },
  ];

  const adminNavItems = [
    {
      icon: FaBorderAll,
      href: '/dashboard/admin',
      label: 'Overview',
      isActive: true,
    },
    {
      icon: FaUsers,
      href: '/dashboard/admin/users',
      label: 'Users',
    },
    {
      icon: FaBriefcase,
      href: '/dashboard/admin/tasks',
      label: 'Tasks',
    },
    {
      icon: FaDollarSign,
      href: '/dashboard/admin/payments',
      label: 'Payments',
    },
    {
      icon: FaUserPen,
      href: '/dashboard/admin/profile',
      label: 'Edit Profile',
    },
  ];

  const navLinksMapping = {
    client: clientNavItems,
    freelancer: freelancerNavItems,
    admin: adminNavItems,
  };

  const navItems = navLinksMapping[userRole] || clientNavItems;

  const navElements = (
    <div className="flex flex-col justify-between h-full w-full bg-white overflow-hidden">
      <div className="w-full flex flex-col">
        {/* Brand Header */}
        <div className="px-1 pb-5 border-b border-gray-100/60 mb-5">
          <Link
            href="/"
            className="flex items-center gap-3 text-xl font-black text-amber-500 tracking-tight"
          >
            <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center shrink-0">
              <FaSuitcase className="text-white text-base" />
            </div>
            TaskHive
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {navItems.map(item => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-4 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
                item.isActive
                  ? 'bg-amber-50 text-amber-500'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <item.icon
                className={`size-4 ${
                  item.isActive ? 'text-amber-500' : 'text-gray-400'
                }`}
              />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* User Section */}
      <div className="pt-4 border-t border-gray-100 mt-auto flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center overflow-hidden shrink-0">
            {user?.image ? (
              <img
                src={user.image}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-amber-500 font-bold">
                {user?.name?.charAt(0).toUpperCase() || 'C'}
              </span>
            )}
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-gray-900 truncate capitalize">
              {user?.name || userRole}
            </span>

            <span className="w-max rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-500 capitalize">
              {userRole}
            </span>
          </div>
        </div>

        <DashboardLogout />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-60 flex-shrink-0 border-r border-gray-100 p-5 bg-white h-screen sticky top-0">
        {navElements}
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed  top-0 left-0 right-0 h-16 px-4 flex items-center justify-between  border-b border-gray-100 z-50">
        <Drawer>
          <Drawer.Trigger asChild>
            <Button
              variant="flat"
              className="min-w-0 px-3 py-2 rounded-xl bg-gray-50 border border-gray-100 text-gray-600 flex items-center gap-2"
            >
              <Bars className="size-4" />
              <span className="text-xs font-bold">Menu</span>
            </Button>
          </Drawer.Trigger>

          {/* FIXED STRUCTURE */}
          <Drawer.Backdrop>
            <Drawer.Content placement="left" className="bg-white max-w-[260px]">
              <Drawer.Dialog className="h-full">
                <Drawer.CloseTrigger className="top-5 right-4" />

                <Drawer.Header className="px-5 pt-6 pb-2">
                  <Drawer.Heading className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Navigation
                  </Drawer.Heading>
                </Drawer.Header>

                <Drawer.Body className="px-5 pb-6 pt-2 overflow-y-auto h-full">
                  {navElements}
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>

        <span className="text-sm font-black text-amber-500 tracking-tight">
          TaskHive
        </span>
      </div>

      {/* Spacer */}
      <div className="w-full h-16 md:hidden" />
    </>
  );
}

