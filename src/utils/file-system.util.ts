import fg from 'fast-glob';
import fs from 'fs';
import path, { join } from 'path';

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
    const completeFolderPath = join(rootDir, folder).replace(/\\/g, '/');

    const items = fs.readdirSync(completeFolderPath, { withFileTypes: true });

    items.forEach((item: fs.Dirent) => {
      if (item.isDirectory()) {
        files = FileSystem.getDeepFilesInFolder(
          rootDir,
          join(folder, item.name).replace(/\\/g, '/'),
          files
        );
      } else {
        files.push(join(completeFolderPath, item.name).replace(/\\/g, '/'));
      }
    });

    return files;
  },

  getFilesInFolder: (rootDir: string, folder: string): string[] => {
    const completeFolderPath = join(rootDir, folder).replace(/\\/g, '/');

    const items = fs.readdirSync(completeFolderPath, { withFileTypes: true });

    const files = items
      .filter((item: fs.Dirent) => item.isFile())
      .map((item: fs.Dirent) =>
        join(completeFolderPath, item.name).replace(/\\/g, '/')
      );

    return files;
  },

  getFilesByPatternInFolder: (
    rootDir: string,
    folder: string,
    patterns: string[]
  ): string[] => {
    let validFiles: string[] = [];

    patterns.forEach((pattern: string) => {
      const files = fg.sync(
        join(rootDir, folder).replace(/\\/g, '/') + '/**/' + pattern
      );

      validFiles = validFiles.concat(files);
    });

    return validFiles;
  },

  getFoldersInFolder: (rootDir: string, folder: string): string[] => {
    const completeFolderPath = join(rootDir, folder).replace(/\\/g, '/');

    const items = fs.readdirSync(completeFolderPath, { withFileTypes: true });

    return items
      .filter((item: fs.Dirent) => item.isDirectory())
      .map((item: fs.Dirent) => item.name);
  },

  getFilename: (completePath: string): string => {
    const basePath = path.parse(completePath).base;
    const basePathArray = basePath.split('.');
    basePathArray.pop();
    return basePathArray.join('.').replace(/\\/g, '/');
  },

  getDeepFoldersInFolder: (
    rootDir: string,
    folder: string,
    folders: string[]
  ): string[] => {
    const completeFolderPath = join(rootDir, folder).replace(/\\/g, '/');

    const items = fs.readdirSync(completeFolderPath, { withFileTypes: true });

    items.forEach((item: fs.Dirent) => {
      if (item.isDirectory()) {
        folders.push(join(completeFolderPath, item.name).replace(/\\/g, '/'));
        FileSystem.getDeepFoldersInFolder(
          rootDir,
          join(folder, item.name).replace(/\\/g, '/'),
          folders
        );
      }
    });

    return folders;
  },

  getFolderName: (completePath: string): string => {
    const basePath = path.parse(completePath).base;
    return basePath;
  }
};
