import { BaseValidation, BaseValidationProps } from '../base.validation';
import { FolderInListIsEqualToTargetFolderInRuleError } from '../../error';

export class ContainsTargetFolderInFolderListValidation
  implements BaseValidation
{
  validate(props: BaseValidationProps): void {
    if (props.rule.folders.includes(props.rule.folder)) {
      throw new FolderInListIsEqualToTargetFolderInRuleError(
        `"${props.rule.folder}" is equal the target folder.`,
        props.rule.name
      );
    }
  }
}
