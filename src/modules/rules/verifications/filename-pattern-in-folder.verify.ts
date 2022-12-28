import { readdirSync } from 'fs';
import glob from 'glob';
import { grey } from 'kleur';
import path from 'path';
import { RuleModel } from '../models/rule.model';
import { FilenamePatternInFolderRule, HandlerRuleStateEnum } from '../models';
import { showState } from '../utils';
import { BaseError, FilePatternNotMatchInRuleError } from '../../../error';

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
        path.join(completeFolderPath, item.name),
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
  rule: FilenamePatternInFolderRule
): string[] => {
  let validFiles: string[] = [];

  rule.patterns.forEach((pattern) => {
    const files = glob.sync(pattern, {
      root: path.join(projectPath, rule.folder)
    });
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

const getLoggerMessage = (rule: FilenamePatternInFolderRule): string => {
  return `Files in ${grey(rule.folder)} should contains ${grey(
    rule.patterns.join(',')
  )}.`;
};

export const verifyFilenamePatternInFolder = (
  projectPath: string,
  rule: FilenamePatternInFolderRule
) => {
  try {
    if ((rule as RuleModel).skip === true) {
      showState(HandlerRuleStateEnum.skipped, getLoggerMessage(rule));
      return HandlerRuleStateEnum.skipped;
    }

    const filesInFolder = getFilesInFolder(projectPath, rule.folder, []);

    const validFilesInFolder = getValidFilesInFolder(projectPath, rule);

    const invalidFilesInFolder = getInvalidFilesInFolder(
      filesInFolder,
      validFilesInFolder
    );

    if (invalidFilesInFolder.length != 0) {
      showState(HandlerRuleStateEnum.failed, getLoggerMessage(rule));

      invalidFilesInFolder.forEach((invalidFile) => {
        new FilePatternNotMatchInRuleError(
          invalidFile,
          (rule as RuleModel).name
        ).showError(1);
      });

      return HandlerRuleStateEnum.failed;
    } else {
      showState(HandlerRuleStateEnum.passed, getLoggerMessage(rule));

      return HandlerRuleStateEnum.passed;
    }
  } catch (error: unknown) {
    (error as BaseError).showError();
    return HandlerRuleStateEnum.failed;
  }
};
