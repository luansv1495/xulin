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
import { BaseRule } from '../base.rule';
import { RuleModel, VerifyStateEnum } from '../rule.model';

export class FilenamePatternInFolderRule extends BaseRule {
  validations: BaseValidation[] = [
    new ContainsUnexpectFieldValidation(),
    new ContainsRequiredFieldsValidation(),
    new IsValidFolderValidation(),
    new IsValidFilenamePatternValidation()
  ];

  constructor(rule: RuleModel) {
    super(rule);
    if (rule.patterns) {
      this.verifyMessage = `Files in ${grey(
        rule.folder
      )} should contains ${grey(rule.patterns.join(','))}.`;
    }
  }

  getInvalidFilesInFolder = (
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

  customVerify(rootDir: string): VerifyStateEnum {
    const filesInFolder = FileSystem.getFilesInFolder(
      rootDir,
      this.rule.folder,
      []
    );

    const validFilesInFolder = FileSystem.getFilesByPatternInFolder(
      rootDir,
      this.rule.folder,
      this.rule.patterns
    );

    const invalidFilesInFolder = this.getInvalidFilesInFolder(
      filesInFolder,
      validFilesInFolder
    );

    if (invalidFilesInFolder.length != 0) {
      Logger.handler(VerifyStateEnum.failed, this.verifyMessage);

      invalidFilesInFolder.forEach((invalidFile) => {
        new FilePatternNotMatchInRuleError(
          invalidFile,
          this.rule.name
        ).showError(1);
      });

      return VerifyStateEnum.failed;
    } else {
      Logger.handler(VerifyStateEnum.passed, this.verifyMessage);
      return VerifyStateEnum.passed;
    }
  }
}
