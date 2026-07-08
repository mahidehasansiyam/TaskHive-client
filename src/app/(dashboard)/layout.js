import { DashboardSidebar } from '@/Components/Dashboard/DashboardSidebar';
import { getUserSession } from '@/lib/core/session';

// app/dashboard/layout.jsx (or wherever your layout wraps the sidebar)
const DashboardLayout = async ({ children }) => {
  const user = await getUserSession();
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <DashboardSidebar user={user} />
      <main className="flex-1 min-w-0 p-1 md:p-8">{children}</main>
    </div>
  );
};

export default DashboardLayout;
