import React from 'react';
import AllTasks from './AllTasks';
import { getOpenTasks } from '@/lib/api/tasks';


const page = async ({ searchParams }) => {
  const filters = await searchParams;
  const querySearch = new URLSearchParams(filters);
  const queryString = querySearch.toString();

  console.log("SearchQuery",filters, "QueryString :", queryString);

  const {tasks, total} = await getOpenTasks(queryString);
  // console.log(tasks);
  return (
    <div>
      <AllTasks filters={filters} tasks={tasks} total={total} />
    </div>
  );
};

export default page;