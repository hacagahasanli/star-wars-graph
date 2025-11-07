import { type FC } from "react";

import classnames from "../../lib/helpers/classnames";
import { SpinSizeClasses } from "./Spin.consts";

interface SpinProps {
  className?: string;
  size?: "small" | "default" | "large";
}

const Spin: FC<SpinProps> = ({ size = "default", className }) => {
  const borderWidth = size === "large" ? "border-t-4" : "border-t-2";

  return (
    <div
      className={classnames(
        "inline-block rounded-full border-solid border-gray-300 border-t-blue-500 animate-spin",
        SpinSizeClasses[size],
        borderWidth,
        className
      )}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spin;
