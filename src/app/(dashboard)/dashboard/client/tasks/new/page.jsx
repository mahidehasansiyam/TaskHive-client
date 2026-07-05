'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@heroui/react';
import { authClient } from '@/lib/auth-client';
import { postTask } from '@/lib/action/task';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';

export default function PostTaskPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check blocked status
  const isUserBlocked = session?.user?.isBlocked === 'yes';

  const onSubmit = async e => {
    e.preventDefault();

    // Extra protection
    if (isUserBlocked) {
      toast.error('Your account has been blocked by the administrator');
      return;
    }

    if (!session?.user) {
      console.error('No active session found');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const taskPayload = {
      clientId: session.user.id,
      clientName: session.user.name,
      clientEmail: session.user.email,
      title: formData.get('title'),
      category: formData.get('category'),
      description: formData.get('description'),
      budget: parseFloat(formData.get('budget') || '0'),
      deadline: formData.get('deadline'),
      status: 'open',
      createdAt: new Date().toISOString(),
    };

    try {
      await postTask(taskPayload);

      toast.success('Task posted successfully!');

      window.location.href = '/dashboard/client';
    } catch (error) {
      console.error('Submission failed:', error);
      toast.error('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  

  return (
    <div className="w-full max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900">Post a New Task</h1>

        <p className="text-gray-500 mt-1">
          Describe your task and set a budget to find freelancers
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Block Warning */}
          {isUserBlocked && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="text-red-600 font-medium">
                Your account has been blocked by the administrator. You cannot
                post new tasks.
              </p>
            </div>
          )}

          {/* Task Title */}
          <div>
            <label className="block text-base font-semibold text-gray-900 mb-2">
              Task Title
            </label>

            <input
              name="title"
              type="text"
              required
              disabled={isSubmitting || isUserBlocked}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-black bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none focus:border-amber-500"
              placeholder="e.g., Design a landing page"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-base font-semibold text-gray-900 mb-2">
              Category
            </label>

            <select
              name="category"
              required
              disabled={isSubmitting || isUserBlocked}
              defaultValue=""
              className="w-full max-w-xs px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-black disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none focus:border-amber-500"
            >
              <option value="" disabled>
                Select a category
              </option>

              <option value="Development">Development</option>

              <option value="Design">Design</option>

              <option value="Marketing">Marketing</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-base font-semibold text-gray-900 mb-2">
              Description
            </label>

            <textarea
              name="description"
              rows={4}
              required
              disabled={isSubmitting || isUserBlocked}
              className="w-full px-4 py-3 text-black rounded-xl border border-gray-200 bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none focus:border-amber-500"
              placeholder="Provide task details..."
            />
          </div>

          {/* Budget + Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-2">
                Budget (USD)
              </label>

              <input
                name="budget"
                type="number"
                required
                disabled={isSubmitting || isUserBlocked}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-black bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none focus:border-amber-500"
                placeholder="500"
              />
            </div>

            <div>
              <label className="block text-base font-semibold text-gray-900 mb-2">
                Deadline
              </label>

              <input
                name="deadline"
                type="date"
                required
                disabled={isSubmitting || isUserBlocked}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-black bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <Button
              type="button"
              isDisabled={isSubmitting}
              onClick={() => router.push('/dashboard/client')}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-xl"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              isDisabled={isSubmitting || isUserBlocked}
              className={`flex-1 font-bold py-3 rounded-xl ${
                isUserBlocked
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#d97706] hover:bg-[#b45309] text-white'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-3">
                  <BeatLoader color="#fff" size={8} />
                  <span>Posting your task...</span>
                </div>
              ) : isUserBlocked ? (
                'Account Blocked'
              ) : (
                'Post Task'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
