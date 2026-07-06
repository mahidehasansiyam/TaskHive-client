'use client';

import React from 'react';
import { LuSearch, LuFileText, LuClock } from 'react-icons/lu';
import { FaDollarSign } from 'react-icons/fa6';
import { MdCheckCircle } from 'react-icons/md';
import { FaRegCheckCircle } from 'react-icons/fa';
import { RxCrossCircled } from 'react-icons/rx';

const FreelancerDashboardStats = ({ stats }) => {
  // Fallback default values if dynamic data hasn't loaded yet
  const dynamicStats = stats || {
    totalProposals: 0,
    pending: 0,
    accepted: 0,
    totalEarned: 0,
  };

  return (
    <div className="max-w-7xl mx-auto px-1 md:px-8 py-10 bg-white font-sans">
      {/* Dashboard Top Header Control Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-1.5">
            Freelancer Dashboard
          </h1>
          <p className="text-gray-400 text-sm font-medium">
            Track your proposals and earnings
          </p>
        </div>

        {/* Navigation Action Control Button */}
        <button
          onClick={() => (window.location.href = '/tasks')}
          className="flex items-center gap-2 bg-[#ea7a02] hover:bg-[#d46f02] text-white font-bold text-sm py-3 px-5 rounded-xl transition-all duration-200 shadow-sm"
        >
          <LuSearch className="text-base stroke-[3]" />
          <span>Browse Tasks</span>
        </button>
      </div>

      {/* Grid Overview Cards Wrapper */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Card 1: Total Proposals */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.03)] flex justify-between items-start">
          <div className="space-y-1">
            <span className="block text-sm text-gray-400 font-bold tracking-wide">
              Total Proposals
            </span>
            <span className="block text-4xl font-extrabold text-gray-900">
              {dynamicStats.totalProposals}
            </span>
            <span className="block text-xs text-gray-400 font-medium pt-1">
              Proposals submitted
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#fff4e6] flex items-center justify-center shrink-0 text-[#ea7a02]">
            <LuFileText className="text-xl stroke-[2]" />
          </div>
        </div>

        {/* Card 2: Pending Awaiting Response */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.03)] flex justify-between items-start">
          <div className="space-y-1">
            <span className="block text-sm text-gray-400 font-bold tracking-wide">
              Pending
            </span>
            <span className="block text-4xl font-extrabold text-gray-900">
              {dynamicStats.pending}
            </span>
            <span className="block text-xs text-gray-400 font-medium pt-1">
              Awaiting response
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#fff4e6] flex items-center justify-center shrink-0 text-[#ea7a02]">
            <LuClock className="text-xl stroke-[2]" />
          </div>
        </div>

        {/* Card 3: Accepted Proposals */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.03)] flex justify-between items-start">
          <div className="space-y-1">
            <span className="block text-sm text-gray-400 font-bold tracking-wide">
              Accepted
            </span>
            <span className="block text-4xl font-extrabold text-gray-900">
              {dynamicStats.accepted}
            </span>
            <span className="block text-xs text-gray-400 font-medium pt-1">
              Proposals accepted
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#fff4e6] flex items-center justify-center shrink-0 text-[#ea7a02]">
            <FaRegCheckCircle className="text-xl stroke-[2]" />
          </div>
        </div>

        {/* Card 3: Rejected Proposals */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.03)] flex justify-between items-start">
          <div className="space-y-1">
            <span className="block text-sm text-gray-400 font-bold tracking-wide">
              Rejected
            </span>
            <span className="block text-4xl font-extrabold text-gray-900">
              {dynamicStats.totalRejected}
            </span>
            <span className="block text-xs text-gray-400 font-medium pt-1">
              Proposals Rejected
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#fff4e6] flex items-center justify-center shrink-0 text-[#ea7a02]">
            <RxCrossCircled className="text-xl stroke-[2]" />
          </div>
        </div>

        {/* Card 4: Total Revenue Earned */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.03)] flex justify-between items-start">
          <div className="space-y-1">
            <span className="block text-sm text-gray-400 font-bold tracking-wide">
              Total Earned
            </span>
            <span className="block text-4xl font-extrabold text-gray-900">
              ${dynamicStats.totalEarned}
            </span>
            <span className="block text-xs text-gray-400 font-medium pt-1">
              From completed tasks
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#fff4e6] flex items-center justify-center shrink-0 text-[#ea7a02]">
            <FaDollarSign className="text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboardStats;
