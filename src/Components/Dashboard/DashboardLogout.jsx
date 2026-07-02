"use client"
import { authClient } from '@/lib/auth-client';
import { ArrowRightFromSquare } from '@gravity-ui/icons';
import { Button } from '@heroui/react';

import React from 'react';


const DashboardLogout = () => {
  
  const handleLogout =async () => {
    await authClient.signOut();
    window.location.href = '/';
    
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
        <ArrowRightFromSquare className="size-5" />
      </Button>
    </div>
  );
};

export default DashboardLogout;