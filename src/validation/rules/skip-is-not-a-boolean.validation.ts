import { RuleSkipIsNotBooleanError } from '../../error';
import { BaseValidation, BaseValidationProps } from '../base.validation';

export class SkipIsNotABooleanValidation implements BaseValidation {
  validate(props: BaseValidationProps): void {
    if (!!props.rule.skip && typeof props.rule.skip != 'boolean') {
      throw new RuleSkipIsNotBooleanError(props.rule.skip);
    }
  }
}
