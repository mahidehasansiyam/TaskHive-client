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

  // Fallback defaults matching the mockup values
  const stats = data || [
    { value: `${tasks.length}`, label: 'Tasks Posted' },
    { value: `${clients.length}`, label: 'Clients' },
    { value: `${freelancers.length}`, label: 'Freelancers' },
    { value: `$${payout}`, label: 'Total Payout' },
  ];

  return (
    <section className="w-full bg-[#fafafa] dark:bg-gray-950 py-12 flex justify-center items-center border-y border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-10 md:gap-14 select-none">
        {stats.map((stat, index) => (
          <React.Fragment key={index}>
            {/* Stat Item Card */}
            <div className="flex flex-col items-center text-center px-4 min-w-[100px] sm:min-w-[140px] transition-transform hover:scale-105 duration-300">
              <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
                {stat.value}
              </span>
              <span className="text-xs sm:text-[14px] text-gray-400 dark:text-gray-500 font-medium tracking-wide">
                {stat.label}
              </span>
            </div>

            {/* Subtle Divider between metric sections */}
            {index < stats.length - 1 && (
              <div
                className="hidden sm:block h-12 w-[1px] bg-gray-200 dark:bg-gray-800 self-center"
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
