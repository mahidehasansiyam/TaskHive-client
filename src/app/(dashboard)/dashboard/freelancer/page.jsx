
import FreelancerDashboardStats from '@/Components/Dashboard/Freelancer/Freelancerstats';
import React from 'react';
import RecentFreelancerProposals from './RecentFreelancerProposals';
import axios from 'axios';
import { getUserSession } from '@/lib/core/session';

const FreelancerHomePAge = async () => {
  
  const user = await getUserSession();

  //  GET proposal stats for the freelancer by freelancer email
  const { data } = await axios.get(
  `${process.env.NEXT_PUBLIC_SERVER_URL}/proposal-stats`,
  {
    params: {
      freelancer_email: user?.email
    }
  }
  );
  
  console.log("data",data);


const dashboardData = {
  totalProposals: data.totalProposal,
  pending: data.totalPending,
  accepted: data.totalAccepted,
  totalEarning: data.totalEarning,
  totalRejected: data.totalRejected,
};
  // console.log(dashboardData);

  

  return (
    <div>
      <FreelancerDashboardStats stats={dashboardData} />
      <RecentFreelancerProposals/>
    </div>
  );
};

export default FreelancerHomePAge;