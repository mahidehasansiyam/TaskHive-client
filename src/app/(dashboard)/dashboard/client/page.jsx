import React from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { getUserSession } from '@/lib/core/session';
import {
  FaListCheck,
  FaClock,
  FaCircleCheck,
  FaDollarSign,
  FaPlus,
  FaCalendarDays,
} from 'react-icons/fa6';
import { getAllTasksByClientEmail, getLatest4TasksByClientEmail} from '@/lib/api/tasks';
import ClientRecentTask from './ClientRecentTask';


export default async function ClientDashboardPage() {
  const session = await getUserSession();

  
  // GET last 4 task by task id 
  const latestTasks = await getLatest4TasksByClientEmail(session.email);
  
  //  GET all task by client email to find summarize 
  const tasks = await getAllTasksByClientEmail(session.email);
  // console.log("TAsks",tasks);

   const stats = tasks.reduce(
     (acc, task) => {
       // Total tasks
       acc.totalTasks++;

       // Total open tasks
       if (task.status === 'open') {
         acc.openTasks++;
       }

       // Total in progress
       if (task.status === 'in progress') {
         acc.inProgressTasks++;
       }

       // Total spend
       acc.totalSpent += task.proposed_budget || 0;

       return acc;
     },
     {
       totalTasks: 0,
       openTasks: 0,
       inProgressTasks: 0,
       totalSpent: 0,
     },
   );
   


const recentTasks = latestTasks;
const metrics = stats;


  return (
    <div className="space-y-8 w-full  min-h-screen animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Client Dashboard
          </h1>
          <p className="text-base text-gray-500">
            Manage your tasks and find talented freelancers
          </p>
        </div>
        <Link href="/dashboard/client/tasks/new" className="no-underline">
          <Button className="bg-[#d97706] hover:bg-[#b45309] text-white font-semibold text-sm px-5 py-2.5 rounded-xl flex items-center gap-2">
            <FaPlus size={13} /> Post New Task
          </Button>
        </Link>
      </div>

      {/* --- Main Statistics Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-start">
          <div>
            <span className="text-sm font-medium text-gray-500">
              Total Tasks
            </span>
            <h3 className="text-4xl font-bold text-gray-900 mt-1">
              {metrics.totalTasks}
            </h3>
            <p className="text-xs text-gray-400 mt-2">All tasks created</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#fef3c7] text-[#d97706] flex items-center justify-center shrink-0">
            <FaListCheck size={16} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-start">
          <div>
            <span className="text-sm font-medium text-gray-500">
              Open Tasks
            </span>
            <h3 className="text-4xl font-bold text-gray-900 mt-1">
              {metrics.openTasks}
            </h3>
            <p className="text-xs text-gray-400 mt-2">Awaiting proposals</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#fef3c7] text-[#d97706] flex items-center justify-center shrink-0">
            <FaClock size={16} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-start">
          <div>
            <span className="text-sm font-medium text-gray-500">
              In Progress
            </span>
            <h3 className="text-4xl font-bold text-gray-900 mt-1">
              {metrics.inProgressTasks}
            </h3>
            <p className="text-xs text-gray-400 mt-2">
              Currently being worked on
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#fef3c7] text-[#d97706] flex items-center justify-center shrink-0">
            <FaCircleCheck size={16} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-start">
          <div>
            <span className="text-sm font-medium text-gray-500">
              Total Spent
            </span>
            <h3 className="text-4xl font-bold text-gray-900 mt-1">
              ${metrics.totalSpent}
            </h3>
            <p className="text-xs text-gray-400 mt-2">Total money paid (USD)</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#fef3c7] text-[#d97706] flex items-center justify-center shrink-0">
            <FaDollarSign size={16} />
          </div>
        </div>
      </div>

      {/* --- Recent Tasks --- */}
      <div className="space-y-4 pt-2">
        <h2 className="text-xl font-bold text-gray-900">Recent Tasks</h2>
       {/* Redirect to task show page */}
        <ClientRecentTask tasks={recentTasks} />
      </div>
    </div>
  );
}
