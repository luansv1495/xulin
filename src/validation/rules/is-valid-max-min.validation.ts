import { BaseValidation, BaseValidationProps } from '../base.validation';
import { MaxMinIsInvalidInRuleError } from '../../error';
import { validateMaxMin, validateQuantity } from '../generic-validations';

export class IsValidMaxMinValidation implements BaseValidation {
  validate(props: BaseValidationProps): void {
    const maxResult = validateQuantity(props.rule.max);
    const minResult = validateQuantity(props.rule.min);
    const maxMinResult = validateMaxMin(props.rule.max, props.rule.min);

    if (maxResult) {
      throw new MaxMinIsInvalidInRuleError(maxResult, props.rule.name, 'max');
    } else if (minResult) {
      throw new MaxMinIsInvalidInRuleError(minResult, props.rule.name, 'min');
    } else if (maxMinResult) {
      throw new MaxMinIsInvalidInRuleError(
        maxMinResult,
        props.rule.name,
        'min'
      );
    }
  }
}
