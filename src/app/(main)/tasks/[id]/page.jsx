import SubmitProposal from "@/Components/Dashboard/Freelancer/SubmitProposal";
import { getTasksByTaskId } from "@/lib/api/tasks";
import { getUserSession } from "@/lib/core/session";


const TaskDetails = async ({ params }) => {
  const { id } = await params;

  // GET task by task id
  const task = await getTasksByTaskId(id);

  const session = await getUserSession();
  // console.log(session);

  const isFreelancer = session?.role === 'freelancer';

  return (
    <div>
      <SubmitProposal task={task} isFreelancer={isFreelancer} session={session} />
    </div>
  );
};

export default TaskDetails;
