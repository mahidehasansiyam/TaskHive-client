import { getAllTasks } from '@/lib/api/tasks';
import DeleteTaskButton from './DeleteTaskButton';

const Tasks = async () => {
  const allTasks = await getAllTasks();

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50/50 min-h-screen">
      {/* Header Section */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Tasks
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your project workloads, budgets, and deadlines.
          </p>
        </div>
      </div>

      {/* Modern Table Container */}
      <div className="overflow-hidden bg-white shadow-sm ring-1 ring-gray-200 rounded-xl">
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
                  {/* Title */}
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {task.title}
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                      {task.category}
                    </span>
                  </td>

                  {/* Budget */}
                  <td className="px-6 py-4 font-mono font-medium text-gray-900">
                    ${task.budget}
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        task.status === 'completed'
                          ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20'
                          : 'bg-yellow-50 text-yellow-800 ring-1 ring-inset ring-yellow-600/20'
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>

                  {/* Deadline */}
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(task.deadline).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>

                  {/* Client */}
                  <td className="px-6 py-4 text-gray-500">{task.clientName}</td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <DeleteTaskButton id={task._id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
