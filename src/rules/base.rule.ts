import {
  BaseValidation,
  BaseValidationProps,
  ContainsExpectedRuleNamesValidation,
  IsNotObjectValidation,
  NameIsNotAStringValidation,
  NameIsRequiredValidation,
  SkipIsNotABooleanValidation
} from '../validation';

export class BaseRule {
  validations: BaseValidation[] = [
    new IsNotObjectValidation(),
    new NameIsRequiredValidation(),
    new NameIsNotAStringValidation(),
    new ContainsExpectedRuleNamesValidation(),
    new SkipIsNotABooleanValidation()
  ];

  validate = (props: BaseValidationProps): void => {
    this.validations.forEach((validation) => validation.validate(props));
  };
}
