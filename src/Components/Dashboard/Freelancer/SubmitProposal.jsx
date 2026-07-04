'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
  FaDollarSign,
  FaCalendarDays,
  FaClock,
  FaUser,
  FaPaperPlane,
} from 'react-icons/fa6';
import { toast } from 'react-toastify';

const SubmitProposal = ({
  task,
  isFreelancer,
  session,
  isBlocked,
  hasAlreadySubmitted,
}) => {
  const [proposedBudget, setProposedBudget] = useState('');
  const [estimatedDays, setEstimatedDays] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  if (!task) {
    return <div className="p-8 text-center text-gray-500">Loading task...</div>;
  }

  const handleProposalSubmit = async e => {
    e.preventDefault();

    if (loading) return;

    // Login check
    if (!session?.email) {
      toast.error('Please login first');
      return;
    }

    // blocked check
    if (isBlocked) {
      toast.error('Your account has been blocked by administrator');
      return;
    }

    // duplicate proposal check
    if (hasAlreadySubmitted) {
      toast.error('You already submitted a proposal for this task');
      return;
    }

    setLoading(true);

    const proposalData = {
      title: task.title,
      Budget: task.budget,
      proposedBudget: Number(proposedBudget),
      estimatedDays: Number(estimatedDays),
      coverNote,
      task_id: task._id,
      client_email: task.clientEmail,
      freelancer_email: session.email,
      status: 'pending',
      submitted_at: new Date(),
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/proposals`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(proposalData),
        },
      );

      if (!response.ok) {
        throw new Error(`Server Error ${response.status}`);
      }

      const data = await response.json();

      if (data.insertedId) {
        toast.success('Proposal submitted successfully');

        setProposedBudget('');
        setEstimatedDays('');
        setCoverNote('');

        router.push('/dashboard/freelancer');
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const disableForm = loading || isBlocked || hasAlreadySubmitted;

  return (
    <div className="bg-gray-50 min-h-screen p-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* badges */}

        <div className="flex items-center gap-3 mb-3">
          <span className="bg-gray-200 px-3 py-1 rounded-full text-xs">
            {task.category}
          </span>

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
            {task.status}
          </span>
        </div>

        <h1 className="text-3xl font-bold mb-8">{task.title}</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* LEFT */}

          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border">
              <h3 className="font-semibold mb-3">Description</h3>

              <p className="text-gray-600">{task.description}</p>
            </div>

            {isFreelancer && (
              <div className="bg-white p-6 rounded-2xl border">
                <div className="flex items-center gap-2 mb-5">
                  <FaPaperPlane className="text-orange-500" />
                  <h3 className="font-semibold">Submit Proposal</h3>
                </div>

                {/* blocked warning */}

                {isBlocked && (
                  <div className="mb-4 p-4 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-red-600 font-medium">
                      Your account has been blocked by administrator. You cannot
                      submit proposals.
                    </p>
                  </div>
                )}

                {/* already submitted */}

                {hasAlreadySubmitted && (
                  <div className="mb-4 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                    <p className="text-yellow-700 font-medium">
                      You already submitted a proposal for this task.
                    </p>
                  </div>
                )}

                <form onSubmit={handleProposalSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Budget"
                      value={proposedBudget}
                      onChange={e => setProposedBudget(e.target.value)}
                      disabled={disableForm}
                      className="w-full px-3 py-2 rounded bg-gray-100 border"
                      required
                    />

                    <input
                      type="number"
                      placeholder="Estimated Days"
                      value={estimatedDays}
                      onChange={e => setEstimatedDays(e.target.value)}
                      disabled={disableForm}
                      className="w-full px-3 py-2 rounded bg-gray-100 border"
                      required
                    />
                  </div>

                  <textarea
                    rows={4}
                    placeholder="Cover Note"
                    value={coverNote}
                    onChange={e => setCoverNote(e.target.value)}
                    disabled={disableForm}
                    className="w-full px-3 py-2 rounded bg-gray-100 border"
                    required
                  />

                  <button
                    type="submit"
                    disabled={disableForm}
                    className={`w-full py-3 rounded-lg font-semibold
                    ${
                      disableForm
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#f59e0b] to-[#ea580c]'
                    }`}
                  >
                    {loading
                      ? 'Submitting...'
                      : isBlocked
                        ? 'Account Blocked'
                        : hasAlreadySubmitted
                          ? 'Already Submitted'
                          : 'Submit Proposal'}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* RIGHT */}

          <div className="bg-white p-6 rounded-2xl border space-y-6">
            <div className="flex items-center gap-3">
              <FaDollarSign className="text-orange-500" />
              <div>
                <p className="text-sm text-gray-500">Budget</p>

                <p className="font-bold text-orange-500">${task.budget}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaCalendarDays />
              <div>
                <p className="text-sm text-gray-500">Deadline</p>

                <p>{new Date(task.deadline).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaClock />
              <div>
                <p className="text-sm text-gray-500">Posted</p>

                <p>{new Date(task.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaUser />
              <div>
                <p className="text-sm text-gray-500">Client</p>

                <p>{task.clientEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitProposal;
