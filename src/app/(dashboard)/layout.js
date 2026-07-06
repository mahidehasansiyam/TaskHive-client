import { DashboardSidebar } from "@/Components/Dashboard/DashboardSidebar";

// app/dashboard/layout.jsx (or wherever your layout wraps the sidebar)
const DashboardLayout = async ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <main className="flex-1 min-w-0 p-6 md:p-8">{children}</main>
    </div>
  );
};

export default DashboardLayout;
