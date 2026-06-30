import { getAdminStats } from '@/lib/api/mixed';
import {
  FiUsers,
  FiBriefcase,
  FiDollarSign,
  FiCheckCircle,
  FiClock,
  FiUser,
} from 'react-icons/fi';

const AdminHomePage = async () => {
  const adminStats = await getAdminStats();

  const { tasks, payments, users } = adminStats.data;

  const totalUsers = users.totalClients + users.totalFreelancers;

  const cards = [
    {
      title: 'Total Tasks',
      value: tasks.totalTask,
      subtitle: 'All created tasks',
      icon: <FiBriefcase />,
      gradient: 'from-violet-500 via-purple-500 to-indigo-500',
    },
    {
      title: 'Open Tasks',
      value: tasks.totalOpenTask,
      subtitle: 'Awaiting proposals',
      icon: <FiClock />,
      gradient: 'from-orange-400 via-amber-500 to-yellow-500',
    },
    {
      title: 'Total Freelancers',
      value: users.totalFreelancers,
      subtitle: 'Registered freelancers',
      icon: <FiUsers />,
      gradient: 'from-green-400 via-emerald-500 to-teal-500',
    },
    {
      title: 'Revenue',
      value: `$${payments.totalRevenue}`,
      subtitle: 'Total payment received',
      icon: <FiDollarSign />,
      gradient: 'from-blue-400 via-sky-500 to-indigo-500',
    },
  ];

  return (
    <div className="min-h-screen ">
      {/* Header */}

      <div className="mb-10">
        <h1 className="text-5xl font-bold text-slate-800">Admin Dashboard</h1>

        <p className="text-gray-500 mt-3 text-lg">
          Monitor platform statistics and activity
        </p>
      </div>

      {/* Top Cards */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-lg border border-white shadow-xl p-7 hover:-translate-y-2 transition-all duration-300"
          >
            <div
              className={`absolute top-0 right-0 h-36 w-36 rounded-full bg-gradient-to-r ${card.gradient} opacity-10 blur-3xl`}
            ></div>

            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-500 text-lg">{card.title}</h3>

                <h1 className="text-5xl font-bold text-slate-800 mt-3">
                  {card.value}
                </h1>

                <p className="text-gray-400 mt-4">{card.subtitle}</p>
              </div>

              <div
                className={`bg-gradient-to-r ${card.gradient}
                h-16 w-16 rounded-2xl
                flex items-center justify-center
                text-white text-2xl shadow-lg`}
              >
                {card.icon}
              </div>
            </div>

            {/* fake graph */}

            <div className="mt-6">
              <div className="h-[2px] bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>

              <div className="flex gap-1 mt-4">
                <div className="h-3 w-8 rounded-full bg-blue-300"></div>
                <div className="h-3 w-12 rounded-full bg-purple-300"></div>
                <div className="h-3 w-5 rounded-full bg-pink-300"></div>
                <div className="h-3 w-16 rounded-full bg-green-300"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}

      <div className="grid lg:grid-cols-2 gap-8 mt-10">
        {/* Task Summary */}

        <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-violet-800 text-white p-8 shadow-xl">
          <h2 className="font-bold text-3xl mb-8">Task Summary</h2>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <FiBriefcase />
                <span>Total Tasks</span>
              </div>

              <span className="font-bold text-2xl">{tasks.totalTask}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <FiClock />
                <span>Open Tasks</span>
              </div>

              <span className="font-bold text-2xl">{tasks.totalOpenTask}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <FiCheckCircle />
                <span>Completed Tasks</span>
              </div>

              <span className="font-bold text-2xl">
                {tasks.totalCompleteTask}
              </span>
            </div>
          </div>
        </div>

        {/* User Summary */}

        <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-cyan-700 via-blue-700 to-sky-700 text-white p-8 shadow-xl">
          <h2 className="font-bold text-3xl mb-8">User Summary</h2>

          <div className="space-y-6">
            <div className="flex justify-between">
              <div className="flex gap-3 items-center">
                <FiUsers />
                <span>Total Users</span>
              </div>

              <span className="font-bold text-2xl">{totalUsers}</span>
            </div>

            <div className="flex justify-between">
              <div className="flex gap-3 items-center">
                <FiUser />
                <span>Clients</span>
              </div>

              <span className="font-bold text-2xl">{users.totalClients}</span>
            </div>

            <div className="flex justify-between">
              <div className="flex gap-3 items-center">
                <FiUsers />
                <span>Freelancers</span>
              </div>

              <span className="font-bold text-2xl">
                {users.totalFreelancers}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
