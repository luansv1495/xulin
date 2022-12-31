import { readdirSync } from 'fs';
import path from 'path';
import fg from 'fast-glob';

export const FileSystem = {
  getFilesInFolder: (
    rootDir: string,
    folder: string,
    files: string[]
  ): string[] => {
    const completeFolderPath = path.join(rootDir, folder);

    const items = readdirSync(completeFolderPath, { withFileTypes: true });

    items.forEach((item) => {
      if (item.isDirectory()) {
        files = FileSystem.getFilesInFolder(
          rootDir,
          path.join(folder, item.name),
          files
        );
      } else {
        files.push(path.join(completeFolderPath, item.name));
      }
    });

    return files;
  },

  getFilesByPatternInFolder: (
    rootDir: string,
    folder: string,
    patterns: string[]
  ): string[] => {
    let validFiles: string[] = [];

    patterns.forEach((pattern) => {
      const files = fg.sync(path.join(rootDir, folder) + '/**/' + pattern);
      validFiles = validFiles.concat(files);
    });

    return validFiles;
  }
};
