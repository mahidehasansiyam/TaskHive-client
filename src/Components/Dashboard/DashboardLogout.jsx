"use client"
import { authClient } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import React from 'react';
import { FaRightFromBracket } from 'react-icons/fa6';

const DashboardLogout = () => {
  const handleLogout =async () => {
    await authClient.signOut();
  }
  return (
    <div>
      <Button
        onClick={handleLogout}
        type="submit"
        isIconOnly
        variant="light"
        className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg min-w-0 p-1.5 shrink-0 transition-colors"
        aria-label="Sign out"
      >
        <FaRightFromBracket size={16} />
      </Button>
    </div>
  );
};

export default DashboardLogout;