import SubmitProposal from '@/Components/Dashboard/Freelancer/SubmitProposal';
import { getProposalsByFreelancerEmails } from '@/lib/api/proposal';
import { getTasksByTaskId } from '@/lib/api/tasks';
import { getUserSession } from '@/lib/core/session';

const TaskDetails = async ({ params }) => {
  const { id } = await params;

  const session = await getUserSession();

  // Get task
  const task = await getTasksByTaskId(id);

  // Get freelancer proposals
  const proposals = await getProposalsByFreelancerEmails(session?.email);

  const isFreelancer = session?.role === 'freelancer';

  // blocked check
  const isBlocked = session?.isBlocked === 'yes';

  // already submitted check
  const hasAlreadySubmitted = proposals?.some(
    proposal => proposal.task_id === task?._id,
  );

  return (
    <div>
      <SubmitProposal
        task={task}
        isFreelancer={isFreelancer}
        session={session}
        isBlocked={isBlocked}
        hasAlreadySubmitted={hasAlreadySubmitted}
      />
    </div>
  );
};

export default TaskDetails;
