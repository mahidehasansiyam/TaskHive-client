const UserManagementSkeleton = () => {
  const roleColors = [
    'bg-purple-100',
    'bg-blue-100',
    'bg-purple-100',
    'bg-blue-100',
    'bg-purple-100',
    'bg-purple-100',
    'bg-purple-100',
    'bg-purple-100',
  ];

  const nameWidths = [
    'w-14',
    'w-20',
    'w-10',
    'w-20',
    'w-24',
    'w-36',
    'w-20',
    'w-28',
  ];

  const emailWidths = [
    'w-32',
    'w-36',
    'w-28',
    'w-36',
    'w-52',
    'w-56',
    'w-44',
    'w-52',
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-8 font-sans">
      {/* Header */}
      <div className="mb-6">
        <div className="h-8 w-52 bg-gray-300 rounded-lg animate-pulse" />
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar: search + role filter */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3 w-72 h-10 bg-gray-50 border border-gray-200 rounded-xl px-4 animate-pulse">
            <div className="w-4 h-4 bg-gray-200 rounded shrink-0" />
            <div className="h-3 w-40 bg-gray-200 rounded" />
          </div>
          <div className="h-10 w-36 bg-gray-100 border border-gray-200 rounded-xl animate-pulse" />
        </div>

        {/* Column headers */}
        <div className="grid grid-cols-[100px_1fr_2fr_1fr_1fr] px-6 py-3 border-b border-gray-100 gap-4">
          {['w-14', 'w-10', 'w-10', 'w-8', 'w-24'].map((w, i) => (
            <div
              key={i}
              className={`h-2.5 ${w} bg-gray-200 rounded animate-pulse`}
            />
          ))}
        </div>

        {/* Rows */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-[100px_1fr_2fr_1fr_1fr] items-center px-6 py-4 border-b border-gray-50 last:border-0 gap-4 animate-pulse"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            {/* Avatar */}
            <div className="w-11 h-11 rounded-full bg-gray-200 shrink-0" />

            {/* Name */}
            <div
              className={`h-4 ${nameWidths[i]} bg-gray-300 rounded font-semibold`}
            />

            {/* Email */}
            <div className={`h-3.5 ${emailWidths[i]} bg-gray-100 rounded`} />

            {/* Role badge */}
            <div className={`h-7 w-20 ${roleColors[i]} rounded-full`} />

            {/* Status + Block button */}
            <div className="flex items-center gap-3 justify-end">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <div className="h-3 w-14 bg-gray-200 rounded" />
              </div>
              <div className="h-9 w-16 bg-red-200 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagementSkeleton;
