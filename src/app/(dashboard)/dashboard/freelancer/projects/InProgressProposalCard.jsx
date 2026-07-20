import Link from 'next/link';
import {
  FaDollarSign,
  FaCalendarDays,
  FaArrowRight,
  FaUser,
} from 'react-icons/fa6';
import { FiFileText } from 'react-icons/fi';

const InProgressProposalCards = ({ proposals }) => {
  return (
    <div className="text-[#00174d] antialiased">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-[#00174d]">
          In Progress Projects
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Manage and track your active execution deliverables.
        </p>
      </div>

      {/* Grid Layout */}
      {proposals?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {proposals.map(proposal => (
            <div
              key={proposal._id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-zinc-200/80 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
<<<<<<< HEAD
              {/* Header Meta */}
              <div className="px-6 py-4 bg-[#f4f7fa] border-b border-zinc-100 flex justify-between items-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#eaf2fc] text-[#00174d] border border-[#00174d]">
                  • In Progress
                </span>
                <span className="text-zinc-500 text-xs font-medium">
                  Started:{' '}
                  {new Date(proposal.submitted_at).toLocaleDateString()}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 space-y-5">
                {/* Task title + cover note */}
                <div>
                  <h2 className="text-xl font-bold text-[#00174d] truncate">
                    {proposal.title}
                  </h2>
                  {proposal.coverNote && (
                    <p className="text-sm text-zinc-400 mt-1 line-clamp-2">
                      {proposal.coverNote}
                    </p>
                  )}
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#f4f7fa] rounded-xl p-3.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-400 uppercase tracking-wide">
                      <FaDollarSign className="w-3 h-3" />
                      Proposed Budget
                    </div>
                    <p className="text-base font-bold text-[#00174d]">
                      ${proposal.proposedBudget}
                    </p>
                  </div>

                  <div className="bg-[#f4f7fa] rounded-xl p-3.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-400 uppercase tracking-wide">
                      <FaCalendarDays className="w-3 h-3" />
                      Timeline
                    </div>
                    <p className="text-base font-bold text-[#00174d]">
                      {proposal.estimatedDays} days
                    </p>
                  </div>

                  <div className="bg-[#f4f7fa] rounded-xl p-3.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-400 uppercase tracking-wide">
                      <FaDollarSign className="w-3 h-3" />
                      Task Budget
                    </div>
                    <p className="text-base font-bold text-[#00174d]">
                      ${proposal.Budget}
                    </p>
                  </div>

                  <div className="bg-[#f4f7fa] rounded-xl p-3.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-400 uppercase tracking-wide">
                      <FaUser className="w-3 h-3" />
                      Client
                    </div>
                    <p className="text-sm font-bold text-[#00174d] truncate">
                      {proposal.client_email}
                    </p>
                  </div>
                </div>

                {/* Task ID */}
                <p className="text-[11px] text-zinc-300 font-mono">
                  #{proposal.task_id?.slice(-8)}
                </p>
              </div>

              {/* Bottom button */}
              <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0">
                <Link
                  href={`/dashboard/freelancer/projects/${proposal._id}`}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#082f99] text-white font-bold text-sm shadow-md hover:bg-[#06247a] active:scale-[0.99] transition-all group"
                >
                  Submit Project Deliverable
                  <FaArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
=======
              <div>
                {/* Header Meta */}
                <div className="px-6 py-4 bg-[#f4f7fa] border-b border-zinc-100 flex justify-between items-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#eaf2fc] text-[#00174d] border border-[#00174d]">
                    • In Progress
                  </span>

                  <span className="text-zinc-500 text-xs font-medium">
                    Started:{' '}
                    {new Date(proposal.submitted_at).toLocaleDateString()}
                  </span>
                </div>

                {/* Your existing card body */}
                <div className="p-6 sm:p-8">
                  {/* Existing content remains unchanged */}
                </div>
              </div>

              {/* Bottom button */}
              <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0">
                <Link
                  href={`/dashboard/freelancer/projects/${proposal._id}`}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#082f99] text-white font-bold text-sm shadow-md hover:bg-[#06247a] active:scale-[0.99] transition-all group"
                >
                  Submit Project Deliverable
                  <FaArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
>>>>>>> 5156408 (update README)
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 px-6 bg-white rounded-2xl border border-zinc-200">
          <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-5">
            <FiFileText className="text-3xl text-[#082f99]" />
          </div>
<<<<<<< HEAD
          <h2 className="text-2xl font-bold text-[#00174d]">
            No Active Projects
          </h2>
=======

          <h2 className="text-2xl font-bold text-[#00174d]">
            No Active Projects
          </h2>

>>>>>>> 5156408 (update README)
          <p className="text-zinc-500 text-sm mt-2 text-center max-w-md">
            You don't have any projects currently in progress. Accepted
            proposals will appear here once work begins.
          </p>
<<<<<<< HEAD
=======

>>>>>>> 5156408 (update README)
          <Link
            href="/tasks"
            className="mt-6 px-6 py-3 rounded-xl bg-[#082f99] text-white font-semibold hover:bg-[#06247a] transition"
          >
            Browse Tasks
          </Link>
        </div>
      )}
    </div>
  );
};

export default InProgressProposalCards;
