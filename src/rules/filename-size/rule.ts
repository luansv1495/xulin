import { grey } from 'kleur';
import { FilenameSizeInRuleError } from '../../error';
import { FileSystem, Logger } from '../../utils';
import {
  BaseValidation,
  ContainsRequiredFieldsValidation,
  ContainsUnexpectFieldValidation,
  IsValidFolderValidation,
  IsValidMaxMinValidation
} from '../../validation';
import { BaseRule } from '../base.rule';
import { RuleModel, VerifyRuleState, VerifyStateEnum } from '../rule.model';

export class FilenameSizeInFolderRule extends BaseRule {
  validations: BaseValidation[] = [
    new ContainsUnexpectFieldValidation(),
    new ContainsRequiredFieldsValidation(),
    new IsValidFolderValidation(),
    new IsValidMaxMinValidation()
  ];

  constructor(rule: RuleModel) {
    super(rule);
    if (rule.min != undefined && rule.max != undefined) {
      this.verifyMessage = `Filenames must contain a minimum of ${grey(
        rule.min
      )} characters and a maximum of ${grey(rule.max)} characters in ${grey(
        rule.folder
      )} folder.`;
    }
  }

  getValidFiles = (filesInFolder: string[]): string[] => {
    const validFiles = filesInFolder.filter((file) => {
      const length = FileSystem.getFilename(file).length;
      return length >= this.rule.min && length <= this.rule.max;
    });

    return validFiles;
  };

  getInvalidFiles = (
    filesInFolder: string[],
    validFiles: string[]
  ): string[] => {
    const invalidFiles = filesInFolder.filter(
      (file) => !validFiles.includes(file)
    );

    return invalidFiles;
  };

  customVerify(rootDir: string): VerifyRuleState {
    const filesInFolder = FileSystem.getDeepFilesInFolder(
      rootDir,
      this.rule.folder,
      []
    );

    const validFiles = this.getValidFiles(filesInFolder);

    const invalidFiles = this.getInvalidFiles(filesInFolder, validFiles);

    if (invalidFiles.length != 0) {
      Logger.handler(VerifyStateEnum.failed, this.verifyMessage);

      invalidFiles.forEach((invalidFile) => {
        new FilenameSizeInRuleError(invalidFile, this.rule.name).showError(1);
      });

      return {
        state: VerifyStateEnum.failed,
        passed: validFiles.length,
        failed: invalidFiles.length
      };
    } else {
      Logger.handler(VerifyStateEnum.passed, this.verifyMessage);
      return {
        state: VerifyStateEnum.passed,
        passed: validFiles.length,
        failed: invalidFiles.length
      };
    }
  }
}
