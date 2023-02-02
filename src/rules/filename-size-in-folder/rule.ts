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
import { BaseRule, BaseRuleProps } from '../base.rule';
import { VerifyRuleState, VerifyStateEnum } from '../rule.model';
import { FilenameSizeInFolderProps } from './model';

export class FilenameSizeInFolderRule extends BaseRule {
  expectedFields: string[] = Object.values(
    FilenameSizeInFolderProps
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
    this.verifyMessage = `Filenames must contain a minimum of ${grey(
      this.rule.min
    )} characters and a maximum of ${grey(this.rule.max)} characters in ${grey(
      this.rule.folder
    )} folder.`;
  }

  getValidFiles = (filesInFolder: string[]): string[] => {
    const validFiles = filesInFolder.filter((file: string) => {
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
      (file: string) => !validFiles.includes(file)
    );

    return invalidFiles;
  };

  async customVerify(): Promise<VerifyRuleState> {
    const filesInFolder = FileSystem.getDeepFilesInFolder(
      this.rootDir,
      this.rule.folder,
      []
    );

    const validFiles = this.getValidFiles(filesInFolder);

    const invalidFiles = this.getInvalidFiles(filesInFolder, validFiles);

    if (invalidFiles.length != 0) {
      Logger.handler(VerifyStateEnum.failed, this.verifyMessage);

      invalidFiles.forEach((invalidFile: string) => {
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
