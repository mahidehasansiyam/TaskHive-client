const PostTaskSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-8 py-8 font-sans">
      {/* Header */}
      <div className="mb-8 space-y-2">
        <div className="h-10 w-64 bg-gray-300 rounded-lg animate-pulse" />
        <div className="h-4 w-80 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-3xl mx-auto space-y-8">
        {/* Task Title */}
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-300 rounded animate-pulse" />
          <div className="h-12 w-full bg-gray-100 rounded-xl animate-pulse" />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <div className="h-4 w-20 bg-gray-300 rounded animate-pulse" />
          <div className="h-12 w-56 bg-gray-100 rounded-xl animate-pulse" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-300 rounded animate-pulse" />
          <div className="h-36 w-full bg-gray-100 rounded-xl animate-pulse" />
        </div>

        {/* Budget + Deadline side by side */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="h-4 w-28 bg-gray-300 rounded animate-pulse" />
            <div className="h-12 w-full bg-gray-100 rounded-xl animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-20 bg-gray-300 rounded animate-pulse" />
            <div className="h-12 w-full bg-gray-100 rounded-xl animate-pulse" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-2">
          <div className="h-12 w-28 bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-12 flex-1 bg-orange-200 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default PostTaskSkeleton;
