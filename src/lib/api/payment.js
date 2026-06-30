import { serverFetch } from '../core/server';


// GET all tasks
export const getAllPayments = async () => {
  return serverFetch('/payments');
};

// GET payment by client email or freelancer email
export const getPaymentsByEmail = async (email) => {
  return serverFetch(`/payments/${email}`);
};
