const AllTasksSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto pt-6 space-y-6 pb-12 px-4">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-4 w-64 bg-gray-100 rounded-lg animate-pulse" />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
        <div className="w-full sm:flex-1 h-10 bg-gray-100 rounded-xl animate-pulse" />
        <div className="w-full sm:w-44 h-10 bg-gray-100 rounded-xl animate-pulse" />
      </div>

      {/* Task count */}
      <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between min-h-[200px]"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* Top row: category pill + date */}
            <div className="flex items-center justify-between">
              <div className="h-6 w-24 bg-gray-100 rounded-2xl animate-pulse" />
              <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
            </div>

            {/* Title */}
            <div className="mt-4 space-y-2">
              <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Description lines */}
            <div className="mt-2 space-y-1.5">
              <div className="h-3.5 w-full bg-gray-100 rounded animate-pulse" />
              <div className="h-3.5 w-5/6 bg-gray-100 rounded animate-pulse" />
            </div>

            {/* Bottom row: budget + email */}
            <div className="flex items-center justify-between mt-4 pt-2">
              <div className="h-6 w-16 bg-amber-100 rounded animate-pulse" />
              <div className="h-3.5 w-32 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination bar */}
      <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-amber-100/50 rounded-xl px-4 py-3">
        <div className="h-4 w-40 bg-amber-200/60 rounded animate-pulse" />
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`h-9 rounded-lg animate-pulse ${
                i === 2 ? 'w-9 bg-amber-300/70' : 'w-9 bg-amber-100'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTasksSkeleton;
