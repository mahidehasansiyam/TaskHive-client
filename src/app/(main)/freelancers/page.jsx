'use client';

import { getFreelancer } from '@/lib/api/user';
import { useEffect, useState } from 'react';
import Link from 'next/link'; // Import the Link component
import { LuBriefcase } from 'react-icons/lu';
import { FaStar } from 'react-icons/fa6';

const Freelancers = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFreelancers = async () => {
      try {
        const data = await getFreelancer();
        setFreelancers(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getFreelancers();
  }, []);

  const getInitials = name => {
    if (!name) return 'FL';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-12 text-gray-500 font-medium">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-8 py-12  min-h-screen font-sans">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          Browse Freelancers
        </h1>
        <p className="text-gray-500 text-sm font-medium">
          Find skilled professionals for your tasks
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {freelancers.map(freelancer => (
          /* Wrapped the entire card shell inside a Link tag */
          <Link
            href={`/freelancers/${freelancer._id}`}
            key={freelancer._id}
            className="group block"
          >
            <div className="bg-white p-6 h-full rounded-2xl border border-gray-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] flex flex-col justify-between items-start transition-all duration-200 hover:shadow-md hover:border-gray-200 cursor-pointer">
              <div className="w-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#e6fcf5] text-[#0ca678] font-bold text-sm flex items-center justify-center shrink-0">
                    {getInitials(freelancer.name)}
                  </div>

                  <div className="min-w-0">
                    {/* group-hover will make the text change appearance nicely when the card is clicked */}
                    <h2 className="text-lg font-bold text-gray-900 truncate group-hover:text-[#ea7a02] transition-colors">
                      {freelancer.name}
                    </h2>

                    <div className="flex items-center gap-3 text-xs font-semibold text-gray-400 mt-0.5">
                      {freelancer.rating && (
                        <div className="flex items-center gap-1 text-amber-400">
                          <FaStar className="text-xs" />
                          <span className="text-gray-500">
                            {freelancer.rating.toFixed(1)}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <LuBriefcase className="text-sm" />
                        <span>{freelancer.completedJobs || 0} jobs</span>
                      </div>
                    </div>
                  </div>
                </div>

                {freelancer.bio && (
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2 break-words">
                    {freelancer.bio}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {freelancer.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-[#f1f3f5] text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-full lowercase"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-[#fcc419] text-base font-extrabold">
                ${freelancer.hourlyRate}/hr
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Freelancers;
