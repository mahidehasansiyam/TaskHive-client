import { getUserSession } from '@/lib/core/session';
import React from 'react';
import Profile from '../../../../../Components/Dashboard/Profile';

const Page =async () => {
  const user = await getUserSession();
  // console.log(user);
  
  return (
    <div>
      <Profile user={user} />
    </div>
  );
};

export default Page;