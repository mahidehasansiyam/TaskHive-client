import React from 'react';
import { DashboardSidebar } from '../../Components/Dashboard/DashboardSidebar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex bg-[#fafafa]">
      <DashboardSidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
    
  );
};

export default DashboardLayout;
