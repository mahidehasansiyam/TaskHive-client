import TaskDetailsClient from '@/Components/Dashboard/Client/TaskDetailsClient';
import { getTasksByTaskId } from '@/lib/api/tasks';
import React from 'react';


const TaskDetails = async ({ params }) => {
  const { id } = await params;

  // GET task by task id 
  const task = await getTasksByTaskId(id);


  if (!task) {
    return (
      <div className="w-full bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-500 text-sm">
        Task details could not be found or retrieved.
      </div>
    );
  }

  return <TaskDetailsClient initialTask={task} taskId={id} />;
};

export default TaskDetails;
