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
import {
  RuleModel,
  RuleNameEnum,
  VerifyRuleState,
  VerifyStateEnum
} from './rule.model';

export interface BaseRuleProps {
  rule: RuleModel;
  rootDir: string;
}

export class BaseRule {
  rule: RuleModel;
  verifyMessage = '';
  rootDir = '.';
  expectedFields: string[] = Object.values(RuleNameEnum);
  validations: BaseValidation[] = [
    new IsNotObjectValidation(),
    new NameIsRequiredValidation(),
    new NameIsNotAStringValidation(),
    new ContainsExpectedRuleNamesValidation(),
    new SkipIsNotABooleanValidation()
  ];

  constructor(props: BaseRuleProps) {
    this.rule = props.rule;
    this.rootDir = props.rootDir;
  }

  validate(): void {
    this.validations.forEach((validation: BaseValidation) =>
      validation.validate({
        rule: this.rule,
        rootDir: this.rootDir,
        expectedFields: this.expectedFields
      })
    );
  }

  /* istanbul ignore next */
  async customVerify(): Promise<VerifyRuleState> {
    /* istanbul ignore next */
    return {
      state: VerifyStateEnum.skipped,
      passed: 0,
      failed: 0
    };
  }

  /* istanbul ignore next */
  makeVerifyMessage(): void {
    /* istanbul ignore next */
    return;
  }

  async verify(): Promise<VerifyRuleState> {
    this.makeVerifyMessage();

    if (this.rule.skip === true) {
      Logger.handler(VerifyStateEnum.skipped, this.verifyMessage);
      return {
        state: VerifyStateEnum.skipped,
        passed: 0,
        failed: 0
      };
    }
    return this.customVerify();
  }
}
