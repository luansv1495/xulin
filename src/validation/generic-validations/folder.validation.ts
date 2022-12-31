import fs from 'fs';
import path from 'path';

export const validateFolder = (
  rootDir: string,
  folder: unknown
): string | null => {
  if (typeof folder != 'string') {
    return `"${folder}" is not a string.`;
  } else if (!folder) {
    return `"${folder}" is invalid.`;
  } else if (folder.split('.').length != 1) {
    return `"${folder}" is not a folder.`;
  } else if (!fs.existsSync(path.join(rootDir, folder))) {
    return `"${folder}" not found.`;
  }
  return null;
};
