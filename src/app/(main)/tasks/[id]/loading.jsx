const TaskDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-8 py-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Badges + title */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-6 w-14 bg-emerald-100 rounded-full animate-pulse" />
          </div>
          <div className="h-9 w-32 bg-gray-300 rounded-lg animate-pulse" />
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
          {/* LEFT column */}
          <div className="space-y-5">
            {/* Description card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3 animate-pulse">
              <div className="h-5 w-28 bg-gray-300 rounded-lg" />
              <div className="space-y-2">
                <div className="h-3.5 w-full bg-gray-100 rounded" />
                <div className="h-3.5 w-4/5 bg-gray-100 rounded" />
                <div className="h-3.5 w-2/3 bg-gray-100 rounded" />
              </div>
            </div>

            {/* Submit Proposal card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 animate-pulse">
              {/* Card header */}
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-orange-200 rounded" />
                <div className="h-5 w-36 bg-gray-300 rounded-lg" />
              </div>

              {/* Alert banner */}
              <div className="h-11 w-full bg-yellow-50 border border-yellow-100 rounded-xl" />

              {/* Budget + Estimated Days inputs */}
              <div className="grid grid-cols-2 gap-3">
                <div className="h-11 w-full bg-gray-100 border border-gray-200 rounded-xl" />
                <div className="h-11 w-full bg-gray-100 border border-gray-200 rounded-xl" />
              </div>

              {/* Cover note textarea */}
              <div className="h-28 w-full bg-gray-100 border border-gray-200 rounded-xl" />

              {/* Already Submitted button */}
              <div className="h-12 w-full bg-gray-200 rounded-xl" />
            </div>
          </div>

          {/* RIGHT sidebar */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6 h-fit animate-pulse">
            {/* Budget */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-lg shrink-0" />
              <div className="space-y-1.5">
                <div className="h-3 w-12 bg-orange-200 rounded" />
                <div className="h-5 w-14 bg-orange-300 rounded" />
              </div>
            </div>

            {/* Deadline */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg shrink-0" />
              <div className="space-y-1.5">
                <div className="h-3 w-16 bg-gray-200 rounded" />
                <div className="h-4 w-20 bg-gray-300 rounded" />
              </div>
            </div>

            {/* Posted */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg shrink-0" />
              <div className="space-y-1.5">
                <div className="h-3 w-12 bg-gray-200 rounded" />
                <div className="h-4 w-20 bg-gray-300 rounded" />
              </div>
            </div>

            {/* Client */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg shrink-0" />
              <div className="space-y-1.5">
                <div className="h-3 w-10 bg-gray-200 rounded" />
                <div className="h-4 w-32 bg-gray-300 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsSkeleton;
