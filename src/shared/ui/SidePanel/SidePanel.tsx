import React from "react";

import cn from "~/shared/lib/helpers/classnames";
import useKeyboard from "~/shared/hooks/useKeyboard";
import useDisableScroll from "~/shared/hooks/useDisabledScroll";

import BaseIcons from "~/resources/constants/BaseIcons";

import Icon from "../Icon/Icon";

import type { PanelDirection } from "./SidePanel.types";

interface SidePanelProps {
  title?: string;
  isOpen: boolean;
  width?: string;
  onClose: () => void;
  children: React.ReactNode;
  direction?: PanelDirection;
}

const SidePanel = ({
  title,
  width,
  isOpen,
  onClose,
  children,
  direction = "right",
}: SidePanelProps) => {
  useKeyboard({
    handler: onClose,
    condition: isOpen,
    targetKey: "Escape",
  });

  useDisableScroll(isOpen);

  const isLeft = direction === "left";

  const defaultWidth = "w-[85%] max-w-none";

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          "fixed inset-y-0 z-50 flex flex-col bg-white dark:bg-gray-900 shadow-2xl transition-all duration-300 ease-out",
          width || defaultWidth,
          "sm:w-[85vw] md:w-[85vw] lg:w-[85vw]",
          isLeft ? "left-0" : "right-0",
          isOpen
            ? "translate-x-0"
            : isLeft
            ? "-translate-x-full"
            : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title || "Panel"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            aria-label="Close panel"
          >
            <Icon name={BaseIcons.X_OUTLINE} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </>
  );
};

export default SidePanel;
