import { grey } from 'kleur';
import { FileSystem, Logger } from '../../utils';
import {
  BaseValidation,
  ContainsRequiredFieldsValidation,
  ContainsUnexpectFieldValidation,
  IsValidQuantityValidation,
  IsValidFolderValidation
} from '../../validation';
import { BaseRule, BaseRuleProps } from '../base.rule';
import { VerifyRuleState, VerifyStateEnum } from '../rule.model';
import { MaxFilesInFolderProps } from './model';

export class MaxFilesInFolderRule extends BaseRule {
  expectedFields: string[] = Object.values(MaxFilesInFolderProps) as string[];
  validations: BaseValidation[] = [
    new ContainsUnexpectFieldValidation(),
    new ContainsRequiredFieldsValidation(),
    new IsValidFolderValidation(),
    new IsValidQuantityValidation()
  ];

  constructor(props: BaseRuleProps) {
    super(props);
  }

  makeVerifyMessage(): void {
    this.verifyMessage = `Folder ${grey(
      this.rule.folder
    )} should contain ${grey(this.rule.quantity)} files.`;
  }

  async customVerify(): Promise<VerifyRuleState> {
    const filesInFolder = FileSystem.getFilesInFolder(
      this.rootDir,
      this.rule.folder
    );

    if (filesInFolder.length > this.rule.quantity) {
      Logger.handler(VerifyStateEnum.failed, this.verifyMessage);

      return {
        state: VerifyStateEnum.failed,
        passed: this.rule.quantity,
        failed: filesInFolder.length - this.rule.quantity
      };
    } else {
      Logger.handler(VerifyStateEnum.passed, this.verifyMessage);
      return {
        state: VerifyStateEnum.passed,
        passed: filesInFolder.length,
        failed: 0
      };
    }
  }
}
