import { getProposalsByClientEmail } from '@/lib/api/proposal';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import ClientProposalsPage from './ClientProposalsPage';

const page = async () => {
  const session = await getUserSession();
  const clientEmail = session?.email;
  
  // GET proposals by client email
  const proposals = await getProposalsByClientEmail(clientEmail)
 

  return (
    <div>
      <ClientProposalsPage session={session} proposals={proposals} ></ClientProposalsPage>
    </div>
  );
};

export default page;