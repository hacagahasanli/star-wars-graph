/**
 * Returns a new array with unique elements based on the specified key.
 * Keeps the first occurrence of each unique key value.
 *
 * @param arr - Array of objects
 * @param key - Key to determine uniqueness
 */
export function uniqueBy<T, K extends keyof T>(arr: T[], key: K): T[] {
  const seen = new Set()
  return arr.filter((item) => {
    const val = item[key]
    if (seen.has(val)) return false
    seen.add(val)
    return true
  })
}

/**
 * Groups array elements into an object, using the specified key's string value as group keys.
 *
 * @param arr - Array of objects
 * @param key - Key to group by
 */
export function groupBy<T, K extends keyof T>(arr: T[], key: K): Record<string, T[]> {
  return arr.reduce(
    (acc, item) => {
      const groupKey = String(item[key])
      if (!acc[groupKey]) acc[groupKey] = []
      acc[groupKey].push(item)
      return acc
    },
    {} as Record<string, T[]>
  )
}

/**
 * Splits an array into chunks of specified size.
 *
 * @param arr - Array to split
 * @param size - Chunk size
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

/**
 * Checks if two arrays are equal by comparing JSON stringified elements.
 * Optionally treats two empty arrays as equal.
 *
 * @param arr1 - First array
 * @param arr2 - Second array
 * @param treatEmptyAsEqual - If true, empty arrays are considered equal
 */
export function checkArrEquality<T>(
  arr1: T[],
  arr2: T[],
  treatEmptyAsEqual: boolean = false
): boolean {
  if (treatEmptyAsEqual && arr1.length === 0 && arr2.length === 0) return true

  if (arr1.length !== arr2.length && arr1.length !== 0 && arr2.length !== 0) return false

  return arr1.every((obj1, index) => {
    const obj2 = arr2[index]
    return JSON.stringify(obj1) === JSON.stringify(obj2)
  })
}

/**
 * Returns a new array which is the reverse of the input array.
 *
 * @param arr - Array to reverse
 */
export function reverseArr<T>(arr: T[]): T[] {
  return [...arr].reverse()
}
