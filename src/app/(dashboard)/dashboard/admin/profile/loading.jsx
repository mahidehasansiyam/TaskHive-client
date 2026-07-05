const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-8 py-8 font-sans">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="space-y-2">
          <div className="h-9 w-44 bg-gray-300 rounded-lg animate-pulse" />
          <div className="h-4 w-72 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-11 w-36 bg-orange-300 rounded-xl animate-pulse" />
      </div>

      <div className="h-px bg-gray-200 mb-8 animate-pulse" />

      {/* Profile Card */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        {/* Orange Banner */}
        <div className="h-48 bg-gradient-to-r from-orange-400 to-amber-300 animate-pulse relative">
          {/* Avatar — overlaps banner */}
          <div className="absolute -bottom-14 left-8">
            <div className="w-32 h-32 rounded-2xl bg-gray-200 border-4 border-white shadow-md animate-pulse" />
          </div>
        </div>

        {/* Below banner content */}
        <div className="pt-20 px-8 pb-10">
          {/* Email pill + hourly rate */}
          <div className="flex items-center justify-between mb-10">
            <div className="h-9 w-48 bg-gray-100 rounded-full border border-gray-200 animate-pulse" />
            <div className="bg-gray-50 border border-gray-100 rounded-2xl px-8 py-4 text-center space-y-2">
              <div className="h-3 w-24 bg-gray-200 rounded animate-pulse mx-auto" />
              <div className="h-7 w-20 bg-orange-200 rounded-lg animate-pulse mx-auto" />
            </div>
          </div>

          {/* About Me */}
          <div className="mb-8 space-y-3">
            <div className="h-3 w-20 bg-gray-300 rounded animate-pulse" />
            <div className="space-y-2">
              <div className="h-3.5 w-full bg-gray-100 rounded animate-pulse" />
              <div className="h-3.5 w-5/6 bg-gray-100 rounded animate-pulse" />
              <div className="h-3.5 w-4/6 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>

          {/* Skills & Expertises */}
          <div className="space-y-3">
            <div className="h-3 w-36 bg-gray-300 rounded animate-pulse" />
            <div className="flex flex-wrap gap-2">
              {['w-20', 'w-24', 'w-16', 'w-28', 'w-20', 'w-18'].map((w, i) => (
                <div
                  key={i}
                  className={`h-7 ${w} bg-gray-100 rounded-full animate-pulse`}
                  style={{ animationDelay: `${i * 50}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
