import React from 'react';
import AllTasks from './AllTasks';
import { getOpenTasks } from '@/lib/api/tasks';


const page = async () => {
  
  const tasks = await getOpenTasks();
  // console.log(tasks);
  return (
    <div>
      <AllTasks tasks={tasks} />
    </div>
  );
};

export default page;