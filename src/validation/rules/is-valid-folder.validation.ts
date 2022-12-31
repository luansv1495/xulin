import { BaseValidation, BaseValidationProps } from '../base.validation';
import { FolderIsInvalidInRuleError } from '../../error';
import { validateFolder } from '../generic-validations';

export class IsValidFolderValidation implements BaseValidation {
  validate(props: BaseValidationProps): void {
    const result = validateFolder(props.rootDir, props.rule.folder);

    if (result) {
      throw new FolderIsInvalidInRuleError(result, props.rule.name);
    }
  }
}
