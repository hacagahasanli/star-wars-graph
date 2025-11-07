import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { noop, compose, debounce, isSVGTag } from "../FunctionUtils";

describe("FunctionUtils", () => {
  describe("noop", () => {
    it("should be a function", () => {
      expect(typeof noop).toBe("function");
    });

    it("should return undefined", () => {
      expect(noop()).toBeUndefined();
    });

    it("should not throw when called", () => {
      expect(() => noop()).not.toThrow();
    });
  });

  describe("compose", () => {
    it("should compose single function", () => {
      const addOne = (x: number) => x + 1;
      const composed = compose(addOne);
      expect(composed(5)).toBe(6);
    });

    it("should compose multiple functions right-to-left", () => {
      const addOne = (x: number) => x + 1;
      const multiplyByTwo = (x: number) => x * 2;
      const subtractThree = (x: number) => x - 3;

      const composed = compose(addOne, multiplyByTwo, subtractThree);
      // (5 - 3) * 2 + 1 = 5
      expect(composed(5)).toBe(5);
    });

    it("should work with string transformations", () => {
      const addHello = (s: string) => s + " Hello";
      const addWorld = (s: string) => s + " World";
      const trim = (s: string) => s.trim();

      const composed = compose(addHello, addWorld, trim);
      expect(composed("Test")).toBe("Test World Hello");
    });

    it("should preserve order with two functions", () => {
      const double = (x: number) => x * 2;
      const addFive = (x: number) => x + 5;

      const composed = compose(double, addFive);
      // (10 + 5) * 2 = 30
      expect(composed(10)).toBe(30);
    });
  });

  describe("debounce", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should debounce function calls", () => {
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(mockFn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(100);

      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it("should call function with correct arguments", () => {
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn("test", 123);

      vi.advanceTimersByTime(100);

      expect(mockFn).toHaveBeenCalledWith("test", 123);
    });

    it("should reset timer on subsequent calls", () => {
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      vi.advanceTimersByTime(50);
      debouncedFn();
      vi.advanceTimersByTime(50);

      expect(mockFn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(50);

      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it("should handle multiple debounced function instances independently", () => {
      const mockFn1 = vi.fn();
      const mockFn2 = vi.fn();
      const debouncedFn1 = debounce(mockFn1, 100);
      const debouncedFn2 = debounce(mockFn2, 200);

      debouncedFn1();
      debouncedFn2();

      vi.advanceTimersByTime(100);
      expect(mockFn1).toHaveBeenCalledTimes(1);
      expect(mockFn2).not.toHaveBeenCalled();

      vi.advanceTimersByTime(100);
      expect(mockFn2).toHaveBeenCalledTimes(1);
    });

    it("should work with different wait times", () => {
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 500);

      debouncedFn();

      vi.advanceTimersByTime(499);
      expect(mockFn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(1);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe("isSVGTag", () => {
    it("should return true for svg tag", () => {
      expect(isSVGTag("svg")).toBe(true);
    });

    it("should return true for path tag", () => {
      expect(isSVGTag("path")).toBe(true);
    });

    it("should return true for circle tag", () => {
      expect(isSVGTag("circle")).toBe(true);
    });

    it("should return true for rect tag", () => {
      expect(isSVGTag("rect")).toBe(true);
    });

    it("should return true for g tag", () => {
      expect(isSVGTag("g")).toBe(true);
    });

    it("should return true for symbol tag", () => {
      expect(isSVGTag("symbol")).toBe(true);
    });

    it("should return true for defs tag", () => {
      expect(isSVGTag("defs")).toBe(true);
    });

    it("should return true for use tag", () => {
      expect(isSVGTag("use")).toBe(true);
    });

    it("should return true for clipPath tag", () => {
      expect(isSVGTag("clipPath")).toBe(true);
    });

    it("should return true for mask tag", () => {
      expect(isSVGTag("mask")).toBe(true);
    });

    it("should return false for non-SVG tags", () => {
      expect(isSVGTag("div")).toBe(false);
      expect(isSVGTag("span")).toBe(false);
      expect(isSVGTag("p")).toBe(false);
      expect(isSVGTag("h1")).toBe(false);
    });

    it("should return false for random strings", () => {
      expect(isSVGTag("random")).toBe(false);
      expect(isSVGTag("test")).toBe(false);
      expect(isSVGTag("")).toBe(false);
    });
  });
});
