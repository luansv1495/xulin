import { BaseValidation, BaseValidationProps } from '../base.validation';
import { FieldIsRequiredInRuleError } from '../../error';

export class ContainsRequiredFieldsValidation implements BaseValidation {
  validate(props: BaseValidationProps): void {
    props.expectedFields.forEach((expected: string) => {
      if (!Object.keys(props.rule).includes(expected)) {
        throw new FieldIsRequiredInRuleError(expected, props.rule.name);
      }
    });
  }
}
