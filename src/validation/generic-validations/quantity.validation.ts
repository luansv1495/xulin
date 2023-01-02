export const validateQuantity = (quantity: unknown): string | null => {
  if (typeof quantity != 'number') {
    return `"${quantity}" is not a number.`;
  } else if (quantity <= 0) {
    return `"${quantity}" must be greater than 0.`;
  }
  return null;
};
