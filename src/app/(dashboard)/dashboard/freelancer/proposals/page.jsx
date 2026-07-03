
import { getProposalsByFreelancerEmail } from '@/lib/api/proposal';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import { FiFileText, FiDollarSign, FiCalendar, FiUser } from 'react-icons/fi';

const Page = async () => {
  const session = await getUserSession();
  const freelancerEmail = session?.email;

  // GET proposals by freelancer email
  const data = await getProposalsByFreelancerEmail(freelancerEmail);
  console.log(data);

  // Status mapping
  const getStatusInfo = status => {
    const statusMap = {
      accepted: {
        label: 'Accepted',
        color: 'bg-green-100 text-green-800 border-green-300',
        icon: <FaCheckCircle className="w-4 h-4 text-green-600" />,
      },

      rejected: {
        label: 'Rejected',
        color: 'bg-red-100 text-red-800 border-red-300',
        icon: <FaTimesCircle className="w-4 h-4 text-red-600" />,
      },

      pending: {
        label: 'Pending',
        color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        icon: <FaClock className="w-4 h-4 text-yellow-600" />,
      },

      'in progress': {
        label: 'In Progress',
        color: 'bg-blue-100 text-blue-800 border-blue-300',
        icon: <FaClock className="w-4 h-4 text-blue-600" />,
      },
    };

    return statusMap[status?.toLowerCase()] || statusMap.pending;
  };

  // Format currency
  const formatCurrency = amount => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = dateString => {
    const date = new Date(dateString);

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Proposals</h1>
            <p className="text-sm text-gray-500 mt-1">
              {data?.length || 0} proposals submitted
            </p>
          </div>
        </div>

        {/* Proposals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data?.map(proposal => {
                    const statusInfo = getStatusInfo(proposal.status);
        
                    return (
                      <div
                        key={proposal._id}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden"
                      >
                        {/* Status Banner */}
                        <div
                          className={`px-4 py-2 border-b ${statusInfo.color} flex items-center justify-between`}
                        >
                          <div className="flex items-center gap-2">
                            {statusInfo.icon}
        
                            <span className="font-medium text-sm">
                              {statusInfo.label}
                            </span>
                          </div>
        
                          <span className="text-xs opacity-75">
                            {formatDate(proposal.submitted_at)}
                          </span>
                        </div>
        
                        {/* Content */}
                        <div className="p-4">
                          {/* Title */}
                          <h3 className="text-lg font-semibold text-gray-900 mb-3 truncate">
                            {proposal.title}
                          </h3>
        
                          {/* Stats Grid */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gray-50 rounded-lg p-2">
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-0.5">
                                <FiDollarSign className="w-3.5 h-3.5" />
                                <span>Task Budget</span>
                              </div>
        
                              <p className="text-sm font-medium text-gray-900">
                                {formatCurrency(proposal.Budget || 0)}
                              </p>
                            </div>
        
                            <div className="bg-gray-50 rounded-lg p-2">
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-0.5">
                                <FiCalendar className="w-3.5 h-3.5" />
                                <span>Required Days</span>
                              </div>
        
                              <p className="text-sm font-medium text-gray-900">
                                {proposal.estimatedDays || proposal.estimated_days || 0}{' '}
                                days
                              </p>
                            </div>
        
                            <div className="bg-gray-50 rounded-lg p-2">
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-0.5">
                                <FiFileText className="w-3.5 h-3.5" />
                                <span>Proposed Budget</span>
                              </div>
        
                              <p className="text-sm font-medium text-gray-900">
                                {formatCurrency(
                                  proposal.proposedBudget || proposal.Budget || 0,
                                )}
                              </p>
                            </div>
        
                            <div className="bg-gray-50 rounded-lg p-2">
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-0.5">
                                <FiUser className="w-3.5 h-3.5" />
                                <span>Client Email</span>
                              </div>
        
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {proposal.client_email || 'Client'}
                              </p>
                            </div>
                          </div>
        
                          {/* Cover Note */}
                          {proposal.coverNote && (
                            <div className="mt-3 pt-3 border-t border-gray-100">
                              <p className="text-xs text-gray-500 line-clamp-2">
                                {proposal.coverNote}
                              </p>
                            </div>
                          )}
        
                          {/* Task ID */}
                          <div className="mt-2 text-xs text-gray-400 truncate">
                            Task ID: {proposal.task_id?.slice(-8) || 'N/A'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

        {/* Empty State */}
        {(!data || data.length === 0) && (
          <div className="text-center py-16">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 max-w-md mx-auto">
              <FiFileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No proposals yet
              </h3>
              <p className="text-sm text-gray-500">
                You haven't submitted any proposals. Start browsing tasks and
                submit your first proposal!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};;

export default Page;
