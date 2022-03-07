export type Validated<T> = {
  value: T,
  valid: boolean;
};

export function validated<T>(value: T, valid: boolean): Validated<T> {
  return { value: value, valid: valid };
}

export function getValidatedStyle<T>(value: Validated<T>): string {
  return value.valid ? '' : 'invalidInput';
}
