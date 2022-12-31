import { BaseValidation, BaseValidationProps } from '../base.validation';
import { UnexpectFieldInRuleError } from '../../error';

export class ContainsUnexpectFieldValidation implements BaseValidation {
  validate(props: BaseValidationProps): void {
    Object.keys(props.rule).forEach((received) => {
      if (!props.expectedFields.includes(received)) {
        throw new UnexpectFieldInRuleError(received, props.rule.name);
      }
    });
  }
}
