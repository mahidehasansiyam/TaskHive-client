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

const SubmitProposal = ({ task, isFreelancer, session }) => {
  const [proposedBudget, setProposedBudget] = useState('');
  const [estimatedDays, setEstimatedDays] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  if (!task) {
    return (
      <div className="p-8 text-center text-gray-500 text-sm">
        Loading task data...
      </div>
    );
  }

  const handleProposalSubmit = async e => {
    e.preventDefault();

    if (loading) return;

    // check login/session
    if (!session?.email) {
      toast.error('Please login first');
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
      console.log('Submitting:', proposalData);

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

      console.log('Status:', response.status);

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const data = await response.json();

      console.log('Response:', data);

      if (data.insertedId) {
        toast.success('Proposal submitted successfully');

        // clear form
        setProposedBudget('');
        setEstimatedDays('');
        setCoverNote('');

        router.push('/dashboard/freelancer');
      } else {
        toast.error(data.message || 'Failed to submit proposal');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-gray-200 text-gray-700 border-2 border-gray-200 px-3 py-1 rounded-full text-xs">
            {task.category}
          </span>

          <span className="bg-green-100 border-2 border-green-200 text-green-600 px-3 py-1 rounded-full text-xs capitalize">
            {task.status}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">{task.title}</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Description</h3>

              <p className="text-gray-600 text-sm">{task.description}</p>
            </div>

            {/* Proposal Form */}
            {isFreelancer && (
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <FaPaperPlane className="text-orange-500" />
                  <h3 className="font-semibold text-gray-900">
                    Submit a Proposal
                  </h3>
                </div>

                <form onSubmit={handleProposalSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-700 block mb-1">
                        Proposed Budget (USD)
                      </label>

                      <input
                        type="number"
                        placeholder="e.g. 50"
                        value={proposedBudget}
                        onChange={e => setProposedBudget(e.target.value)}
                        className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm text-gray-700 block mb-1">
                        Estimated Days
                      </label>

                      <input
                        type="number"
                        placeholder="e.g. 3"
                        value={estimatedDays}
                        onChange={e => setEstimatedDays(e.target.value)}
                        className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-700 block mb-1">
                      Cover Note
                    </label>

                    <textarea
                      rows={4}
                      placeholder="Explain why you're the best fit for this task..."
                      value={coverNote}
                      onChange={e => setCoverNote(e.target.value)}
                      className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-[#f59e0b] to-[#ea580c] rounded-lg text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Submitting...' : 'Submit Proposal'}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <FaDollarSign className="text-orange-500 text-lg" />
              <div>
                <p className="text-sm text-gray-500">Budget</p>
                <p className="text-orange-500 font-bold text-lg">
                  ${task.budget}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaCalendarDays className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Deadline</p>
                <p className="font-medium">
                  {new Date(task.deadline).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaClock className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Posted</p>
                <p className="font-medium">
                  {new Date(task.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaUser className="text-gray-400" />
              <div className="min-w-0">
                <p className="text-sm text-gray-500">Client</p>

                <p className="font-medium truncate">{task.clientEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitProposal;
