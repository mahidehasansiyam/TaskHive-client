const InProgressProjectsSkeleton = () => {
  return (
    <div className="text-[#00174d] antialiased">
      {/* Page Title */}
      <div className="mb-8 space-y-2">
        <div className="h-10 w-72 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-4 w-64 bg-gray-100 rounded animate-pulse" />
      </div>

      {/* 2-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-zinc-200/80 flex flex-col justify-between animate-pulse"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* Header: status badge + started date */}
            <div className="px-6 py-4 bg-[#f4f7fa] border-b border-zinc-100 flex justify-between items-center">
              <div className="h-7 w-28 bg-white border border-zinc-300 rounded-full" />
              <div className="h-3.5 w-24 bg-zinc-200 rounded" />
            </div>

            {/* Card body */}
            <div className="p-6 sm:p-8 flex-1 space-y-5">
              {/* Title + cover note */}
              <div className="space-y-2">
                <div
                  className={`h-6 bg-zinc-200 rounded ${
                    i % 2 === 0 ? 'w-24' : 'w-40'
                  }`}
                />
                <div className="h-3.5 w-12 bg-zinc-100 rounded" />
              </div>

              {/* 2x2 stat boxes */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'w-28', value: 'w-14' },
                  { label: 'w-20', value: 'w-16' },
                  { label: 'w-24', value: 'w-16' },
                  { label: 'w-16', value: 'w-32' },
                ].map((box, j) => (
                  <div
                    key={j}
                    className="bg-[#f4f7fa] rounded-xl p-3.5 space-y-2"
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 bg-zinc-300 rounded" />
                      <div
                        className={`h-2.5 ${box.label} bg-zinc-300 rounded`}
                      />
                    </div>
                    <div className={`h-4 ${box.value} bg-zinc-200 rounded`} />
                  </div>
                ))}
              </div>

              {/* Task ID */}
              <div className="h-2.5 w-24 bg-zinc-100 rounded" />
            </div>

            {/* Submit button */}
            <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0">
              <div className="h-12 w-full bg-[#082f99]/20 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InProgressProjectsSkeleton;
