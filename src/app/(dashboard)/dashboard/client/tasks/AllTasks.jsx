'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import {
  FaMagnifyingGlass,
  FaDollarSign,
  FaCalendarDays,
  FaPlus,
  FaTrashCan,
  FaEye,
  FaUsers,
  FaWallet,
} from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { deleteTask } from '@/lib/action/task';
import TaskCard from './TaskCard';
import { toast } from 'react-toastify';

const AllTasks = ({ tasks = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const router = useRouter();

  // Dynamic filter logic
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch =
        task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || task.category === selectedCategory;
      const matchesStatus =
        selectedStatus === 'all' ||
        task.status?.toLowerCase() === selectedStatus.toLowerCase();

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [tasks, searchTerm, selectedCategory, selectedStatus]);

  const handleDelete = async taskId => {
  
    // DELETE task
    try {
      const data = await deleteTask(taskId);
      if (data.deletedCount > 0) {
        toast.success('Task deleted successfully!');
        router.refresh();
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            My Tasks
          </h1>
          <p className="text-sm text-gray-500 font-normal">
            Manage all your posted tasks
          </p>
        </div>
        <Link href="/dashboard/client/tasks/new" className="no-underline">
          <Button className="bg-[#d97706] hover:bg-[#b45309] text-white font-semibold text-sm px-5 py-2.5 rounded-xl flex items-center gap-2">
            <FaPlus size={13} />
            Post New Task
          </Button>
        </Link>
      </div>

      {/* Filter Toolbar Section */}
      <div className="flex flex-col md:flex-row items-center gap-4 w-full">
        {/* Search input field */}
        <div className="relative w-full md:flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
            <FaMagnifyingGlass size={14} />
          </span>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200/80 bg-gray-50/40 text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-amber-500 transition-colors text-sm"
          />
        </div>

        {/* Category filter dropdown */}
        <div className="w-full md:w-40">
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200/80 bg-white text-gray-700 font-medium focus:outline-none focus:border-amber-500 text-sm appearance-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="Development">Development</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        {/* Status filter dropdown */}
        <div className="w-full md:w-40">
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200/80 bg-white text-gray-700 font-medium focus:outline-none focus:border-amber-500 text-sm appearance-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Grid Container View */}
      {filteredTasks.length === 0 ? (
        <div className="w-full bg-white rounded-2xl border border-gray-100 p-16 flex flex-col items-center justify-center text-center">
          <p className="text-gray-400 text-sm">
            No tasks matched your criteria.
          </p>
        </div>
      ) : (
          // Redirect to TaskCard page
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTasks.map(task => (
            <TaskCard key={task._id} task={task} handleDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTasks;
