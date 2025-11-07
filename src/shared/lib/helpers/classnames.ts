// Defines the allowed types for class names input
export type ClassValue =
  | string // A class name string
  | undefined // Optional or missing value
  | null // Null value, ignored
  | boolean // Boolean, used for conditional inclusion
  | { [key: string]: boolean | string | number } // Object with keys as class names and values indicating inclusion

/**
 * Utility function to conditionally combine class names into a single string.
 *
 * Accepts any number of arguments of various types:
 * - Strings: added directly
 * - Arrays: recursively flattened and processed
 * - Objects: keys included if their value is truthy
 * - Falsy values (undefined, null, false): ignored
 *
 * @param {...ClassValue[]} args - List of class names or structures
 * @returns {string} Combined class names separated by spaces
 *
 * Example:
 * classnames('btn', { active: isActive, disabled: isDisabled }, ['extra', ['nested']])
 * // returns 'btn active extra nested' if isActive is true and isDisabled is false
 */
function cn(...args: ClassValue[]): string {
  return args
    .flatMap((arg) => {
      if (!arg) return [] // Ignore falsy values (false, null, undefined, '')
      if (typeof arg === 'string') return [arg] // Return string as a one-element array
      if (Array.isArray(arg)) return cn(...arg) // Recursively handle nested arrays
      if (typeof arg === 'object') {
        // Include keys where the corresponding value is truthy (non-zero, non-empty string, true)
        return Object.keys(arg).filter((key) => Boolean(arg[key]))
      }
      return [] // Fallback: ignore any other types
    })
    .join(' ') // Join all collected class names with spaces
}

export default cn
