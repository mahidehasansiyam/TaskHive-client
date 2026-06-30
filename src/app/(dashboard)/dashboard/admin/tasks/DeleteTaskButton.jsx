'use client';

import { deleteTask } from '@/lib/action/task';
import { useRouter } from 'next/navigation';

const DeleteTaskButton = ({ id }) => {
  const router = useRouter();

  const handleDelete = async () => {
     
         // DELETE task
         try {
           const data = await deleteTask(id);
           if (data.deletedCount > 0) {
             router.refresh();
           }
         } catch (error) {
           console.error('Failed to delete task:', error);
         }
  };
  
  
  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
    >
      Delete
    </button>
  );
};

export default DeleteTaskButton;
