import { createPortal } from "react-dom";

import { useEffect, useState } from "react";

import { LoadingSpinnerSizes } from "./LoadingSpinner.consts";

interface LoadingSpinnerProps {
  zIndex?: number;
  targetId?: string;
  isLoading?: boolean;
  backdropBlur?: boolean;
  backdropOpacity?: number;
  spinnerSize?: "sm" | "md" | "lg" | "xl";
}

function LoadingSpinner({
  targetId,
  zIndex = 50,
  isLoading = true,
  spinnerSize = "md",
  backdropOpacity = 50,
  backdropBlur = false,
}: LoadingSpinnerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || !isLoading) return null;

  const targetElement = targetId
    ? document.getElementById(targetId)
    : document.body;

  if (!targetElement) return null;

  const spinner = (
    <div
      className={`z-[${zIndex}] bg-white/${backdropOpacity} ${
        backdropBlur ? "backdrop-blur-[2px]" : "backdrop-none"
      } fixed inset-0 flex items-center justify-center`}
    >
      <div className="relative">
        <div
          className={`${LoadingSpinnerSizes[spinnerSize]} rounded-full border-4 border-blue-100`}
        />

        <div
          className={`absolute border-4 [border-image-slice:1] top-0 left-0 ${LoadingSpinnerSizes[spinnerSize]} rounded-full border-4 border-transparent border-t-primary-500 animate-spin`}
        />

        {spinnerSize !== "sm" && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-blue-grad-main" />
        )}
      </div>
    </div>
  );

  return createPortal(spinner, targetElement);
}

export default LoadingSpinner;
