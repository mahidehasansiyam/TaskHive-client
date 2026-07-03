import Link from 'next/link';
import { FaDollarSign, FaCalendarDays, FaArrowRight, FaUser } from 'react-icons/fa6';
import { FiFileText } from 'react-icons/fi';

const InProgressProposalCards = ({ proposals }) => {
  return (
    <div className="text-[#00174d] antialiased">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-[#00174d]">
          In Progress Projects
        </h1>
        <p className="text-sm text-zinc-500 mt-1">Manage and track your active execution deliverables.</p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {proposals?.map((proposal) => (
          <div
            key={proposal._id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-zinc-200/80 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Header Meta */}
              <div className="px-6 py-4 bg-[#f4f7fa] border-b border-zinc-100 flex justify-between items-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#eaf2fc] text-[#00174d] border border-[#00174d]">
                  • In Progress
                </span>
                <span className="text-zinc-500 text-xs font-medium">
                  Started: {new Date(proposal.submitted_at).toLocaleDateString()}
                </span>
              </div>

              {/* Card Main Body */}
              <div className="p-6 sm:p-8">
                {/* Title */}
                <h2 className="text-2xl font-bold text-[#00174d] mb-6 leading-snug line-clamp-2 min-h-[3.5rem]">
                  {proposal.title}
                </h2>

                {/* Info Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Proposal Rates Box */}
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-white border-2 border-[#00174d]">
                    <div className="text-[#082f99] mt-0.5">
                      <FaDollarSign className="text-lg" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#082f99] uppercase tracking-wide">Your Proposal</p>
                      <p className="text-2xl font-black text-[#00174d] mt-0.5">${proposal.proposedBudget}</p>
                      <p className="text-[11px] text-zinc-400 mt-0.5">Task budget: ${proposal.Budget}</p>
                    </div>
                  </div>

                  {/* Days Box */}
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-white border-2 border-[#00174d]">
                    <div className="text-[#00174d] mt-0.5">
                      <FaCalendarDays className="text-lg" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-500 uppercase tracking-wide">Timeline</p>
                      <p className="text-2xl font-black text-[#00174d] mt-0.5">{proposal.estimatedDays} Days</p>
                      <p className="text-[11px] text-zinc-400 mt-0.5">Allocated duration</p>
                    </div>
                  </div>
                </div>

                {/* Client Meta Row */}
                <div className="flex items-center gap-3 mt-5 py-3 border-b border-zinc-100">
                  <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-[#00174d] text-xs border border-[#00174d]">
                    <FaUser />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Client Contact</p>
                    <p className="text-sm font-semibold text-[#00174d] truncate max-w-[280px]">
                      {proposal.client_email}
                    </p>
                  </div>
                </div>

                {/* Cover Note Text Block */}
                <div className="mt-5">
                  <div className="flex items-center gap-2 text-[#00174d] mb-2">
                    <FiFileText className="text-xs text-zinc-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#00174d]">Initial Cover Note</span>
                  </div>
                  <p className="text-sm text-zinc-600 line-clamp-3 bg-zinc-50 rounded-xl p-3 border border-zinc-100 leading-relaxed">
                    {proposal.coverNote || "No initial note description provided."}
                  </p>
                </div>
              </div>
            </div>

            {/* Sticky Submission Bottom Row */}
            <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0">
              <Link
                href={`/dashboard/freelancer/projects/${proposal._id}`}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#082f99] text-white font-bold text-sm shadow-md hover:bg-[#06247a] active:scale-[0.99] transition-all group"
              >
                Submit Project Deliverable
                <FaArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InProgressProposalCards;