import { serverFetch } from "../core/server";



// GET proposals by freelancer email 
export const getProposalsByFreelancerEmail = async (email) => {
  return serverFetch(`/proposals?freelancer_email=${email}`);
};

// GET proposals by client email
export const getProposalsByClientEmail = async (email) => {
  return serverFetch(`/proposals?client_email=${email}`);
};

// GET last 4 proposals by freelancer email
export const getLast4ProposalsByFreelancerEmail = async (email) => {
  return serverFetch(`/last4/proposals?freelancer_email=${email}`);
};


