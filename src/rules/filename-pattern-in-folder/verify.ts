import { readdirSync } from 'fs';
import fg from 'fast-glob';
import { grey } from 'kleur';
import path from 'path';
import { FilePatternNotMatchInRuleError } from '../../error';
import { Logger } from '../../utils';
import { FilenamePatternInFolderModel } from '../filename-pattern-in-folder';
import { HandlerStateEnum, RuleModel } from '../rule.model';

const getFilesInFolder = (
  projectPath: string,
  folder: string,
  files: string[]
): string[] => {
  const completeFolderPath = path.join(projectPath, folder);

  const items = readdirSync(completeFolderPath, { withFileTypes: true });

  items.forEach((item) => {
    if (item.isDirectory()) {
      files = getFilesInFolder(
        projectPath,
        path.join(folder, item.name),
        files
      );
    } else {
      files.push(path.join(completeFolderPath, item.name));
    }
  });

  return files;
};

const getValidFilesInFolder = (
  projectPath: string,
  rule: FilenamePatternInFolderModel
): string[] => {
  let validFiles: string[] = [];

  rule.patterns.forEach((pattern) => {
    const files = fg.sync(
      path.join(projectPath, rule.folder) + '/**/' + pattern
    );
    validFiles = validFiles.concat(files);
  });

  return validFiles;
};

const getInvalidFilesInFolder = (
  filesInFolder: string[],
  validFilesInFolder: string[]
): string[] => {
  const invalidFiles = filesInFolder.filter((fileInFolder) => {
    if (!validFilesInFolder.includes(fileInFolder)) {
      return true;
    }
    return false;
  });

  return invalidFiles;
};

const getLoggerMessage = (rule: FilenamePatternInFolderModel): string => {
  return `Files in ${grey(rule.folder)} should contains ${grey(
    rule.patterns.join(',')
  )}.`;
};

export const verifyFilenamePatternInFolder = (
  projectPath: string,
  rule: FilenamePatternInFolderModel
) => {
  if ((rule as RuleModel).skip === true) {
    Logger.handler(HandlerStateEnum.skipped, getLoggerMessage(rule));
    return HandlerStateEnum.skipped;
  }

  const filesInFolder = getFilesInFolder(projectPath, rule.folder, []);

  const validFilesInFolder = getValidFilesInFolder(projectPath, rule);

  const invalidFilesInFolder = getInvalidFilesInFolder(
    filesInFolder,
    validFilesInFolder
  );

  if (invalidFilesInFolder.length != 0) {
    Logger.handler(HandlerStateEnum.failed, getLoggerMessage(rule));

    invalidFilesInFolder.forEach((invalidFile) => {
      new FilePatternNotMatchInRuleError(
        invalidFile,
        (rule as RuleModel).name
      ).showError(1);
    });

    return HandlerStateEnum.failed;
  } else {
    Logger.handler(HandlerStateEnum.passed, getLoggerMessage(rule));

    return HandlerStateEnum.passed;
  }
};
