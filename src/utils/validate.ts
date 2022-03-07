export type Validated<T> = {
  value: T,
  valid: boolean;
};

export function validated<T>(value: T, valid: boolean) {
  return { value: value, valid: valid };
}

export function getValidatedStyle<T>(value: Validated<T>) {
  return value.valid ? '' : 'invalidInput';
}
