import { BaseValidation, BaseValidationProps } from '../base.validation';
import { UnexpectFieldInRuleError } from '../../error';
import { RuleProps } from '../../rules/rule.model';

export class ContainsUnexpectFieldValidation implements BaseValidation {
  validate(props: BaseValidationProps): void {
    Object.keys(props.rule).forEach((received: string) => {
      if (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        !Object.values(RuleProps).includes(received as any) &&
        !props.expectedFields.includes(received)
      ) {
        throw new UnexpectFieldInRuleError(received, props.rule.name);
      }
    });
  }
}
