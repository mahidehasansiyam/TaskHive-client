import Link from 'next/link';
import { getProposalById } from '@/lib/api/proposal';
import { FaDollarSign, FaCalendarDays, FaUser, FaArrowLeft, FaMessage } from 'react-icons/fa6';
import SubmissionForm from './SubmissionForm';


const Page = async ({ params }) => {
  const { id } = await params;
  const proposal = await getProposalById(id);
  const data = proposal.data;
  

  return (
    <div className="min-h-screen bg-[#f4f7fa] text-[#00174d] antialiased p-4 sm:p-6 lg:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <Link 
              href="/dashboard/freelancer" 
              className="inline-flex items-center gap-2 text-sm font-medium text-[#00174d] hover:underline mb-3 group"
            >
              <FaArrowLeft className="text-xs group-hover:-translate-x-0.5 transition-transform" />
              Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold tracking-tight text-[#00174d]">Submit Project</h1>
            <p className="text-sm text-zinc-600 mt-1">Deliver your completed project and notify the client.</p>
          </div>
          
          <div>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-[#eaf2fc] text-[#00174d] border border-[#00174d] capitalize">
              • {data.status || 'In Progress'}
            </span>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Side: Proposal Overview Display */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 sm:p-8">
              <span className="text-xs font-bold text-[#082f99] uppercase tracking-wider block mb-1">
                Project Overview
              </span>
              <h2 className="text-3xl font-bold text-[#00174d] mb-6">{data.title}</h2>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-zinc-100 pb-6">
                <div className="flex items-start gap-4 p-5 rounded-xl bg-white border-2 border-[#00174d]">
                  <div className="text-[#082f99] mt-1">
                    <FaDollarSign className="text-xl" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#082f99] uppercase tracking-wide">Your Proposal</p>
                    <p className="text-3xl font-black text-[#00174d] mt-1">${data.proposedBudget}</p>
                    <p className="text-xs text-zinc-500 mt-1">Original budget: ${data.Budget}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-xl bg-white border-2 border-[#00174d]">
                  <div className="text-[#00174d] mt-1">
                    <FaCalendarDays className="text-xl" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-wide">Timeline</p>
                    <p className="text-3xl font-black text-[#00174d] mt-1">{data.estimatedDays} Days</p>
                    <p className="text-xs text-zinc-500 mt-1">Estimated delivery duration</p>
                  </div>
                </div>
              </div>

              {/* Client Email Info Row */}
              <div className="flex items-center gap-3 py-4 border-b border-zinc-100">
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-[#00174d] border-2 border-[#00174d]">
                  <FaUser />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-bold">Client Email</p>
                  <p className="text-sm font-semibold text-[#00174d] truncate">{data.client_email}</p>
                </div>
              </div>

              {/* Cover Note Section */}
              <div className="mt-6">
                <h3 className="text-xs font-bold text-[#00174d] uppercase tracking-wider flex items-center gap-2 mb-3">
                  <FaMessage className="text-[#00174d] text-xs" />
                  Initial Cover Note
                </h3>
                <div className="bg-white rounded-xl p-4 border-2 border-[#00174d] text-sm text-[#00174d] min-h-[80px] whitespace-pre-line">
                  {data.coverNote}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: The Interactive Form Component */}
          <SubmissionForm proposalId={data._id} />

        </div>
      </div>
    </div>
  );
};

export default Page;