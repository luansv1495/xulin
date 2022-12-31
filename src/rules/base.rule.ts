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
import { RuleModel, VerifyStateEnum } from './rule.model';

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
  customVerify(rootDir: string): VerifyStateEnum {
    /* istanbul ignore next */
    return VerifyStateEnum.skipped;
  }

  verify(rootDir: string): VerifyStateEnum {
    if (this.rule.skip === true) {
      Logger.handler(VerifyStateEnum.skipped, this.verifyMessage);
      return VerifyStateEnum.skipped;
    }
    return this.customVerify(rootDir);
  }
}
