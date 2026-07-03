import { getProposalsByFreelancerEmailAndStatus } from '@/lib/api/proposal';
import { getUserSession } from '@/lib/core/session';
import InProgressProposalCards from './InProgressProposalCard';

const Page = async () => {
  const user = await getUserSession();
  const freelancerEmail = user?.email;

  const proposalsByFreelancerEmailAndStatus = await getProposalsByFreelancerEmailAndStatus(freelancerEmail, 'in progress');
  
  return (
    <div>
      
      <InProgressProposalCards proposals={proposalsByFreelancerEmailAndStatus} />
    </div>
  );
};

export default Page;
