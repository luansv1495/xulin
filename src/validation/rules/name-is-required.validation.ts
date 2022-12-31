import { RuleNameIsRequiredError } from '../../error';
import { BaseValidation, BaseValidationProps } from '../base.validation';

export class NameIsRequiredValidation implements BaseValidation {
  validate(props: BaseValidationProps): void {
    if (!props.rule.name) {
      throw new RuleNameIsRequiredError(props.rule);
    }
  }
}
