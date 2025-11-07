/**
 * Creates a new object by selecting only specified keys from the input object.
 * @param obj - Source object
 * @param keys - Array of keys to pick
 * @returns New object with picked keys
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (key in obj) {
      result[key] = obj[key]
    }
  }
  return result
}

/**
 * Creates a new object by removing specified keys from the input object.
 * @param obj - Source object
 * @param keys - Array of keys to omit
 * @returns New object without omitted keys
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj }
  for (let i = 0; i < keys.length; i++) {
    delete result[keys[i]]
  }
  return result
}

/**
 * Merges two objects into a new object.
 * Properties from the source override those in the target.
 * @param target - Target object
 * @param source - Source object
 * @returns Merged object
 */
export function merge<T extends object, U extends object>(target: T, source: U): T & U {
  return { ...target, ...source }
}

/**
 * Removes keys from the object that have undefined, null,
 * empty string, or empty array values.
 * @param obj - Input object
 * @returns Partial object without empty values
 */
export function cleanObject<T extends object>(obj: T): Partial<T> {
  const result = {} as Partial<T>
  for (const key in obj) {
    const value = obj[key]
    if (
      value !== undefined &&
      value !== null &&
      value !== '' &&
      !(Array.isArray(value) && value.length === 0)
    ) {
      result[key] = value
    }
  }
  return result
}

/**
 * Checks if all values in an object are "complete",
 * meaning not undefined, null, empty string, or empty array.
 * @param obj - Input object
 * @returns True if all values are complete, otherwise false
 */
export function areAllValuesComplete<T extends object>(obj: T): boolean {
  return Object.values(obj).every(
    (value) =>
      value !== undefined &&
      value !== null &&
      value !== '' &&
      !(Array.isArray(value) && value.length === 0)
  )
}
