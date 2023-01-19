import { grey } from 'kleur';
import { FolderNameSizeInRuleError } from '../../error';
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

export class FolderNameSizeInFolderRule extends BaseRule {
  validations: BaseValidation[] = [
    new ContainsUnexpectFieldValidation(),
    new ContainsRequiredFieldsValidation(),
    new IsValidFolderValidation(),
    new IsValidMaxMinValidation()
  ];

  constructor(rule: RuleModel) {
    super(rule);
    if (rule.min != undefined && rule.max != undefined) {
      this.verifyMessage = `Folders names must contain a minimum of ${grey(
        rule.min
      )} characters and a maximum of ${grey(rule.max)} characters in ${grey(
        rule.folder
      )} folder.`;
    }
  }

  getValidFolders = (foldersInFolder: string[]): string[] => {
    const validFolders = foldersInFolder.filter((folder: string) => {
      const length = FileSystem.getFolderName(folder).length;
      return length >= this.rule.min && length <= this.rule.max;
    });

    return validFolders;
  };

  getInvalidFolders = (
    foldersInFolder: string[],
    validFolders: string[]
  ): string[] => {
    const invalidFolders = foldersInFolder.filter(
      (folder: string) => !validFolders.includes(folder)
    );

    return invalidFolders;
  };

  customVerify(rootDir: string): VerifyRuleState {
    const foldersInFolder = FileSystem.getDeepFoldersInFolder(
      rootDir,
      this.rule.folder,
      []
    );

    const validFolders = this.getValidFolders(foldersInFolder);

    const invalidFolders = this.getInvalidFolders(
      foldersInFolder,
      validFolders
    );

    if (invalidFolders.length != 0) {
      Logger.handler(VerifyStateEnum.failed, this.verifyMessage);

      invalidFolders.forEach((invalidFolder: string) => {
        new FolderNameSizeInRuleError(invalidFolder, this.rule.name).showError(
          1
        );
      });

      return {
        state: VerifyStateEnum.failed,
        passed: validFolders.length,
        failed: invalidFolders.length
      };
    } else {
      Logger.handler(VerifyStateEnum.passed, this.verifyMessage);
      return {
        state: VerifyStateEnum.passed,
        passed: validFolders.length,
        failed: invalidFolders.length
      };
    }
  }
}
