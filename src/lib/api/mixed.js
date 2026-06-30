import { serverFetch } from '../core/server';



// GET admin-stats
export const getAdminStats = async () => {
  return serverFetch('/admin-stats');
};

