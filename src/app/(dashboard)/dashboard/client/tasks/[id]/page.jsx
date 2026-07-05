import TaskDetailsClient from '@/Components/Dashboard/Client/TaskDetailsClient';
import { getProposalsByClientEmail } from '@/lib/api/proposal';
import { getTasksByTaskId } from '@/lib/api/tasks';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const TaskDetails = async ({ params }) => {
  const { id } = await params;

  const session = await getUserSession();

  // GET proposals by client email
  const allProposals = await getProposalsByClientEmail(session?.email);

  // Filter proposals that belong to this specific task
  const proposals = allProposals?.filter(p => p.task_id === id) ?? [];
  // console.log(proposals);

  // GET task by task id
  const task = await getTasksByTaskId(id);

  if (!task) {
    return (
      <div className="w-full bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-500 text-sm">
        Task details could not be found or retrieved.
      </div>
    );
  }

  return (
    <TaskDetailsClient
      initialTask={task}
      taskId={id}
      proposals={proposals} // ← pass filtered proposals
    />
  );
};

export default TaskDetails;
