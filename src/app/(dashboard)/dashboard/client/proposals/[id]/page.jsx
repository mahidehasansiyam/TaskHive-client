
import PaymentPage from '@/Components/PaymentPage';
import React from 'react';


const Page = async ({ params }) => {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/proposals/${id}`,
  );
  const data = await response.json();
  const proposal = data.data;

  return <PaymentPage proposal={proposal} />;
};

export default Page;
