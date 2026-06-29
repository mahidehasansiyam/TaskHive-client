import React from 'react';
import AllTasks from './AllTasks';
import { getUserSession } from '@/lib/core/session';
import { getAllTasksByClientId } from '@/lib/api/tasks';

const page = async () => {
  const session = await getUserSession();
  // console.log(session);

  const clientId = session?.id;
  // console.log(clientId);
   
   //  GET all task by task id to find summarize 
    const tasks = await getAllTasksByClientId(clientId);

  // console.log(tasks);
  return <div>
    <AllTasks tasks={tasks} />
  </div>;
};

export default page;
