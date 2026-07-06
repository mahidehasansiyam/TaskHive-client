'use client';

import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import { FiFileText, FiDollarSign, FiCalendar, FiUser } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const ClientProposalsPage = ({ session, proposals }) => {
  const router = useRouter();
  const [proposalsData, setProposalsData] = useState(proposals || []);
  const [loading, setLoading] = useState(null);

  const getStatusInfo = status => {
    const statusMap = {
      accepted: {
        label: 'Accepted',
        color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dot: 'bg-emerald-500',
        icon: <FaCheckCircle className="w-3.5 h-3.5 text-emerald-500" />,
      },
      rejected: {
        label: 'Rejected',
        color: 'bg-red-50 text-red-700 border-red-200',
        dot: 'bg-red-500',
        icon: <FaTimesCircle className="w-3.5 h-3.5 text-red-500" />,
      },
      pending: {
        label: 'Pending Review',
        color: 'bg-amber-50 text-amber-700 border-amber-200',
        dot: 'bg-amber-400',
        icon: <FaClock className="w-3.5 h-3.5 text-amber-500" />,
      },
      'in progress': {
        label: 'In Progress',
        color: 'bg-blue-50 text-blue-700 border-blue-200',
        dot: 'bg-blue-500',
        icon: <FaClock className="w-3.5 h-3.5 text-blue-500" />,
      },
    };
    return statusMap[status] || statusMap.pending;
  };

  const isPending = status => status === 'pending';

  const formatCurrency = amount =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);

  const formatDate = dateString =>
    new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

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

  const handleReject = async proposalId => {
    setLoading(proposalId);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/proposals/reject/${proposalId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'rejected' }),
        },
      );
      if (response.ok) {
        setProposalsData(prev =>
          prev.map(p =>
            p._id === proposalId ? { ...p, status: 'rejected' } : p,
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
    <div className="min-h-screen bg-gray-50/70 p-1 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Proposals
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {proposalsData?.length || 0}{' '}
              {proposalsData?.length === 1 ? 'proposal' : 'proposals'} received
            </p>
          </div>
        </div>

        {/* Proposal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {proposalsData?.map(proposal => {
            const statusInfo = getStatusInfo(proposal.status);
            const isPendingStatus = isPending(proposal.status);
            const isLoading = loading === proposal._id;

            return (
              <div
                key={proposal._id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
              >
                {/* Status Banner */}
                <div
                  className={`px-5 py-3 border-b ${statusInfo.color} flex items-center justify-between`}
                >
                  <div className="flex items-center gap-2">
                    {statusInfo.icon}
                    <span className="font-semibold text-xs tracking-wide uppercase">
                      {statusInfo.label}
                    </span>
                  </div>
                  <span className="text-xs opacity-60 font-medium">
                    {formatDate(proposal.submitted_at)}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5">
                  <h3 className="text-base font-semibold text-gray-900 mb-4 truncate">
                    {proposal.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-1">
                        <FiDollarSign className="w-3 h-3" />
                        Task Budget
                      </div>
                      <p className="font-semibold text-gray-800 text-sm">
                        {formatCurrency(proposal.Budget || 0)}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-1">
                        <FiCalendar className="w-3 h-3" />
                        Timeline
                      </div>
                      <p className="font-semibold text-gray-800 text-sm">
                        {proposal.estimatedDays} days
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-1">
                        <FiFileText className="w-3 h-3" />
                        Proposed Budget
                      </div>
                      <p className="font-semibold text-gray-800 text-sm">
                        {formatCurrency(proposal.proposedBudget)}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-1">
                        <FiUser className="w-3 h-3" />
                        Freelancer
                      </div>
                      <p className="truncate font-semibold text-gray-800 text-sm">
                        {proposal.freelancer_email}
                      </p>
                    </div>
                  </div>

                  {/* Cover Note */}
                  {proposal.coverNote && (
                    <div className="mt-4 p-3 bg-blue-50/50 border border-blue-100 rounded-xl">
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                        "{proposal.coverNote}"
                      </p>
                    </div>
                  )}

                  {/* Task ID */}
                  <div className="mt-3 text-[11px] text-gray-300 font-mono">
                    #{proposal.task_id?.slice(-8)}
                  </div>

                  {/* Action Buttons */}
                  {isPendingStatus && (
                    <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2.5">
                      <button
                        onClick={() => handleAccept(proposal._id)}
                        disabled={isLoading}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-xl transition-all duration-150"
                      >
                        {isLoading ? 'Processing…' : 'Accept & Pay'}
                      </button>
                      <button
                        onClick={() => handleReject(proposal._id)}
                        disabled={isLoading}
                        className="flex-1 bg-white hover:bg-red-50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-red-600 text-sm font-semibold py-2.5 rounded-xl border border-red-200 hover:border-red-300 transition-all duration-150"
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
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FiFileText className="w-7 h-7 text-gray-300" />
            </div>
            <h3 className="text-base font-semibold text-gray-700 mb-1">
              No proposals yet
            </h3>
            <p className="text-sm text-gray-400">
              Proposals submitted for your tasks will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientProposalsPage;
