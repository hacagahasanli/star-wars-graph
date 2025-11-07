import { useEffect } from "react";
import { JSEventTypes } from "~/resources/constants/EventTypes";

interface OutsideClickHandlerProps {
  excludeId?: string | null;
  handler: () => void;
  ref: React.RefObject<HTMLElement | null>;
  excludeRef?: React.RefObject<HTMLElement | null>;
}

const useOutsideClick = ({
  ref,
  handler,
  excludeRef,
  excludeId,
}: OutsideClickHandlerProps) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const excludeElement = excludeId ? document.getElementById(excludeId) : null;

      if (
        !ref.current ||
        ref.current.contains(event.target as Node) ||
        (excludeRef?.current && excludeRef.current.contains(event.target as Node)) ||
        (excludeElement && excludeElement.contains(event.target as Node))
      ) {
        return;
      }

      handler();
    };

    document.addEventListener(JSEventTypes.MOUSE_DOWN, listener);

    return () =>
      document.removeEventListener(JSEventTypes.MOUSE_DOWN, listener);
  }, [ref, handler, excludeRef, excludeId]);
};

export default useOutsideClick;