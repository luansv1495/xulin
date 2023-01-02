export const validateMaxMin = (max: number, min: number): string | null => {
  if (min >= max) {
    return `"${min}" is greater than or equal to the max value.`;
  }
  return null;
};
