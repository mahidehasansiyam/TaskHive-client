import { serverFetch } from "../core/server";

// GET proposals by freelancer email 
export const getProposalsByFreelancerEmail = async (email) => {
  return serverFetch(`/proposals?freelancer_email=${email}`);
};


// GET last 4 proposals by freelancer email
export const getLast4ProposalsByFreelancerEmail = async (email) => {
  return serverFetch(`/last4/proposals?freelancer_email=${email}`);
};

// GET proposals by freelancer email and status = in progress
export const getProposalsByFreelancerEmailAndStatus = async (email, status) => {
  return serverFetch(`/proposals?freelancer_email=${email}&status=${status}`);
};

// GET proposals by client email
export const getProposalsByClientEmail = async (email) => {
  return serverFetch(`/proposals?client_email=${email}`);
};

// GET proposal by proposal id
export const getProposalById = async (id) => {
  return serverFetch(`/proposals/${id}`);
}

