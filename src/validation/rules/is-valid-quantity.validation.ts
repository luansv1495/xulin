import { BaseValidation, BaseValidationProps } from '../base.validation';
import { QuantityIsInvalidInRuleError } from '../../error';
import { validateQuantity } from '../generic-validations';

export class IsValidQuantityValidation implements BaseValidation {
  validate(props: BaseValidationProps): void {
    const result = validateQuantity(props.rule.quantity);

    if (result) {
      throw new QuantityIsInvalidInRuleError(result, props.rule.name);
    }
  }
}
