const PaymentsSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#eef0f8] px-8 py-8 font-sans">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-indigo-200 rounded-xl animate-pulse" />
        <div className="space-y-2">
          <div className="h-8 w-44 bg-gray-300 rounded-lg animate-pulse" />
          <div className="h-3.5 w-36 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Table Head */}
        <div className="grid grid-cols-4 px-6 py-4 border-b border-gray-100">
          {['w-36', 'w-32', 'w-28', 'w-16'].map((w, i) => (
            <div
              key={i}
              className={`h-3 ${w} bg-gray-200 rounded animate-pulse`}
            />
          ))}
        </div>

        {/* Table Rows — enough to fill the screen */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-4 items-center px-6 py-5 border-b border-gray-50 last:border-0 animate-pulse"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            {/* Freelancer email + avatar */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-200 shrink-0" />
              {/* Vary widths so it doesn't look robotic */}
              <div
                className={`h-3.5 bg-gray-200 rounded ${
                  i % 3 === 0 ? 'w-40' : i % 3 === 1 ? 'w-32' : 'w-36'
                }`}
              />
            </div>

            {/* Transaction ID pill */}
            <div
              className={`h-7 bg-gray-100 rounded-lg ${
                i % 2 === 0 ? 'w-56' : 'w-52'
              }`}
            />

            {/* Budget */}
            <div
              className={`h-4 bg-green-100 rounded ${
                i % 3 === 0 ? 'w-12' : i % 3 === 1 ? 'w-16' : 'w-14'
              }`}
            />

            {/* Title */}
            <div
              className={`h-3.5 bg-gray-200 rounded ${
                i % 2 === 0 ? 'w-16' : 'w-20'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentsSkeleton;
