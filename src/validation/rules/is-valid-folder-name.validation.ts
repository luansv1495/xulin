import { BaseValidation, BaseValidationProps } from '../base.validation';
import { FolderNameIsInvalidInRuleError } from '../../error';
import { validateFoldername } from '../generic-validations';

export class IsValidFolderNameValidation implements BaseValidation {
  validate(props: BaseValidationProps): void {
    props.rule.names.forEach((name: unknown) => {
      const result = validateFoldername(name);
      if (result) {
        throw new FolderNameIsInvalidInRuleError(result, props.rule.name);
      }
    });
  }
}
