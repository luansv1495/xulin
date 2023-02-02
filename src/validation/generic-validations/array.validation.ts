export const validateArray = (item: unknown): string | null => {
  if (Object.prototype.toString.call(item) != '[object Array]') {
    return `"${item}" is not a array.`;
  }
  return null;
};
