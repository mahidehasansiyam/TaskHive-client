'use client';

import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import { FiFileText, FiDollarSign, FiCalendar, FiUser } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const ClientProposalsPage = ({ session, proposals }) => {
  const router = useRouter();
  const [proposalsData, setProposalsData] = useState(proposals || []);
  const [loading, setLoading] = useState(null);

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

    return statusMap[status] || statusMap.pending;
  };

  // Only pending shows buttons
  const isPending = status => status === 'pending';

  // Currency format
  const formatCurrency = amount => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Date format
  const formatDate = dateString => {
    const date = new Date(dateString);

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Accept
  const handleAccept = async proposalId => {
    setLoading(proposalId);

    try {
      router.push(`/dashboard/client/proposals/${proposalId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  // Reject
  const handleReject = async proposalId => {
    setLoading(proposalId);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/proposals/reject/${proposalId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: 'rejected',
          }),
        },
      );

      if (response.ok) {
        setProposalsData(prev =>
          prev.map(proposal =>
            proposal._id === proposalId
              ? {
                  ...proposal,
                  status: 'rejected',
                }
              : proposal,
          ),
        );
      } else {
        alert('Failed to reject proposal');
      }
    } catch (error) {
      console.error('Error rejecting proposal:', error);

      alert('An error occurred while rejecting proposal');
    } finally {
      setLoading(null);
    }
  };

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

        {/* Proposal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {proposalsData?.map(proposal => {
            const statusInfo = getStatusInfo(proposal.status);

            const isPendingStatus = isPending(proposal.status);

            const isLoading = loading === proposal._id;

            return (
              <div
                key={proposal._id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition overflow-hidden"
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

                {/* Body */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 truncate">
                    {proposal.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <FiDollarSign />
                        <span>Task Budget</span>
                      </div>

                      <p className="font-medium">
                        {formatCurrency(proposal.Budget || 0)}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <FiCalendar />
                        <span>Days</span>
                      </div>

                      <p className="font-medium">
                        {proposal.estimatedDays} days
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <FiFileText />
                        <span>Proposed Budget</span>
                      </div>

                      <p className="font-medium">
                        {formatCurrency(proposal.proposedBudget)}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <FiUser />
                        <span>Freelancer</span>
                      </div>

                      <p className="truncate font-medium">
                        {proposal.freelancer_email}
                      </p>
                    </div>
                  </div>

                  {/* Cover Note */}
                  {proposal.coverNote && (
                    <div className="mt-3 border-t pt-3">
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {proposal.coverNote}
                      </p>
                    </div>
                  )}

                  {/* Task Id */}
                  <div className="mt-3 text-xs text-gray-400">
                    Task ID: {proposal.task_id?.slice(-8)}
                  </div>

                  {/* Buttons */}
                  {isPendingStatus && (
                    <div className="mt-4 pt-4 border-t flex gap-3">
                      <button
                        onClick={() => handleAccept(proposal._id)}
                        disabled={isLoading}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                      >
                        Accept & Pay
                      </button>

                      <button
                        onClick={() => handleReject(proposal._id)}
                        disabled={isLoading}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {proposalsData.length === 0 && (
          <div className="text-center py-16">
            <FiFileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />

            <h3 className="text-lg font-medium">No proposals yet</h3>

            <p className="text-sm text-gray-500">No proposals available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientProposalsPage;
