const LoadingOverlay = () => {
  return (
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-[2000] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <div className="font-medium text-gray-700">Wait a second...</div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
