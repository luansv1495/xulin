import { BaseValidation, BaseValidationProps } from '../base.validation';
import { FolderInListIsInvalidInRuleError } from '../../error';
import { validateArray, validateFolder } from '../generic-validations';

export class IsValidFolderListValidation implements BaseValidation {
  validate(props: BaseValidationProps): void {
    const result = validateArray(props.rule.folders);
    if (result) {
      throw new FolderInListIsInvalidInRuleError(result, props.rule.name);
    }

    props.rule.folders.forEach((folder: unknown) => {
      const result = validateFolder(props.rootDir, folder);

      if (result) {
        throw new FolderInListIsInvalidInRuleError(result, props.rule.name);
      }
    });
  }
}
