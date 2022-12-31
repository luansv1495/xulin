import { BaseValidation, BaseValidationProps } from '../base.validation';
import { RuleIsInvalidError } from '../../error';

export class IsNotObjectValidation implements BaseValidation {
  validate(props: BaseValidationProps): void {
    if (Object.prototype.toString.call(props.rule) != '[object Object]') {
      throw new RuleIsInvalidError(props.rule);
    }
  }
}
