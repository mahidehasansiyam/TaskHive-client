import { getAllTasks } from '@/lib/api/tasks';
import DeleteTaskButton from './DeleteTaskButton';

const statusStyle = status => {
  switch (status) {
    case 'completed':
      return 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20';
    case 'in progress':
      return 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20';
    default:
      return 'bg-yellow-50 text-yellow-800 ring-1 ring-inset ring-yellow-600/20';
  }
};

const Tasks = async () => {
  const allTasks = await getAllTasks();

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto bg-gray-50/50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Tasks
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your project workloads, budgets, and deadlines.
        </p>
      </div>

      {/* ── DESKTOP TABLE (md+) ── */}
      <div className="hidden md:block overflow-hidden bg-white shadow-sm ring-1 ring-gray-200 rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/70 text-xs font-semibold uppercase tracking-wider text-gray-600">
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Budget</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Deadline</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white text-sm text-gray-700">
              {allTasks?.map(task => (
                <tr
                  key={task._id}
                  className="hover:bg-gray-50/80 transition-colors duration-150"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {task.title}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                      {task.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono font-medium text-gray-900">
                    ${task.budget}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle(task.status)}`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(task.deadline).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{task.clientName}</td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <DeleteTaskButton id={task._id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── MOBILE CARDS (below md) ── */}
      <div className="md:hidden space-y-3">
        {allTasks?.map(task => (
          <div
            key={task._id}
            className="bg-white rounded-xl ring-1 ring-gray-200 shadow-sm p-4 space-y-3"
          >
            {/* Title + status */}
            <div className="flex items-start justify-between gap-3">
              <p className="font-semibold text-gray-900 text-sm leading-snug">
                {task.title}
              </p>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium shrink-0 ${statusStyle(task.status)}`}
              >
                {task.status}
              </span>
            </div>

            {/* Meta grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <div>
                <p className="text-gray-400 font-medium uppercase tracking-wide text-[10px] mb-0.5">
                  Category
                </p>
                <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                  {task.category}
                </span>
              </div>
              <div>
                <p className="text-gray-400 font-medium uppercase tracking-wide text-[10px] mb-0.5">
                  Budget
                </p>
                <p className="font-mono font-semibold text-gray-900">
                  ${task.budget}
                </p>
              </div>
              <div>
                <p className="text-gray-400 font-medium uppercase tracking-wide text-[10px] mb-0.5">
                  Deadline
                </p>
                <p className="text-gray-600">
                  {new Date(task.deadline).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-gray-400 font-medium uppercase tracking-wide text-[10px] mb-0.5">
                  Client
                </p>
                <p className="text-gray-600 truncate">{task.clientName}</p>
              </div>
            </div>

            {/* Delete button */}
            <div className="pt-2 border-t border-gray-100 flex justify-end">
              <DeleteTaskButton id={task._id} />
            </div>
          </div>
        ))}

        {/* Empty state */}
        {(!allTasks || allTasks.length === 0) && (
          <div className="bg-white rounded-xl ring-1 ring-gray-200 p-12 text-center">
            <p className="text-gray-400 text-sm">No tasks found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
