'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const AllTasks = ({ tasks = [] }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Multi-tier search & category/status filtering system
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

  return (
    <div className="max-w-6xl mx-auto pt-6 space-y-6 pb-12 px-4">
      {/* Header Panel Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Browse Tasks
        </h1>
        <p className="text-sm text-gray-500 font-normal mt-0.5">
          Find open tasks that match your skills
        </p>
      </div>

      {/* Control Toolbar Panel - EXACT MATCH to image_cb10b5.png */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
        {/* Search bar context wrapper */}
        <div className="relative w-full sm:flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 pointer-events-none">
            <FaMagnifyingGlass size={14} className="text-gray-400/80" />
          </span>
          <input
            type="text"
            placeholder="Search tasks by title..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/40 text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-amber-500 transition-colors text-sm"
          />
        </div>

        {/* Category Option Select box */}
        <div className="relative w-full sm:w-44">
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 bg-gray-50/40 text-gray-700 font-normal focus:outline-none focus:bg-white focus:border-amber-500 text-sm appearance-none cursor-pointer transition-colors"
          >
            <option value="all">all</option>
            <option value="Development">Development</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Writing">Writing</option>
          </select>
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
            <svg
              className="w-4 h-4 text-gray-400/90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
            <svg
              className="w-3 h-3 generic-chevron"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Task Count Indicator */}
      <div className="text-[14px] text-gray-400 font-normal pt-1">
        {filteredTasks.length} tasks found
      </div>

      {/* Primary Tasks Layout Grid (3 Columns Layout Matching Sample Images) */}
      {filteredTasks.length === 0 ? (
        <div className="w-full bg-white rounded-2xl border border-gray-100 p-16 flex flex-col items-center justify-center text-center shadow-sm">
          <p className="text-gray-400 text-sm font-medium">
            No tasks found matching your filter criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map(task => {
            return (
              <Link
                key={task._id}
                href={`/tasks/${task._id}`}
                className="no-underline block group"
              >
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.01)] flex flex-col justify-between min-h-[200px] transition-all duration-200 hover:border-amber-400 hover:shadow-[0_4px_20px_-4px_rgba(245,158,11,0.08)]">
                  <div>
                    {/* Top row: Category Pill & Target Deadline */}
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="bg-gray-100 text-gray-700 font-medium px-2.5 py-1 rounded-2xl">
                        {task.category || 'Development'}
                      </span>
                      {task.deadline && (
                        <span className="text-gray-400 font-normal">
                          {new Date(task.deadline).toLocaleDateString('en-US', {
                            month: 'numeric',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      )}
                    </div>

                    {/* Task Title Context Header */}
                    <h3 className="font-bold text-[16px] text-black group-hover:text-amber-600 transition-colors mt-4 line-clamp-1">
                      {task.title}
                    </h3>

                    {/* Description Paragraph Container */}
                    <p className="text-sm text-gray-500 mt-1.5 line-clamp-2 font-normal break-words leading-relaxed min-h-[40px]">
                      {task.description}
                    </p>
                  </div>

                  {/* Bottom Row: Item Cost Value & Creator Mail ID */}
                  <div className="flex items-center justify-between gap-3 mt-4 pt-2">
                    <span className="text-amber-500 text-xl font-bold">
                      ${task.budget}
                    </span>
                    <span className="text-gray-400 text-xs font-normal truncate max-w-[65%]">
                      {task.clientEmail || 'client123@gmail.com'}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllTasks;
