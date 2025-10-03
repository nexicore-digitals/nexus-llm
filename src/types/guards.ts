// Generic branded type: any string excluding T
export type ExcludeString<T extends string> = string & { __excluded?: T };

// Generic runtime guard
export function isExcluded<T extends string>(
  value: string,
  forbidden: readonly T[]
): ExcludeString<T> {
  if (forbidden.includes(value as T)) {
    throw new Error(`${value} is forbidden, use a different string`);
  }
  return value as ExcludeString<T>;
}
