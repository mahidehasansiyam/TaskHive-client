const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between px-8 py-6">
        <div className="space-y-2">
          <div className="h-8 w-56 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-4 w-80 bg-gray-100 rounded animate-pulse" />
        </div>
        <div className="h-11 w-36 bg-orange-200 rounded-xl animate-pulse" />
      </div>

      <div className="px-8 pb-12 space-y-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {['bg-orange-50', 'bg-amber-50', 'bg-amber-50', 'bg-yellow-50'].map(
            (bg, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between min-h-[130px] animate-pulse"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="h-3.5 w-24 bg-gray-100 rounded" />
                    <div className="h-8 w-16 bg-gray-200 rounded-lg" />
                  </div>
                  <div className={`w-10 h-10 ${bg} rounded-xl`} />
                </div>
                <div className="h-3 w-32 bg-gray-100 rounded mt-3" />
              </div>
            ),
          )}
        </div>

        {/* Recent Tasks heading */}
        <div className="h-6 w-36 bg-gray-200 rounded-lg animate-pulse" />

        {/* Task Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {/* Title row + status badge */}
              <div className="flex items-start justify-between mb-2">
                <div className="space-y-2">
                  <div className="h-5 w-28 bg-gray-200 rounded" />
                  <div className="h-3.5 w-20 bg-gray-100 rounded" />
                </div>
                <div className="h-6 w-20 bg-orange-100 rounded-full" />
              </div>

              {/* Meta row: category + budget + date + proposals */}
              <div className="flex items-center gap-3 mt-5 flex-wrap">
                <div className="h-6 w-20 bg-gray-100 rounded-lg" />
                <div className="h-4 w-14 bg-gray-100 rounded" />
                <div className="ml-auto flex items-center gap-3">
                  <div className="h-4 w-24 bg-gray-100 rounded" />
                  <div className="h-6 w-28 bg-green-100 rounded-full" />
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 my-4" />

              {/* Bottom row: Details button + delete */}
              <div className="flex items-center justify-between">
                <div className="h-8 w-24 bg-gray-100 rounded-lg" />
                <div className="h-8 w-8 bg-gray-100 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
