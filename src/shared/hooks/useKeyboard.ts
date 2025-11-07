import { useEffect, useCallback } from "react";

import JSEventTypes from "~/resources/constants/JSEventTypes";

type KeyHandler = (event: KeyboardEvent) => void;

interface UseKeyboardOptions {
  handler: KeyHandler;
  condition?: boolean;
  targetKey: string | string[];
  eventType?:
    | JSEventTypes.KEY_UP
    | JSEventTypes.KEY_DOWN
    | JSEventTypes.KEY_PRESS;
}

const useKeyboard = ({
  handler,
  targetKey,
  condition = true,
  eventType = JSEventTypes.KEY_DOWN,
}: UseKeyboardOptions) => {
  const handleKeyEvent = useCallback(
    (event: KeyboardEvent) => {
      const keys = Array.isArray(targetKey) ? targetKey : [targetKey];

      if (keys.includes(event.key)) {
        handler(event);
      }
    },
    [targetKey, handler]
  );

  useEffect(() => {
    if (condition) {
      window.addEventListener(eventType, handleKeyEvent);

      return () => {
        window.removeEventListener(eventType, handleKeyEvent);
      };
    }
  }, [condition, eventType, handleKeyEvent]);
};

export default useKeyboard;
