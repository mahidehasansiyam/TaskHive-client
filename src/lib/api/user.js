import { serverFetch } from "../core/server";


// GET all users 
export const getAllUsers = async () => {
  return serverFetch('/users');
};

// GET Freelancers
export const getFreelancer = async () => {
  return serverFetch('/freelancers');
};

// GET Freelancers by freelancer id
export const getFreelancerByid = async (freelancerId) => {
  return serverFetch(`/freelancers/${freelancerId}`);
};