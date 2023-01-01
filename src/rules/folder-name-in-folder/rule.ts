import { grey } from 'kleur';
import { FolderNameNotMatchInRuleError } from '../../error';
import { FileSystem, Logger } from '../../utils';
import {
  BaseValidation,
  ContainsRequiredFieldsValidation,
  ContainsUnexpectFieldValidation,
  IsValidFolderNameValidation,
  IsValidFolderValidation
} from '../../validation';
import { BaseRule } from '../base.rule';
import { RuleModel, VerifyStateEnum } from '../rule.model';

export class FolderNameInFolderRule extends BaseRule {
  validations: BaseValidation[] = [
    new ContainsUnexpectFieldValidation(),
    new ContainsRequiredFieldsValidation(),
    new IsValidFolderValidation(),
    new IsValidFolderNameValidation()
  ];

  constructor(rule: RuleModel) {
    super(rule);
    if (rule.names) {
      this.verifyMessage = `Folder in ${grey(
        rule.folder
      )} should must contain one of the names ${grey(rule.names.join(','))}.`;
    }
  }

  getInvalidFolderInFolder = (foldersInFolder: string[]): string[] => {
    const invalidFolders = foldersInFolder.filter((folder) => {
      if (!this.rule.names.includes(folder)) {
        return true;
      }
      return false;
    });

    return invalidFolders;
  };

  customVerify(rootDir: string): VerifyStateEnum {
    const foldersInFolder = FileSystem.getFoldersInFolder(
      rootDir,
      this.rule.folder
    );

    const invalidFolders = this.getInvalidFolderInFolder(foldersInFolder);

    if (invalidFolders.length != 0) {
      Logger.handler(VerifyStateEnum.failed, this.verifyMessage);

      invalidFolders.forEach((folder) => {
        new FolderNameNotMatchInRuleError(folder, this.rule.name).showError(1);
      });

      return VerifyStateEnum.failed;
    } else {
      Logger.handler(VerifyStateEnum.passed, this.verifyMessage);
      return VerifyStateEnum.passed;
    }
  }
}
