'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@heroui/react';
import {
  FaArrowLeft,
  FaPenToSquare,
  FaTrashCan,
  FaDollarSign,
  FaCalendarDays,
} from 'react-icons/fa6';
import { updateTask } from '@/lib/action/task';
import { toast } from 'react-toastify';
import ClientProposalsPage from '@/app/(dashboard)/dashboard/client/proposals/ClientProposalsPage';


export default async function TaskDetailsClient({ initialTask, taskId, proposals }) {
  const router = useRouter();
  const [task, setTask] = useState(initialTask);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Enforce condition: Edit option is only available when status is strictly 'open'
  const isEditable = task.status?.toLowerCase() === 'open';

    

  // Process data updates via form submit
  const handleUpdate = async e => {
    e.preventDefault();
    if (!isEditable) return; // Safeguard block
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const updatedPayload = {
      title: formData.get('title'),
      description: formData.get('description'),
      budget: parseFloat(formData.get('budget') || '0'),
      deadline: formData.get('deadline'),
    };
    

    // PATCH Task
    try {
      const res = await updateTask(taskId, updatedPayload)
      if (res.modifiedCount>0) {
        toast.success('Task updated successfully!');
        router.push('/dashboard/client/tasks');
      } else {
        console.log('Update failed:', res.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }

  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header Action Bar */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-xl text-gray-600 transition-colors"
        >
          <FaArrowLeft size={16} />
        </button>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight break-words">
          {task.title}
        </h1>
      </div>

      {/* Primary Details Card Component */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`font-medium text-xs px-2.5 py-0.5 rounded-full border ${
              task.status?.toLowerCase() === 'completed'
                ? 'bg-[#f0fdf4] text-[#16a34a] border-[#bbf7d0]/30'
                : task.status?.toLowerCase() === 'in progress'
                  ? 'bg-[#fef3c7] text-[#d97706] border-[#fde68a]/30'
                  : 'bg-[#eff6ff] text-[#3b82f6] border-[#dbeafe]/40'
            }`}
          >
            {task.status
              ? task.status.charAt(0).toUpperCase() + task.status.slice(1)
              : 'Open'}
          </span>
          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-lg">
            {task.category}
          </span>
          <span className="text-gray-900 text-sm font-semibold flex items-center gap-0.5 ml-2">
            <FaDollarSign className="text-gray-400 text-xs shrink-0" />
            {task.budget}
          </span>
          {task.deadline && (
            <span className="text-gray-400 text-xs font-normal flex items-center gap-1 ml-2">
              <FaCalendarDays size={12} className="shrink-0" />
              {new Date(task.deadline).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          )}
        </div>

        {/* FIXED: 'break-words' explicitly handles un-spaced overflow strings cleanly */}
        <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line font-normal break-words">
          {task.description}
        </p>

        {/* Action Toggle Strip */}
        <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
          {/* Edit button is now conditional based on status === 'open' */}
          {isEditable && (
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white hover:bg-gray-50 text-gray-700 font-semibold text-sm px-4 py-2 border border-gray-200/80 rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <FaPenToSquare size={13} className="text-gray-500" />
              Edit
            </Button>
          )}

        </div>
      </div>

      {/* Form container renders only when editable criteria matches true */}
      {isEditable && isEditing && (
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm transition-all duration-200 animate-in fade-in slide-in-from-top-4">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Edit Task</h2>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Title
              </label>
              <input
                name="title"
                type="text"
                required
                defaultValue={task.title}
                className="w-full px-4 py-3 rounded-xl border border-gray-200/80 bg-gray-50/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Description
              </label>
              <textarea
                name="description"
                rows={5}
                required
                defaultValue={task.description}
                className="w-full px-4 py-3 rounded-xl border border-gray-200/80 bg-gray-50/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-amber-500 transition-colors resize-y"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Budget (USD)
                </label>
                <input
                  name="budget"
                  type="number"
                  required
                  defaultValue={task.budget}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200/80 bg-gray-50/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-amber-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Deadline
                </label>
                <input
                  name="deadline"
                  type="date"
                  required
                  defaultValue={task.deadline}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200/80 bg-gray-50/50 text-gray-700 focus:outline-none focus:bg-white focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#d97706] hover:bg-[#b45309] text-white font-bold px-6 py-3 rounded-xl transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Saving changes...' : 'Save Changes'}
              </Button>
              <Button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-5 py-3 rounded-xl transition-colors"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div>
        <ClientProposalsPage proposals={proposals} />
      </div>
    </div>
  );
}
