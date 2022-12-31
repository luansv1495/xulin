export const validateFilenamePattern = (filename: unknown): string | null => {
  if (typeof filename != 'string') {
    return `"${filename}" is not a string.`;
  } else if (!filename) {
    return `"${filename}" is invalid.`;
  } else if (filename.split('.').length <= 1) {
    return `"${filename}" is not a file.`;
  }
  return null;
};
