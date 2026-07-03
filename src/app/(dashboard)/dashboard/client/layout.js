
import { requireRole } from '@/lib/core/session';
import { ToastContainer } from 'react-toastify';


const ClientLayout = async ({ children }) => {
  await requireRole('client');
  return children;
};

export default ClientLayout;
