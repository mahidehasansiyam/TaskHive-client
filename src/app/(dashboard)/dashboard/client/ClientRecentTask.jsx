"use client"
import React from 'react';
import TaskCard from './tasks/TaskCard';
import { deleteTask } from '@/lib/action/task';
import { useRouter } from 'next/navigation';

const ClientRecentTask = ({ tasks }) => {

  const router = useRouter();

 const handleDelete = async taskId => {
     
     // DELETE task
     try {
       const data = await deleteTask(taskId);
       if (data.deletedCount > 0) {
         router.refresh();
       }
     } catch (error) {
       console.error('Failed to delete task:', error);
     }
   };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tasks.map(task => (
        <TaskCard key={task._id} task={task} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default ClientRecentTask;