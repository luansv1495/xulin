import {
  FieldIsRequiredInRuleError,
  FolderIsInvalidInRuleError,
  PatternsIsInvalidInRuleError,
  UnexpectFieldInRuleError
} from '../../../error';
import {
  FilenamePatternInFolderRule,
  FilenamePatternInFolderRuleProps,
  RuleNameEnum
} from '../models';
import { validateFilenamePattern, validateFolder } from './generic-validations';

const checkUnexpectdFields = (
  receivedKeys: string[],
  expectedKeys: FilenamePatternInFolderRuleProps[]
) => {
  receivedKeys.forEach((receivedKey) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!expectedKeys.includes(receivedKey as any)) {
      throw new UnexpectFieldInRuleError(
        receivedKey,
        RuleNameEnum.filenamePatternInFolder
      );
    }
  });
};

const checkRequiredFields = (
  receivedKeys: string[],
  expectedKeys: FilenamePatternInFolderRuleProps[]
) => {
  expectedKeys.forEach((expectedKey) => {
    if (!receivedKeys.includes(expectedKey)) {
      throw new FieldIsRequiredInRuleError(
        expectedKey,
        RuleNameEnum.filenamePatternInFolder
      );
    }
  });
};

const checkFolderField = (projectPath: string, folder: unknown) => {
  const result = validateFolder(projectPath, folder);
  if (result) {
    throw new FolderIsInvalidInRuleError(
      result,
      RuleNameEnum.filenamePatternInFolder
    );
  }
};

const checkPatternsField = (patterns: string[]) => {
  patterns.forEach((pattern) => {
    const result = validateFilenamePattern(pattern);
    if (result) {
      throw new PatternsIsInvalidInRuleError(
        result,
        RuleNameEnum.filenamePatternInFolder
      );
    }
  });
};

export const validateFilenamePatterInFolderRule = (
  projectPath: string,
  rule: FilenamePatternInFolderRule
) => {
  const receivedKeys = Object.keys(rule);
  const expectedKeys = Object.values(FilenamePatternInFolderRuleProps);

  checkUnexpectdFields(receivedKeys, expectedKeys);

  checkRequiredFields(receivedKeys, expectedKeys);

  checkFolderField(projectPath, rule.folder);

  checkPatternsField(rule.patterns);
};
