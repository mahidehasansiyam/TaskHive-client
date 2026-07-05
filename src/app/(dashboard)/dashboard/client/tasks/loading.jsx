const MyTasksSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-8 py-8 font-sans">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="space-y-2">
          <div className="h-9 w-36 bg-gray-300 rounded-lg animate-pulse" />
          <div className="h-4 w-56 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-11 w-36 bg-orange-300 rounded-xl animate-pulse" />
      </div>

      {/* Toolbar: search + 2 dropdowns */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 h-11 bg-white border border-gray-200 rounded-xl animate-pulse" />
        <div className="h-11 w-40 bg-white border border-gray-200 rounded-xl animate-pulse" />
        <div className="h-11 w-36 bg-white border border-gray-200 rounded-xl animate-pulse" />
      </div>

      {/* Task Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            {/* Title row + status badge */}
            <div className="flex items-start justify-between mb-1">
              <div
                className={`h-6 bg-gray-200 rounded ${
                  i % 3 === 0 ? 'w-20' : i % 3 === 1 ? 'w-16' : 'w-28'
                }`}
              />
              <div
                className={`h-6 w-24 rounded-full ${
                  i === 0
                    ? 'bg-orange-100'
                    : i === 3
                      ? 'bg-emerald-100'
                      : 'bg-blue-100'
                }`}
              />
            </div>

            {/* Subtitle / description */}
            <div className="h-3.5 w-12 bg-gray-100 rounded mb-5" />

            {/* Meta row: category + budget + date + proposals */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="h-7 w-24 bg-gray-100 rounded-lg" />
              <div className="h-4 w-14 bg-gray-100 rounded" />
              <div className="ml-auto flex items-center gap-2">
                <div className="h-4 w-24 bg-gray-100 rounded" />
                <div
                  className={`h-7 w-28 rounded-full ${
                    i % 2 === 0 ? 'bg-green-100' : 'bg-orange-100'
                  }`}
                />
                {i === 3 && (
                  <div className="h-7 w-24 bg-emerald-100 rounded-full" />
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 my-4" />

            {/* Bottom: Details button + trash */}
            <div className="flex items-center justify-between">
              <div className="h-9 w-24 bg-gray-100 rounded-xl" />
              {i !== 0 && <div className="h-8 w-8 bg-gray-100 rounded-lg" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTasksSkeleton;
