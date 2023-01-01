/* eslint-disable @typescript-eslint/no-unused-vars */
import { Logger } from '../utils';
import {
  BaseValidation,
  BaseValidationProps,
  ContainsExpectedRuleNamesValidation,
  IsNotObjectValidation,
  NameIsNotAStringValidation,
  NameIsRequiredValidation,
  SkipIsNotABooleanValidation
} from '../validation';
import { RuleModel, VerifyRuleState, VerifyStateEnum } from './rule.model';

export class BaseRule {
  rule: RuleModel;
  verifyMessage = '';
  validations: BaseValidation[] = [
    new IsNotObjectValidation(),
    new NameIsRequiredValidation(),
    new NameIsNotAStringValidation(),
    new ContainsExpectedRuleNamesValidation(),
    new SkipIsNotABooleanValidation()
  ];

  constructor(rule: RuleModel) {
    this.rule = rule;
  }

  validate(props: BaseValidationProps): void {
    this.validations.forEach((validation) => validation.validate(props));
  }

  /* istanbul ignore next */
  customVerify(rootDir: string): VerifyRuleState {
    /* istanbul ignore next */
    return {
      state: VerifyStateEnum.skipped,
      passed: 0,
      failed: 0
    };
  }

  verify(rootDir: string): VerifyRuleState {
    if (this.rule.skip === true) {
      Logger.handler(VerifyStateEnum.skipped, this.verifyMessage);
      return {
        state: VerifyStateEnum.skipped,
        passed: 0,
        failed: 0
      };
    }
    return this.customVerify(rootDir);
  }
}
