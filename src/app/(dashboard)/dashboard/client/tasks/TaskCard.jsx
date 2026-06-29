'use client';

import Link from 'next/link';
import { Button } from '@heroui/react';
import {
  FaDollarSign,
  FaCalendarDays,
  FaTrashCan,
  FaEye,
  FaUsers,
  FaWallet,
} from 'react-icons/fa6';

const TaskCard = ({ task, handleDelete }) => {
  const isEditable = task.status?.toLowerCase() === 'open';
  const isCompleted = task.status?.toLowerCase() === 'completed';

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:border-amber-100 transition-all group">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#d97706] transition-colors truncate">
            {task.title}
          </h3>

          <span
            className={`font-medium text-xs px-2.5 py-0.5 rounded-full border ${
              isCompleted
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
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-1 line-clamp-2 font-normal break-words">
          {task.description}
        </p>

        {/* Metadata */}
        <div className="flex items-center gap-3 flex-wrap mt-4 text-xs">
          <span className="bg-gray-100 text-gray-700 font-medium px-2.5 py-1 rounded-lg">
            {task.category}
          </span>

          <span className="text-gray-900 text-sm font-semibold flex items-center gap-0.5">
            <FaDollarSign className="text-gray-400 text-xs shrink-0" />
            {task.budget}
          </span>

          {task.deadline && (
            <span className="text-gray-400 font-normal flex items-center gap-1 md:ml-auto">
              <FaCalendarDays size={12} className="shrink-0" />
              {new Date(task.deadline).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          )}

          <span className="text-black font-normal flex items-center gap-1">
            <FaUsers className="text-gray-400 shrink-0" size={13} />
            {task.proposals ?? 0}{' '}
            {task.proposals === 1 ? 'proposal' : 'proposals'}
          </span>

          {isCompleted && (
            <span className="text-emerald-600 font-semibold flex items-center gap-1 bg-emerald-50/60 px-2 py-0.5 rounded-lg border border-emerald-100/50">
              <FaWallet size={12} className="shrink-0 text-emerald-500" />
              Spend: ${task.proposed_budget}
            </span>
          )}
        </div>
      </div>

      {/* Action row */}
      <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-gray-100">
        <Link
          href={`/dashboard/client/tasks/${task._id}`}
          className="no-underline"
        >
          <Button
            size="sm"
            className="bg-gray-50 hover:bg-amber-50 text-gray-700 hover:text-[#d97706] border border-gray-200/60 font-semibold text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <FaEye size={12} />
            Details
          </Button>
        </Link>

        {isEditable && (
          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => handleDelete(task._id)}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete Task"
            >
              <FaTrashCan size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
