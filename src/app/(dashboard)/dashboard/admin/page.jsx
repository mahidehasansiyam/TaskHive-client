import { getAllTasks } from '@/lib/api/tasks';
import React from 'react';

const AdminHomePage =async () => {
  const allTasks = await getAllTasks();
  console.log(allTasks);
  return (
    <div>
     
    </div>
  );
};

export default AdminHomePage;