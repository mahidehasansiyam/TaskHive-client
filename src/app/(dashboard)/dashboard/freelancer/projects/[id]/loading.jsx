const SubmitProjectSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-8 py-8 font-sans">
      {/* Back link */}
      <div className="h-4 w-36 bg-gray-200 rounded animate-pulse mb-6" />

      {/* Header row */}
      <div className="flex items-start justify-between mb-8">
        <div className="space-y-2">
          <div className="h-10 w-56 bg-gray-300 rounded-lg animate-pulse" />
          <div className="h-4 w-72 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-9 w-32 bg-white border border-zinc-300 rounded-full animate-pulse" />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        {/* LEFT — Project overview card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-7 animate-pulse">
          {/* Section label + title */}
          <div className="space-y-3">
            <div className="h-3 w-36 bg-blue-200 rounded" />
            <div className="h-8 w-28 bg-gray-300 rounded-lg" />
          </div>

          {/* Two stat boxes side by side */}
          <div className="grid grid-cols-2 gap-4">
            {[0, 1].map(i => (
              <div
                key={i}
                className="border border-zinc-200 rounded-xl p-5 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-zinc-200 rounded" />
                  <div className="h-2.5 w-24 bg-zinc-200 rounded" />
                </div>
                <div className="h-8 w-20 bg-zinc-300 rounded-lg" />
                <div className="h-3 w-28 bg-zinc-100 rounded" />
              </div>
            ))}
          </div>

          {/* Client email row */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-zinc-200 shrink-0" />
            <div className="space-y-2">
              <div className="h-3 w-20 bg-zinc-200 rounded" />
              <div className="h-4 w-36 bg-zinc-300 rounded" />
            </div>
          </div>

          {/* Initial cover note section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-zinc-200 rounded" />
              <div className="h-3 w-36 bg-blue-200 rounded" />
            </div>
            <div className="h-24 w-full bg-zinc-100 border border-zinc-200 rounded-xl" />
          </div>
        </div>

        {/* RIGHT — Submit Task form card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 space-y-6 animate-pulse">
          {/* Card header */}
          <div className="space-y-2">
            <div className="h-6 w-28 bg-gray-300 rounded-lg" />
            <div className="h-3.5 w-52 bg-gray-100 rounded" />
          </div>

          {/* URL field */}
          <div className="space-y-2">
            <div className="h-3 w-44 bg-blue-200 rounded" />
            <div className="h-12 w-full bg-zinc-100 border border-zinc-200 rounded-xl" />
          </div>

          {/* Notes field */}
          <div className="space-y-2">
            <div className="h-3 w-32 bg-blue-200 rounded" />
            <div className="h-36 w-full bg-zinc-100 border border-zinc-200 rounded-xl" />
          </div>

          {/* Submit button */}
          <div
            className="h-13 w-full bg-[#082f99]/20 rounded-xl"
            style={{ height: '52px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default SubmitProjectSkeleton;
