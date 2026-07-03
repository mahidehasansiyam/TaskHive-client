import React from 'react';
import AllTasks from './AllTasks';
import { getUserSession } from '@/lib/core/session';
import { getAllTasksByClientEmail } from '@/lib/api/tasks';


const page = async () => {
  const session = await getUserSession();
  // console.log(session);

  const clientEmail = session?.email;
  // console.log("Client Email:", clientEmail);
  // console.log(clientId);
   
   //  GET all task by client email 
  const tasks = await getAllTasksByClientEmail(clientEmail);
  // console.log(tasks);

  // console.log(tasks);
  return <div>
    <AllTasks tasks={tasks} />
  </div>;
};

export default page;
