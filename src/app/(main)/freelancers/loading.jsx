const FreelancersSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto px-8 py-12 min-h-screen font-sans">
      {/* Header */}
      <div className="mb-10 space-y-2">
        <div className="h-8 w-56 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-4 w-72 bg-gray-100 rounded-lg animate-pulse" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white p-6 h-full rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between items-start animate-pulse"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="w-full">
              {/* Avatar + name row */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 shrink-0" />
                <div className="flex-1 min-w-0 space-y-2 pt-1">
                  <div className="h-5 w-32 bg-gray-200 rounded" />
                  <div className="flex items-center gap-3">
                    <div className="h-3.5 w-10 bg-amber-100 rounded" />
                    <div className="h-3.5 w-16 bg-gray-100 rounded" />
                  </div>
                </div>
              </div>

              {/* Bio lines */}
              <div className="space-y-1.5 mb-4">
                <div className="h-3.5 w-full bg-gray-100 rounded" />
                <div className="h-3.5 w-4/5 bg-gray-100 rounded" />
              </div>

              {/* Skill pills */}
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="h-6 w-16 bg-gray-100 rounded-full" />
                <div className="h-6 w-20 bg-gray-100 rounded-full" />
                <div className="h-6 w-14 bg-gray-100 rounded-full" />
              </div>
            </div>

            {/* Hourly rate */}
            <div className="h-5 w-20 bg-amber-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreelancersSkeleton;
