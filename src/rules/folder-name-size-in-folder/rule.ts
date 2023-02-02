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
import { BaseRule, BaseRuleProps } from '../base.rule';
import { VerifyRuleState, VerifyStateEnum } from '../rule.model';
import { FolderNameSizeInFolderProps } from './model';

export class FolderNameSizeInFolderRule extends BaseRule {
  expectedFields: string[] = Object.values(
    FolderNameSizeInFolderProps
  ) as string[];
  validations: BaseValidation[] = [
    new ContainsUnexpectFieldValidation(),
    new ContainsRequiredFieldsValidation(),
    new IsValidFolderValidation(),
    new IsValidMaxMinValidation()
  ];

  constructor(props: BaseRuleProps) {
    super(props);
  }

  makeVerifyMessage(): void {
    this.verifyMessage = `Folders names must contain a minimum of ${grey(
      this.rule.min
    )} characters and a maximum of ${grey(this.rule.max)} characters in ${grey(
      this.rule.folder
    )} folder.`;
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

  async customVerify(): Promise<VerifyRuleState> {
    const foldersInFolder = FileSystem.getDeepFoldersInFolder(
      this.rootDir,
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
