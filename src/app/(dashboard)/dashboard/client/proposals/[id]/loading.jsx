const CheckoutSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top nav bar with back link */}
      <div className="bg-white border-b border-gray-100 px-8 py-4">
        <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Centered checkout card */}
      <div className="flex items-start justify-center px-4 py-12">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
          {/* Blue header band */}
          <div className="bg-blue-50 px-8 py-7 border-b border-blue-100">
            <div className="h-7 w-44 bg-blue-200 rounded-lg mb-2" />
            <div className="h-3.5 w-56 bg-blue-100 rounded" />
          </div>

          {/* Line items */}
          <div className="px-8 py-6 space-y-7">
            {/* Task row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl shrink-0" />
                <div className="space-y-1.5">
                  <div className="h-3 w-10 bg-gray-200 rounded" />
                  <div className="h-4 w-16 bg-gray-300 rounded" />
                </div>
              </div>
              <div className="h-4 w-10 bg-gray-200 rounded" />
            </div>

            {/* Freelancer row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-xl shrink-0" />
                <div className="space-y-1.5">
                  <div className="h-3 w-16 bg-gray-200 rounded" />
                  <div className="h-4 w-40 bg-gray-300 rounded" />
                </div>
              </div>
              <div className="h-3.5 w-12 bg-gray-200 rounded" />
            </div>

            {/* Proposed amount row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl shrink-0" />
                <div className="space-y-1.5">
                  <div className="h-3 w-28 bg-gray-200 rounded" />
                  <div className="h-4 w-20 bg-gray-300 rounded" />
                </div>
              </div>
              <div className="h-3.5 w-28 bg-gray-100 rounded" />
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Total row */}
            <div className="flex items-center justify-between">
              <div className="h-5 w-10 bg-gray-300 rounded" />
              <div className="h-7 w-24 bg-gray-300 rounded-lg" />
            </div>
          </div>

          {/* Pay button */}
          <div className="px-8 pb-6">
            <div className="h-14 w-full bg-orange-300 rounded-2xl" />
          </div>

          {/* Security note */}
          <div className="px-8 pb-7 flex items-center justify-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded" />
            <div className="h-3 w-56 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSkeleton;
