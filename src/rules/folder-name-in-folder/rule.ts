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
import { BaseRule, BaseRuleProps } from '../base.rule';
import { VerifyRuleState, VerifyStateEnum } from '../rule.model';
import { FolderNameInFolderProps } from './model';

export class FolderNameInFolderRule extends BaseRule {
  expectedFields: string[] = Object.values(FolderNameInFolderProps) as string[];
  validations: BaseValidation[] = [
    new ContainsUnexpectFieldValidation(),
    new ContainsRequiredFieldsValidation(),
    new IsValidFolderValidation(),
    new IsValidFolderNameValidation()
  ];

  constructor(props: BaseRuleProps) {
    super(props);
  }

  makeVerifyMessage(): void {
    this.verifyMessage = `Folder in ${grey(
      this.rule.folder
    )} should must contain one of the names ${grey(
      this.rule.names.join(',')
    )}.`;
  }

  getInvalidFolderInFolder = (foldersInFolder: string[]): string[] => {
    const invalidFolders = foldersInFolder.filter(
      (folder: string) => !this.rule.names.includes(folder)
    );

    return invalidFolders;
  };

  getValidFolderInFolder = (foldersInFolder: string[]): string[] => {
    const validFolders = foldersInFolder.filter((folder: string) =>
      this.rule.names.includes(folder)
    );

    return validFolders;
  };

  async customVerify(): Promise<VerifyRuleState> {
    const foldersInFolder = FileSystem.getFoldersInFolder(
      this.rootDir,
      this.rule.folder
    );

    const validFolders = this.getValidFolderInFolder(foldersInFolder);

    const invalidFolders = this.getInvalidFolderInFolder(foldersInFolder);

    if (invalidFolders.length != 0) {
      Logger.handler(VerifyStateEnum.failed, this.verifyMessage);

      invalidFolders.forEach((folder: string) => {
        new FolderNameNotMatchInRuleError(folder, this.rule.name).showError(1);
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
