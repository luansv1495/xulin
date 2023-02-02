import { grey } from 'kleur';
import { FilePatternNotMatchInRuleError } from '../../error';
import { FileSystem, Logger } from '../../utils';
import {
  BaseValidation,
  ContainsRequiredFieldsValidation,
  ContainsUnexpectFieldValidation,
  IsValidFilenamePatternValidation,
  IsValidFolderValidation
} from '../../validation';
import { BaseRule, BaseRuleProps } from '../base.rule';
import { VerifyRuleState, VerifyStateEnum } from '../rule.model';
import { FilenamePatternInFolderProps } from './model';

export class FilenamePatternInFolderRule extends BaseRule {
  expectedFields: string[] = Object.values(
    FilenamePatternInFolderProps
  ) as string[];
  validations: BaseValidation[] = [
    new ContainsUnexpectFieldValidation(),
    new ContainsRequiredFieldsValidation(),
    new IsValidFolderValidation(),
    new IsValidFilenamePatternValidation()
  ];

  constructor(props: BaseRuleProps) {
    super(props);
  }

  makeVerifyMessage(): void {
    this.verifyMessage = `Files in ${grey(
      this.rule.folder
    )} should contains ${grey(this.rule.patterns.join(','))}.`;
  }

  getInvalidFilesInFolder = (
    filesInFolder: string[],
    validFilesInFolder: string[]
  ): string[] => {
    const invalidFiles = filesInFolder.filter(
      (fileInFolder: string) => !validFilesInFolder.includes(fileInFolder)
    );

    return invalidFiles;
  };

  async customVerify(): Promise<VerifyRuleState> {
    const filesInFolder = FileSystem.getDeepFilesInFolder(
      this.rootDir,
      this.rule.folder,
      []
    );

    const validFilesInFolder = FileSystem.getFilesByPatternInFolder(
      this.rootDir,
      this.rule.folder,
      this.rule.patterns
    );

    const invalidFilesInFolder = this.getInvalidFilesInFolder(
      filesInFolder,
      validFilesInFolder
    );

    if (invalidFilesInFolder.length != 0) {
      Logger.handler(VerifyStateEnum.failed, this.verifyMessage);

      invalidFilesInFolder.forEach((invalidFile: string) => {
        new FilePatternNotMatchInRuleError(
          invalidFile,
          this.rule.name
        ).showError(1);
      });

      return {
        state: VerifyStateEnum.failed,
        passed: validFilesInFolder.length,
        failed: invalidFilesInFolder.length
      };
    } else {
      Logger.handler(VerifyStateEnum.passed, this.verifyMessage);
      return {
        state: VerifyStateEnum.passed,
        passed: validFilesInFolder.length,
        failed: invalidFilesInFolder.length
      };
    }
  }
}
