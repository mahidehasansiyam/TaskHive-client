import { getFreelancerByid } from '@/lib/api/user';
import React from 'react';
import { LuBriefcase } from 'react-icons/lu';
import { FaDollarSign, FaCalendarDays } from 'react-icons/fa6';

const FreelancerDetails = async ({ params }) => {
  const { id } = await params;
  const freelancer = await getFreelancerByid(id);

  if (!freelancer) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-12 text-gray-500 font-medium dark:text-gray-400">
        Freelancer data not found.
      </div>
    );
  }

  // Generate initials for placeholder avatar
  const getInitials = name => {
    if (!name) return 'FL';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className=" max-w-6xl mx-auto min-h-screen font-sans bg-[#fafafa] dark:bg-gray-950 transition-colors duration-300 pb-20">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s ease-out forwards;
        }
        .stagger-1 { animation-delay: 0.15s; }
        .stagger-2 { animation-delay: 0.3s; }
      `}} />

      {/* Cover Banner */}
      <div className="h-48 md:h-64 w-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 dark:from-amber-600 dark:via-orange-700 dark:to-rose-800 relative shadow-sm">
        <div className="absolute inset-0 bg-black/5 dark:bg-black/20" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative -mt-20 sm:-mt-24">
        {/* Top Identity Header Row */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 mb-12 animate-fade-in-up opacity-0">
          {/* Rounded Avatar Container with overlapping border */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-[6px] border-[#fafafa] dark:border-gray-950 bg-gradient-to-br from-emerald-100 to-teal-50 dark:from-emerald-900/50 dark:to-teal-800/50 text-teal-600 dark:text-teal-400 font-extrabold text-4xl sm:text-5xl flex items-center justify-center shrink-0 shadow-lg relative z-10 transition-transform hover:scale-[1.02] duration-300">
            {getInitials(freelancer.name)}
          </div>

          {/* Identity Details */}
          <div className="flex-1 text-center sm:text-left pb-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
              {freelancer.name || 'Freelancer'}
            </h1>

            {/* Metadata Statistics Strip */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-sm font-semibold text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2 bg-white dark:bg-gray-800/80 px-4 py-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm transition-transform hover:-translate-y-0.5 duration-200">
                <LuBriefcase className="text-lg text-blue-500 dark:text-blue-400" />
                <span>{freelancer.completedJobs || 0} jobs completed</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-gray-800/80 px-4 py-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm transition-transform hover:-translate-y-0.5 duration-200">
                <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                  <FaDollarSign className="text-xs text-green-600 dark:text-green-400" />
                </div>
                <span>${freelancer.hourlyRate}/hr</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-gray-800/80 px-4 py-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm transition-transform hover:-translate-y-0.5 duration-200">
                <FaCalendarDays className="text-base text-orange-500 dark:text-orange-400" />
                <span>
                  Joined{' '}
                  {new Date(freelancer.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Architecture Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Side: About Panel Container */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-8 sm:p-10 rounded-[24px] border border-gray-100/80 dark:border-gray-800 shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)] animate-fade-in-up stagger-1 opacity-0 hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-shadow duration-300">
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-amber-500 rounded-full inline-block"></span>
              About Me
            </h3>
            <div className="text-gray-600 dark:text-gray-300 text-[15px] sm:text-[16px] leading-relaxed whitespace-pre-wrap break-words font-medium">
              {freelancer.bio || 'No bio provided yet.'}
            </div>
          </div>

          {/* Right Side: Skills Panel Container */}
          <div className="bg-white dark:bg-gray-900 p-8 sm:p-10 rounded-[24px] border border-gray-100/80 dark:border-gray-800 shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)] animate-fade-in-up stagger-2 opacity-0 hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-shadow duration-300">
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-indigo-500 rounded-full inline-block"></span>
              Skills
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {freelancer.skills && freelancer.skills.length > 0 ? (
                freelancer.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 text-[13px] font-bold px-4 py-2.5 rounded-xl border border-indigo-100 dark:border-indigo-800/50 transition-colors hover:bg-indigo-100 dark:hover:bg-indigo-800/50 cursor-default"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-400 dark:text-gray-500 font-medium italic">
                  No specific skills listed.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDetails;
