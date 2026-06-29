import { getAllTasksByClientId } from '@/lib/api/tasks';
import { getUserSession } from '@/lib/core/session';


const page = async () => {
  const user = await getUserSession();
  const clientId = user?.id;
  //  GET all task by client id
  const tasks = await getAllTasksByClientId(clientId);
  console.log(tasks);
  return (
    <div>
      
    </div>
  );
};

export default page;