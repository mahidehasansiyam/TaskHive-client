import { getFreelancerByid } from '@/lib/api/user';
import React from 'react';
import { LuBriefcase } from 'react-icons/lu';
import { FaDollarSign, FaCalendarDays } from 'react-icons/fa6';

const FreelancerDetails = async ({ params }) => {
  const { id } = await params;
  const freelancer = await getFreelancerByid(id);

  if (!freelancer) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-12 text-gray-500 font-medium">
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
    <div className="max-w-6xl mx-auto px-1 md:px-8 py-12  min-h-screen font-sans">
      {/* Top Identity Header Row */}
      <div className="flex items-center gap-6 mb-10">
        {/* Rounded Mint Avatar Container */}
        <div className="w-24 h-24 rounded-full bg-[#e6fcf5] text-[#0ca678] font-bold text-2xl flex items-center justify-center shrink-0">
          {getInitials(freelancer.name)}
        </div>

        {/* Identity Details */}
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2.5">
            {freelancer.name || 'Freelancer'}
          </h1>

          {/* Metadata Statistics Strip */}
          <div className="flex flex-wrap items-center gap-5 text-sm font-semibold text-gray-400">
            <div className="flex items-center gap-1.5">
              <LuBriefcase className="text-base text-gray-400" />
              <span>{freelancer.completedJobs || 0} jobs completed</span>
            </div>
            <div className="flex items-center gap-1">
              <FaDollarSign className="text-sm text-gray-400" />
              <span>${freelancer.hourlyRate}/hr</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaCalendarDays className="text-sm text-gray-400" />
              <span>
                Joined{' '}
                {new Date(freelancer.createdAt).toLocaleDateString('en-US', {
                  month: 'numeric',
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
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.03)]">
          <h3 className="text-xl font-bold text-gray-900 mb-4">About</h3>
          <p className="text-gray-500 text-base leading-relaxed whitespace-pre-wrap break-words">
            {freelancer.bio || 'No bio provided.'}
          </p>
        </div>

        {/* Right Side: Skills Panel Container */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.03)]">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {freelancer.skills && freelancer.skills.length > 0 ? (
              freelancer.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-[#f1f3f5] text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-400 font-medium">
                None specified
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDetails;
