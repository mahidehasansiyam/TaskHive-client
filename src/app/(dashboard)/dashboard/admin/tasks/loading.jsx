const AdminTasksSkeleton = () => {
  const statusColors = [
    'bg-emerald-100',
    'bg-yellow-100',
    'bg-yellow-100',
    'bg-emerald-100',
    'bg-emerald-100',
    'bg-orange-100',
    'bg-orange-100',
    'bg-yellow-100',
  ];

  const titleWidths = [
    'w-14',
    'w-12',
    'w-10',
    'w-16',
    'w-20',
    'w-16',
    'w-20',
    'w-52',
  ];

  const budgetWidths = [
    'w-16',
    'w-10',
    'w-10',
    'w-14',
    'w-16',
    'w-16',
    'w-14',
    'w-12',
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-8 font-sans">
      {/* Header */}
      <div className="mb-8 space-y-2">
        <div className="h-9 w-24 bg-gray-300 rounded-lg animate-pulse" />
        <div className="h-4 w-72 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Table head */}
        <div className="grid grid-cols-[2fr_1.2fr_1fr_1.2fr_1.2fr_1fr_1fr] px-6 py-4 border-b border-gray-100 gap-4">
          {['w-10', 'w-16', 'w-14', 'w-12', 'w-16', 'w-12', 'w-16'].map(
            (w, i) => (
              <div
                key={i}
                className={`h-2.5 ${w} bg-gray-200 rounded animate-pulse`}
              />
            ),
          )}
        </div>

        {/* Rows */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-[2fr_1.2fr_1fr_1.2fr_1.2fr_1fr_1fr] items-center px-6 py-5 border-b border-gray-50 last:border-0 gap-4 animate-pulse"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            {/* Title */}
            <div className={`h-4 ${titleWidths[i]} bg-gray-200 rounded`} />

            {/* Category pill */}
            <div className={`h-7 w-24 bg-gray-100 rounded-lg`} />

            {/* Budget */}
            <div
              className={`h-4 ${budgetWidths[i]} bg-gray-300 rounded font-bold`}
            />

            {/* Status badge */}
            <div className={`h-7 w-24 ${statusColors[i]} rounded-full`} />

            {/* Deadline */}
            <div className="h-4 w-24 bg-gray-100 rounded" />

            {/* Client */}
            <div className="h-4 w-12 bg-gray-100 rounded" />

            {/* Delete button */}
            <div className="h-9 w-16 bg-red-200 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTasksSkeleton;
