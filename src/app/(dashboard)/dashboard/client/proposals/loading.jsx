const MyProposalsSkeleton = () => {
  const bannerColors = [
    'bg-blue-50 border-blue-100',
    'bg-amber-50 border-amber-100',
    'bg-amber-50 border-amber-100',
    'bg-emerald-50 border-emerald-100',
  ];

  const iconColors = [
    'bg-blue-300',
    'bg-amber-300',
    'bg-amber-300',
    'bg-emerald-300',
  ];

  const labelWidths = ['w-20', 'w-16', 'w-16', 'w-20'];

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-8 font-sans">
      {/* Header */}
      <div className="mb-8 space-y-2">
        <div className="h-8 w-44 bg-gray-300 rounded-lg animate-pulse" />
        <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* 2-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* Status Banner */}
            <div
              className={`flex items-center justify-between px-5 py-3 border-b ${bannerColors[i]}`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${iconColors[i]}`} />
                <div
                  className={`h-3 ${labelWidths[i]} bg-gray-300 rounded opacity-40`}
                />
              </div>
              <div className="h-3 w-20 bg-gray-200 rounded" />
            </div>

            {/* Card Body */}
            <div className="p-5">
              {/* Title */}
              <div
                className={`h-5 bg-gray-200 rounded mb-5 ${
                  i % 2 === 0 ? 'w-20' : 'w-16'
                }`}
              />

              {/* 2x2 stat boxes */}
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                {[
                  { label: 'w-20', value: 'w-14' },
                  { label: 'w-24', value: 'w-16' },
                  { label: 'w-24', value: 'w-12' },
                  { label: 'w-20', value: 'w-32' },
                ].map((box, j) => (
                  <div
                    key={j}
                    className="bg-gray-50 rounded-xl p-3 border border-gray-100 space-y-2"
                  >
                    {/* Label row with icon */}
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 bg-gray-200 rounded" />
                      <div
                        className={`h-2.5 ${box.label} bg-gray-200 rounded`}
                      />
                    </div>
                    {/* Value */}
                    <div className={`h-4 ${box.value} bg-gray-300 rounded`} />
                  </div>
                ))}
              </div>

              {/* Cover note */}
              <div className="h-3 w-10 bg-gray-100 rounded mb-2" />

              {/* Task ID */}
              <div className="h-2.5 w-36 bg-gray-100 rounded font-mono" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProposalsSkeleton;
