import {
  BaseValidation,
  ContainsRequiredFieldsValidation,
  ContainsUnexpectFieldValidation,
  IsValidFilenamePatternValidation,
  IsValidFolderValidation
} from '../../validation';
import { BaseRule } from '../base.rule';

export class FilenamePatternInFolderRule extends BaseRule {
  validations: BaseValidation[] = [
    new ContainsUnexpectFieldValidation(),
    new ContainsRequiredFieldsValidation(),
    new IsValidFolderValidation(),
    new IsValidFilenamePatternValidation()
  ];
}
