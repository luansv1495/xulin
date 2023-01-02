import fg from 'fast-glob';
import fs from 'fs';
import { join } from 'path';

export const FileSystem = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getJsonFile: (path: string): any => {
    const buffer = fs.readFileSync(path);

    const jsonData = JSON.parse(buffer.toString());

    return jsonData;
  },

  exists: (path: string): boolean => {
    return fs.existsSync(path);
  },

  getDeepFilesInFolder: (
    rootDir: string,
    folder: string,
    files: string[]
  ): string[] => {
    const completeFolderPath = join(rootDir, folder);

    const items = fs.readdirSync(completeFolderPath, { withFileTypes: true });

    items.forEach((item) => {
      if (item.isDirectory()) {
        files = FileSystem.getDeepFilesInFolder(
          rootDir,
          join(folder, item.name),
          files
        );
      } else {
        files.push(join(completeFolderPath, item.name));
      }
    });

    return files;
  },

  getFilesInFolder: (rootDir: string, folder: string): string[] => {
    const completeFolderPath = join(rootDir, folder);

    const items = fs.readdirSync(completeFolderPath, { withFileTypes: true });

    const files = items
      .filter((item) => item.isFile())
      .map((item) => join(completeFolderPath, item.name));

    return files;
  },

  getFilesByPatternInFolder: (
    rootDir: string,
    folder: string,
    patterns: string[]
  ): string[] => {
    let validFiles: string[] = [];

    patterns.forEach((pattern) => {
      const files = fg.sync(join(rootDir, folder) + '/**/' + pattern);
      validFiles = validFiles.concat(files);
    });

    return validFiles;
  },

  getFoldersInFolder: (rootDir: string, folder: string): string[] => {
    const completeFolderPath = join(rootDir, folder);

    const items = fs.readdirSync(completeFolderPath, { withFileTypes: true });

    return items.filter((item) => item.isDirectory()).map((item) => item.name);
  }
};
