import { type JSX } from "react";

/**
 * No operation function - does nothing.
 */
export const noop = () => {};

/**
 * Composes multiple functions into a single function,
 * where the output of each function is input to the previous.
 * The functions are applied right-to-left.
 *
 * @param fn1 - Last function to call
 * @param fns - Other functions to compose
 * @returns Composed function
 */
export function compose<R>(fn1: (a: R) => R, ...fns: Array<(a: R) => R>) {
  return fns.reduce((prevFn, nextFn) => (value) => prevFn(nextFn(value)), fn1);
}

/**
 * Creates a debounced version of a function that delays
 * invoking the function until after wait milliseconds have
 * elapsed since the last time it was invoked.
 *
 * @param func - Function to debounce
 * @param wait - Delay in milliseconds
 * @returns Debounced function
 */
// eslint-disable-next-line
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
      timeout = null;
    }, wait);
  };
};

export const isSVGTag = (tag: string): tag is keyof JSX.IntrinsicElements => {
  return [
    "svg",
    "path",
    "circle",
    "rect",
    "g",
    "symbol",
    "defs",
    "use",
    "clipPath",
    "mask",
  ].includes(tag);
};
