import { RuleNameIsNotStringError } from '../../error';
import { BaseValidation, BaseValidationProps } from '../base.validation';

export class NameIsNotAStringValidation implements BaseValidation {
  validate(props: BaseValidationProps): void {
    if (typeof props.rule.name != 'string') {
      throw new RuleNameIsNotStringError(props.rule.name);
    }
  }
}
