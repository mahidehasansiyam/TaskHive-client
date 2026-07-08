'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { Pagination } from '@heroui/react';

const AllTasks = ({ tasks = [], filters = {}, total }) => {
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [selectedCategory, setSelectedCategory] = useState(
    filters.category || 'all',
  );
  const [page, setPage] = useState(filters.page || 1);

  const router = useRouter();

  const totalItems = total;
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);
    if (page > 3) {
      pages.push('ellipsis');
    }
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (page < totalPages - 2) {
      pages.push('ellipsis');
    }
    pages.push(totalPages);
    return pages;
  };

  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  useEffect(() => {
    const searchParams = new URLSearchParams();

    if (selectedCategory !== 'all') {
      searchParams.set('category', selectedCategory);
    }
    if (searchTerm) {
      searchParams.set('search', searchTerm);
    }

    if (page) {
      searchParams.set('page', page);
    }

    const path = `?${searchParams.toString()}`;
    router.push(path);

    // console.log(searchParams.toString());
  }, [router, searchTerm, selectedCategory, page]);

  return (
    <div className="max-w-6xl mx-auto pt-6 space-y-6 pb-12 px-1">
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
        {tasks.length} tasks found
      </div>

      {/* Primary Tasks Layout Grid (3 Columns Layout Matching Sample Images) */}
      {tasks.length === 0 ? (
        <div className="w-full bg-white rounded-2xl border border-gray-100 p-16 flex flex-col items-center justify-center text-center shadow-sm">
          <p className="text-gray-400 text-sm font-medium">
            No tasks found matching your filter criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map(task => {
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

      {/* Add Pagination */}

      <div className="mt-8 gap-4 bg-amber-100/50 rounded-xl px-4 py-3 font-bold">
        {/* Left side */}
        {/* <div className="text-sm text-gray-500">
          Showing {startItem}-{endItem} of {totalItems} results
        </div> */}

        {/* Right side */}
        <Pagination>
          <Pagination.Summary>
            Showing {startItem}-{endItem} of {totalItems} results
          </Pagination.Summary>
          <Pagination.Content className="flex items-center gap-1">
            <Pagination.Item>
              <Pagination.Previous
                isDisabled={page === 1}
                onPress={() => setPage(p => p - 1)}
                className="px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                ← Previous
              </Pagination.Previous>
            </Pagination.Item>

            {getPageNumbers().map((p, i) =>
              p === 'ellipsis' ? (
                <Pagination.Item key={`ellipsis-${i}`}>
                  <Pagination.Ellipsis />
                </Pagination.Item>
              ) : (
                <Pagination.Item key={p}>
                  <Pagination.Link
                    isActive={p === page}
                    onPress={() => setPage(p)}
                    className={`
          rounded-lg px-3 py-2
          ${
            p === page
              ? 'bg-amber-500 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }
        `}
                  >
                    {p}
                  </Pagination.Link>
                </Pagination.Item>
              ),
            )}

            <Pagination.Item>
              <Pagination.Next
                isDisabled={page === totalPages}
                onPress={() => setPage(p => p + 1)}
                className="px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                Next →
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      </div>
    </div>
  );
};

export default AllTasks;
