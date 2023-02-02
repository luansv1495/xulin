import { BaseValidation, BaseValidationProps } from '../base.validation';
import { PatternsIsInvalidInRuleError } from '../../error';
import { validateArray, validateFilenamePattern } from '../generic-validations';

export class IsValidFilenamePatternValidation implements BaseValidation {
  validate(props: BaseValidationProps): void {
    const result = validateArray(props.rule.patterns);
    if (result) {
      throw new PatternsIsInvalidInRuleError(result, props.rule.name);
    }

    props.rule.patterns.forEach((pattern: unknown) => {
      const result = validateFilenamePattern(pattern);
      if (result) {
        throw new PatternsIsInvalidInRuleError(result, props.rule.name);
      }
    });
  }
}
