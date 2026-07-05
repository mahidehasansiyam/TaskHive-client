const AuthLoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
      <div className="w-14 h-14 bg-orange-400 rounded-2xl animate-pulse" />
      <svg
        className="animate-spin w-6 h-6 text-orange-500"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
        />
      </svg>
    </div>
  );
};

export default AuthLoadingSkeleton;
