'use client';

import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import { FiFileText, FiDollarSign, FiCalendar, FiUser } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const ClientProposalsPage = ({ session, proposals }) => {
  const router = useRouter();
  const [proposalsData, setProposalsData] = useState(proposals || []);
  const [loading, setLoading] = useState(null);
 
  // Status mapping with colors and icons
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
    };
    return statusMap[status] || statusMap.pending;
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

  // Handle Accept
  const handleAccept = async proposalId => {
    setLoading(proposalId);
    router.push(`/dashboard/client/proposals/${proposalId}`);
      setLoading(null);
    
  };

  // Handle Reject
  const handleReject = async proposalId => {
    setLoading(proposalId);
    try {
      // Update status to rejected
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/proposals/reject/${proposalId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'rejected' }),
        },
      );

      if (response.ok) {
        // Update local state
        setProposalsData(prev =>
          prev.map(proposal =>
            proposal._id === proposalId
              ? { ...proposal, status: 'rejected' }
              : proposal,
          ),
        );
      } else {
        alert('Failed to reject proposal');
      }
    } catch (error) {
      console.error('Error rejecting proposal:', error);
      alert('An error occurred while rejecting the proposal');
    } finally {
      setLoading(null);
    }
  };

  // Check if proposal is pending (show buttons only for pending)
  const isPending = status => status === 'pending';

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Proposals</h1>
            <p className="text-sm text-gray-500 mt-1">
              {proposalsData?.length || 0} proposals submitted
            </p>
          </div>
        </div>

        {/* Proposals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {proposalsData?.map(proposal => {
            const statusInfo = getStatusInfo(proposal.status);
            const isPendingStatus = isPending(proposal.status);
            const isLoading = loading === proposal._id;

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
                        <span>Freelancer Email</span>
                      </div>
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {proposal.freelancer_email || 'Client'}
                      </p>
                    </div>
                  </div>

                  {/* Cover Note (if exists) */}
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

                  {/* Action Buttons - Only show for pending proposals */}
                  {isPendingStatus && (
                    <div className="mt-4 pt-3 border-t border-gray-200 flex gap-3">
                      <button
                        onClick={() => handleAccept(proposal._id)}
                        disabled={isLoading}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <>
                            <svg
                              className="animate-spin h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <FaCheckCircle className="w-4 h-4" />
                            Accept & Pay
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleReject(proposal._id)}
                        disabled={isLoading}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <>
                            <svg
                              className="animate-spin h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <FaTimesCircle className="w-4 h-4" />
                            Reject
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {(!proposalsData || proposalsData.length === 0) && (
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
};

export default ClientProposalsPage;
