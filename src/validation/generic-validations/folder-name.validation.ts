export const validateFoldername = (folderName: unknown): string | null => {
  if (typeof folderName != 'string') {
    return `"${folderName}" is not a string.`;
  } else if (!folderName) {
    return `"${folderName}" is invalid.`;
  } else if (folderName.split('.').length != 1) {
    return `"${folderName}" is not a folder.`;
  }
  return null;
};
