'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FiArrowLeft,
  FiLock,
  FiUser,
  FiBriefcase,
  FiDollarSign,
} from 'react-icons/fi';
import { FaCheckCircle } from 'react-icons/fa';
import { Button } from '@heroui/react';

const PaymentPage = ({ proposal }) => {
  const router = useRouter();
  
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Format currency
  const formatCurrency = amount => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Handle payment
  

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
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>Back to proposals</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h1 className="text-2xl font-bold text-gray-900">
              Secure Checkout
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Review and confirm your payment
            </p>
          </div>

          {/* Payment Details */}
          <div className="px-8 py-6 space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <FiBriefcase className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Task</p>
                  <p className="font-medium text-gray-900">{proposal.title}</p>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {formatCurrency(proposal.Budget || 0)}
              </span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-purple-50 p-2 rounded-lg">
                  <FiUser className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Freelancer</p>
                  <p className="font-medium text-gray-900">
                    {proposal.freelancer_email || 'Not specified'}
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {proposal.estimatedDays || proposal.estimated_days || 0} days
              </span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-green-50 p-2 rounded-lg">
                  <FiDollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Proposed Amount</p>
                  <p className="font-medium text-gray-900">
                    {formatCurrency(
                      proposal.proposedBudget || proposal.Budget || 0,
                    )}
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-500">One-time payment</span>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between py-4 border-t-2 border-gray-200 mt-2">
              <span className="text-base font-semibold text-gray-900">
                Total
              </span>
              <span className="text-2xl font-bold text-gray-900">
                {formatCurrency(
                  proposal.proposedBudget || proposal.Budget || 0,
                )}
              </span>
            </div>
          </div>

          {/* Payment Button */}
          <div></div>
          <form action="/api/checkout_sessions" method="POST">
            <input type="text" name='budget' value={proposal.proposedBudget || proposal.Budget || 0} className="hidden" />
            <input type="text" name="title" value={proposal.title} className="hidden" />
            <input type="text" name="email" value={proposal.freelancer_email} className="hidden" />
            <input type="text" name='proposalId' value={proposal._id} className="hidden" />
            
            <section>
              <Button type="submit" role="link" className="bg-orange-400 p-3 rounded-2xl w-full  mb-3 text-white font-semibold hover:bg-orange-500 transition-colors">
                {' '}
                Pay ${proposal.proposedBudget || proposal.Budget || 0}
              </Button>
            </section>
          </form>

          {/* Security Notice */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-center gap-2">
            <FiLock className="w-4 h-4 text-gray-400" />
            <p className="text-xs text-gray-500">
              Your payment is secured with end-to-end encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
