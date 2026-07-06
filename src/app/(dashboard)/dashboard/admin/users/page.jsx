

import UsersTable from '@/Components/Dashboard/Admin/UsersTable';
import { getAllUsers } from '@/lib/api/user';


const Users = async () => {
  const allUsers = await getAllUsers();

  // Remove admin users
  const users = allUsers.filter(user => user.role !== 'admin');

  return (
    <div className="p-1 md:p-6">
      <h1 className="text-2xl text-black font-bold mb-6">Users Management</h1>

      <UsersTable users={users} />
    </div>
  );
};

export default Users;







