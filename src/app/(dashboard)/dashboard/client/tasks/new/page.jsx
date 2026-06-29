'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@heroui/react';
import { authClient } from '@/lib/auth-client';
import { postTask } from '@/lib/action/task';

export default function PostTaskPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const onSubmit = async e => {
    e.preventDefault();

    if (!session?.user) {
      console.error('No active session found');
      return;
    }

    const formData = new FormData(e.currentTarget);
    // console.log(formData);


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
      proposals:0,
      earnings:0,
      createdAt: new Date().toISOString(),
    };
    // console.log(taskPayload);
     

    //  POST tasks
    try {
      const createTask = await postTask(taskPayload);
      router.push('/dashboard/client');
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  if (isPending) {
    return (
      <div className="text-center p-8 text-sm text-gray-500">
        Loading profile session...
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto pb-12">
      {/* Page Title & Subtitle Section */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Post a New Task
        </h1>
        <p className="text-gray-500 text-base mt-1 font-normal">
          Describe your task and set a budget to find freelancers
        </p>
      </div>

      {/* Main Content Card matching image_4014a6.png */}
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
              className="w-full px-4 py-3 rounded-xl border border-gray-200/80 bg-gray-50/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-amber-500 transition-colors"
              placeholder="e.g., Design a landing page for my startup"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-base font-semibold text-gray-900 mb-2">
              Category
            </label>
            <div className="relative max-w-xs">
              <select
                name="category"
                required
                defaultValue=""
                className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-200/80 bg-gray-50/50 text-gray-500 font-medium focus:outline-none focus:bg-white focus:border-amber-500 appearance-none transition-colors"
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-base font-semibold text-gray-900 mb-2">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200/80 bg-gray-50/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-amber-500 transition-colors resize-y"
              placeholder="Provide a detailed description of the task..."
            />
          </div>

          {/* Budget & Deadline side-by-side row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-2">
                Budget (USD)
              </label>
              <input
                name="budget"
                type="number"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200/80 bg-gray-50/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-amber-500 transition-colors"
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
                className="w-full px-4 py-3 rounded-xl border border-gray-200/80 bg-gray-50/50 text-gray-500 focus:outline-none focus:bg-white focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Action Action Buttons alignment block */}
          <div className="flex items-center gap-3 pt-4">
            <Button
              type="button"
              onClick={() => router.push('/dashboard/client')}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-6 py-3 rounded-xl transition-colors border border-gray-200/30"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="flex-1 bg-[#d97706] hover:bg-[#b45309] text-white font-bold py-3 rounded-xl transition-colors"
            >
              Post Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
