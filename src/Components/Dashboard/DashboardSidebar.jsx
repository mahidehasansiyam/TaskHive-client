import { authClient } from '@/lib/auth-client';
import { getUserSession } from '@/lib/core/session';
import { Bars, LayoutSideContentLeft } from '@gravity-ui/icons';
import { Button, Drawer } from '@heroui/react';
import Link from 'next/link';

// FontAwesome 6 icons carefully mapped to match your sidebar
import {
  FaBorderAll, // Overview
  FaListCheck, // My Tasks
  FaCirclePlus, // Post Task
  FaFolderOpen, // Proposals
  FaDollarSign, // Payments / Earnings
  FaMagnifyingGlass, // Browse Tasks
  FaFileLines, // My Proposals
  FaBriefcase, // Active Projects
  FaUserPen, // Edit Profile
  FaUsers, // Users
  FaRightFromBracket, // Log Out
  FaSuitcase, // Header Brand Icon
} from 'react-icons/fa6';

export async function DashboardSidebar() {
  const user = await getUserSession();
  const userRole = user?.role || 'client';

  // Client Navigation Model
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
  ];

  // Freelancer Navigation Model
  const freelancerNavItems = [
    {
      icon: FaBorderAll,
      href: '/dashboard/freelancer',
      label: 'Overview',
      isActive: true,
    },
    { icon: FaMagnifyingGlass, href: '/tasks', label: 'Browse Tasks' },
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

  // Admin Navigation Model
  const adminNavItems = [
    {
      icon: FaBorderAll,
      href: '/dashboard/admin',
      label: 'Overview',
      isActive: true,
    },
    { icon: FaUsers, href: '/dashboard/admin/users', label: 'Users' },
    { icon: FaBriefcase, href: '/dashboard/admin/tasks', label: 'Tasks' },
    {
      icon: FaDollarSign,
      href: '/dashboard/admin/payments',
      label: 'Payments',
    },
  ];

  const navLinksMapping = {
    client: clientNavItems,
    freelancer: freelancerNavItems,
    admin: adminNavItems,
  };

  const navItems = navLinksMapping[userRole] || clientNavItems;

  

  const navElements = (
    <div className="flex flex-col justify-between h-full w-full min-h-[calc(100vh-70px)] md:min-h-[calc(100vh-40px)] bg-white">
      <div className="w-full flex flex-col">
        {/* Brand Header Section matching image_3123c8.png */}
        <div className="  px-1 pb-5 border-b border-gray-100/60 mb-5 select-none">
          <Link
            href="/"
            className="flex items-center gap-3 text-xl font-black text-amber-500 tracking-tight"
          >
            <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center shadow-sm shrink-0">
              <FaSuitcase className="text-white text-base" />
            </div>
            TaskHive
          </Link>
        </div>

        {/* Adjusted Navigation items with exact styling states */}
        <nav className="flex flex-col gap-0.5 w-full">
          {navItems.map(item => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-4 rounded-xl px-4 py-2.5 text-sm font-bold tracking-wide no-underline transition-all duration-150 ${
                item.isActive
                  ? 'bg-amber-50/70 text-amber-500'
                  : 'text-gray-500 hover:bg-gray-50/80 hover:text-gray-800'
              }`}
            >
              <item.icon
                className={`size-[16px] ${item.isActive ? 'text-amber-500' : 'text-gray-400'}`}
              />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Added Profile Section at the bottom of the slider to match image_3123c8.png */}
      <div className="pt-4 border-t border-gray-100/70 mt-auto flex items-center justify-between w-full">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center overflow-hidden shrink-0 select-none">
            {user?.image ? (
              <img
                src={user.image}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-amber-500 font-bold text-sm">
                {user?.name?.charAt(0).toUpperCase() || 'C'}
              </span>
            )}
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-gray-900 truncate tracking-wide capitalize">
              {user?.name || userRole}
            </span>
            <span className="w-max inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-500 border border-blue-100/20 capitalize mt-0.5">
              {userRole}
            </span>
          </div>
        </div>

        {/* Sign out */}
        <Button
          type="submit"
          isIconOnly
          variant="light"
          className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg min-w-0 p-1.5 shrink-0 transition-colors"
          aria-label="Sign out"
        >
          <FaRightFromBracket size={16} />
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden md:block w-60 flex-shrink-0 border-r border-gray-100 p-5 bg-white h-screen sticky top-0">
        {navElements}
      </aside>

      {/* Mobile Top Header view incorporating trigger controls */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 px-4 flex items-center justify-between bg-white border-b border-gray-100 w-full z-50">
        <Drawer>
          <Button
            className="min-w-0 px-3 py-2 bg-gray-50 border border-gray-100 text-gray-600 rounded-xl flex items-center gap-2"
            variant="flat"
          >
            <Bars className="size-4" />
            <span className="text-xs font-bold">Menu</span>
          </Button>
          <Drawer.Backdrop>
            <Drawer.Content placement="left" className="bg-white max-w-[260px]">
              <Drawer.Dialog className="h-full">
                <Drawer.CloseTrigger className="top-5 right-4" />
                <Drawer.Header className="px-5 pt-6 pb-2">
                  <Drawer.Heading className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Navigation
                  </Drawer.Heading>
                </Drawer.Header>
                <Drawer.Body className="px-5 pb-6 pt-2 h-full overflow-y-auto">
                  {navElements}
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>

        <span className="text-sm font-black text-amber-500 select-none tracking-tight pr-2">
          TaskHive
        </span>
      </div>

      {/* Spacer item layout helper for mobile screens */}
      <div className="w-full h-16 md:hidden shrink-0" />
    </>
  );
}
