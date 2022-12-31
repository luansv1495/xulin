import { BaseValidation, BaseValidationProps } from '../base.validation';
import { RuleNameNotRecognizeError } from '../../error';

export class ContainsExpectedRuleNamesValidation implements BaseValidation {
  validate(props: BaseValidationProps): void {
    if (!props.expectedFields.includes(props.rule.name)) {
      throw new RuleNameNotRecognizeError(props.rule.name);
    }
  }
}
