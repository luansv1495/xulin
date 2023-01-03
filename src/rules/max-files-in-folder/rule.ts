import { grey } from 'kleur';
import { FileSystem, Logger } from '../../utils';
import {
  BaseValidation,
  ContainsRequiredFieldsValidation,
  ContainsUnexpectFieldValidation,
  IsValidQuantityValidation,
  IsValidFolderValidation
} from '../../validation';
import { BaseRule } from '../base.rule';
import { RuleModel, VerifyRuleState, VerifyStateEnum } from '../rule.model';

export class MaxFilesInFolderRule extends BaseRule {
  validations: BaseValidation[] = [
    new ContainsUnexpectFieldValidation(),
    new ContainsRequiredFieldsValidation(),
    new IsValidFolderValidation(),
    new IsValidQuantityValidation()
  ];

  constructor(rule: RuleModel) {
    super(rule);
    if (rule.quantity != undefined) {
      this.verifyMessage = `Folder ${grey(rule.folder)} should contain ${grey(
        rule.quantity
      )} files.`;
    }
  }

  customVerify(rootDir: string): VerifyRuleState {
    const filesInFolder = FileSystem.getFilesInFolder(
      rootDir,
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
