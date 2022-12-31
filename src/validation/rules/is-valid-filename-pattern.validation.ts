import { BaseValidation, BaseValidationProps } from '../base.validation';
import { PatternsIsInvalidInRuleError } from '../../error';
import { validateFilenamePattern } from '../generic-validations';

export class IsValidFilenamePatternValidation implements BaseValidation {
  validate(props: BaseValidationProps): void {
    props.rule.patterns.forEach((pattern: unknown) => {
      const result = validateFilenamePattern(pattern);
      if (result) {
        throw new PatternsIsInvalidInRuleError(result, props.rule.name);
      }
    });
  }
}
