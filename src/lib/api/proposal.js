import { serverFetch } from "../core/server";



// GET last 4 task by client email 
export const getProposalsByFreelancerEmail = async (email) => {
  return serverFetch(`/proposals?freelancer_email=${email}`);
};

// GET last 4 task by client email
export const getProposalsByClientEmail = async (email) => {
  return serverFetch(`/proposals?client_email=${email}`);
};