import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

import { createPortal } from "react-dom";

import cn from "~/shared/lib/helpers/cn";
import useKeyboard from "~/shared/hooks/useKeyboard";
import useOutsideClick from "~/shared/hooks/useOutsideClick";
import useDisableScroll from "~/shared/hooks/useDisabledScroll";

import BaseSize from "~/resources/constants/BaseSize";

import { ModalSizeClassess } from "./Modal.consts";

import type { IModalRef } from "~/shared/types/IModalRef";

import BaseIcons from "~/resources/constants/BaseIcons";

import Icon from "../Icon/Icon";

interface ModalProps {
  id?: string;
  delay?: number;
  isOpen: boolean;
  size?: BaseSize;
  className?: string;
  onClose?: () => void;
  wrapperClass?: string;
  contentClass?: string;
  withPadding?: boolean;
  children?: React.ReactNode;
  containerClass?: string;
  closable?: boolean;
  closeWrapperClass?: string;
  fullScreenOnMobile?: boolean;
}

const Modal = forwardRef<IModalRef, ModalProps>(
  (
    {
      id,
      isOpen,
      onClose,
      children,
      className,
      delay = 300,
      closable = false,
      wrapperClass = "",
      contentClass = "",
      size = BaseSize.SM,
      containerClass = "",
      withPadding = false,
      closeWrapperClass = "",
      fullScreenOnMobile = false,
    },
    ref
  ) => {
    const modalContentRef = useRef<HTMLDivElement>(null);

    const [mounted, setMounted] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    const handleClose = () => {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        onClose?.();
      }, delay);
    };

    useImperativeHandle(ref, () => ({
      triggerClose: handleClose,
    }));

    useDisableScroll(isOpen);

    useOutsideClick({
      ref: modalContentRef,
      handler: handleClose,
    });

    useKeyboard({
      condition: isOpen,
      targetKey: "Escape",
      handler: handleClose,
    });

    if (!mounted || (!isOpen && !isClosing)) return null;

    return createPortal(
      <div
        id={id}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "fixed inset-0 z-[150] flex items-center justify-center bg-black/40",
          isClosing ? "animate-modal-fade-out" : "animate-modal-fade-in",
          containerClass
        )}
      >
        <div
          className={cn(
            "w-full",
            fullScreenOnMobile ? "mx-0 md:mx-6" : "mx-6",
            ModalSizeClassess[size],
            isClosing ? "animate-slide-down" : "animate-slide-up",
            className
          )}
        >
          <div
            ref={modalContentRef}
            className={cn(
              "w-full bg-white p-2.5 relative",
              fullScreenOnMobile
                ? "h-screen md:h-auto md:max-h-[90vh] md:rounded-3xl rounded-none"
                : "max-h-[90vh] rounded-3xl",
              contentClass
            )}
          >
            {closable && (
              <button
                type="button"
                onClick={handleClose}
                className={`c-flex-center cursor-pointer p-2 bg-gray-100 rounded-lg absolute right-2.5 top-2.5 z-10 ${closeWrapperClass}`}
              >
                <Icon name={BaseIcons.X_OUTLINE} />
              </button>
            )}

            <div
              className={cn(
                withPadding ? "px-[22px] py-[6px]" : "",
                fullScreenOnMobile
                  ? "h-full md:h-auto md:max-h-[80vh] overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200"
                  : "max-h-[80vh] overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200",
                wrapperClass
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  }
);

Modal.displayName = "Modal";

export default Modal;
