import { describe, it, expect } from "vitest";
import { isoToDate } from "../DateUtils";

describe("DateUtils", () => {
  describe("isoToDate", () => {
    it("should convert ISO string to locale date string", () => {
      const isoString = "2024-01-15T10:30:00.000Z";
      const result = isoToDate(isoString);

      // The result will vary by locale, but it should be a non-empty string
      expect(result).toBeTruthy();
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });

    it("should return empty string for undefined input", () => {
      const result = isoToDate(undefined);
      expect(result).toBe("");
    });

    it("should handle valid ISO date strings", () => {
      const isoString = "2014-12-09T13:50:51.644000Z";
      const result = isoToDate(isoString);

      expect(result).toBeTruthy();
      expect(typeof result).toBe("string");
    });

    it("should handle different ISO date formats", () => {
      const dates = [
        "2024-01-01T00:00:00Z",
        "2024-12-31T23:59:59.999Z",
        "2020-06-15T12:30:45.123Z",
      ];

      dates.forEach((date) => {
        const result = isoToDate(date);
        expect(result).toBeTruthy();
        expect(typeof result).toBe("string");
      });
    });

    it("should return empty string for null-like values", () => {
      expect(isoToDate(undefined)).toBe("");
    });

    it("should convert date to local date string format", () => {
      const isoString = "2024-01-01T00:00:00Z";
      const result = isoToDate(isoString);
      const date = new Date(isoString);
      const expected = date.toLocaleDateString();

      expect(result).toBe(expected);
    });

    it("should handle historical dates", () => {
      const isoString = "1970-01-01T00:00:00.000Z";
      const result = isoToDate(isoString);

      expect(result).toBeTruthy();
      expect(typeof result).toBe("string");
    });

    it("should handle future dates", () => {
      const isoString = "2099-12-31T23:59:59.999Z";
      const result = isoToDate(isoString);

      expect(result).toBeTruthy();
      expect(typeof result).toBe("string");
    });
  });
});
