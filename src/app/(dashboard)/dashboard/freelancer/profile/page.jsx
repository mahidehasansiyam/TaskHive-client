import { getUserSession } from '@/lib/core/session';
import React from 'react';

const page =async () => {
  const user = await getUserSession();
  console.log(user);
  
  return (
    <div>
      
    </div>
  );
};

export default page;