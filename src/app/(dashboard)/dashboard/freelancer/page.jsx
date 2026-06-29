
import FreelancerDashboardStats from '@/Components/Dashboard/Freelancer/Freelancerstats';
import React from 'react';

const FreelancerHomePAge = () => {

  const dashboardData = {
    totalProposals: 4,
    pending: 1,
    accepted: 2,
    totalEarned: 677,
  };

  return (
    <div>
      <FreelancerDashboardStats stats={dashboardData} />
    </div>
  );
};

export default FreelancerHomePAge;