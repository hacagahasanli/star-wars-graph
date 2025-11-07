import { useEffect } from "react";

interface IDisableScrollOptions {
  onShow?: () => void;
  onHide?: () => void;
}

const useDisableScroll = (
  isDisabled: boolean,
  options?: IDisableScrollOptions
) => {
  useEffect(() => {
    if (isDisabled) {
      document.body.classList.add("overflow-hidden");
      options?.onShow?.();
    } else {
      document.body.classList.remove("overflow-hidden");
      options?.onHide?.()
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isDisabled, options]);
};

export default useDisableScroll;
