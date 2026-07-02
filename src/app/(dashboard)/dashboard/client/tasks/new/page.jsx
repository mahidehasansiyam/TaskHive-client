'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@heroui/react';
import { authClient } from '@/lib/auth-client';
import { postTask } from '@/lib/action/task';
import { BeatLoader } from 'react-spinners';

export default function PostTaskPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();

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
      proposals: 0,
      earnings: 0,
      createdAt: new Date().toISOString(),
    };

    try {
      await postTask(taskPayload);

      router.push('/dashboard/client');
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending) {
    return (
      <div className="max-w-7xl h-screen flex items-center justify-center mx-auto px-8 py-12">
        <BeatLoader color="#f59e0b" size={20} />
      </div>
    );
  }

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
          {/* Task Title */}
          <div>
            <label className="block text-base font-semibold text-gray-900 mb-2">
              Task Title
            </label>
            <input
              name="title"
              type="text"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 focus:outline-none focus:border-amber-500"
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
              disabled={isSubmitting}
              defaultValue=""
              className="w-full max-w-xs px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-amber-500"
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
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-amber-500"
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
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-amber-500"
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
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-amber-500"
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
              isDisabled={isSubmitting}
              className="flex-1 bg-[#d97706] hover:bg-[#b45309] text-white font-bold py-3 rounded-xl"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-3">
                  <BeatLoader color="#fff" size={8} />
                  <span>Posting your task...</span>
                </div>
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
