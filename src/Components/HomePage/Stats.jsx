

import { getAllPayments } from '@/lib/api/payment';
import { getAllTasks } from '@/lib/api/tasks';
import { getAllUsers } from '@/lib/api/user';
import React from 'react';

export default async function Stats({ data }) {

  const user = await getAllUsers();
  const tasks = await getAllTasks();
  const freelancers = user.filter(user => user.role === 'freelancer');
  const clients = user.filter(user => user.role === 'client');
  const payment = await getAllPayments()
  const payout = payment.data.reduce(
    (total, item) => total + Number(item.finalBudget || 0),
    0,
  );

  // Fallback defaults matching the mockup values in image_89ea49.png
  const stats = data || [
    { value: `${tasks.length}`, label: 'Tasks Posted' },
    { value: `${clients.length}`, label: 'Clients' },
    { value: `${freelancers.length}`, label: 'Freelancers' },
    { value: `$${payout}`, label: 'Total Payout' },
  ];

  return (
    <section className="w-full bg- py-12 flex justify-center items-center">
      <div className="flex items-center justify-center gap-4 sm:gap-10 md:gap-14 select-none">
        {stats.map((stat, index) => (
          <React.Fragment key={index}>
            {/* Stat Item Card */}
            <div className="flex flex-col items-center text-center px-4 min-w-[100px] sm:min-w-[140px]">
              <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                {stat.value}
              </span>
              <span className="text-xs sm:text-[14px] text-gray-400 font-medium tracking-wide">
                {stat.label}
              </span>
            </div>

            {/* Subtle Divider between metric sections */}
            {index < stats.length - 1 && (
              <div
                className="h-12 w-[1px] bg-gray-100/80 self-center"
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
