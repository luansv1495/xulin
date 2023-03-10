import { BaseError } from './base.error';
import { grey } from 'kleur';

class RuleError extends BaseError {
  constructor(message: string) {
    /* istanbul ignore next */
    super(message, 'RuleError');
  }
}

export class RuleIsNotArrayError extends RuleError {
  constructor() {
    /* istanbul ignore next */
    super('Field [rules] is not a array.');
  }
}

export class RuleIsInvalidError extends RuleError {
  constructor(rule: unknown) {
    /* istanbul ignore next */
    super(`Rule [${JSON.stringify(rule)}] is invalid.`);
  }
}

export class RuleNameIsRequiredError extends RuleError {
  constructor(rule: unknown) {
    /* istanbul ignore next */
    super(`Rule name is required in: ${JSON.stringify(rule)}.`);
  }
}

export class RuleNameIsNotStringError extends RuleError {
  constructor(ruleName: unknown) {
    /* istanbul ignore next */
    super(`Rule name "${ruleName}" is not a string.`);
  }
}

export class RuleNameNotRecognizeError extends RuleError {
  constructor(ruleName: unknown) {
    /* istanbul ignore next */
    super(`Rule "${ruleName}" not recognize.`);
  }
}

export class RuleSkipIsNotBooleanError extends RuleError {
  constructor(ruleSkip: unknown) {
    /* istanbul ignore next */
    super(`Rule field skip with value "${ruleSkip}" is not a boolean.`);
  }
}

export class UnexpectFieldInRuleError extends RuleError {
  constructor(field: unknown, ruleName: string) {
    /* istanbul ignore next */
    super(`Unexpected field "${field}". In ${ruleName} rule.`);
  }
}

export class FieldIsRequiredInRuleError extends RuleError {
  constructor(field: unknown, ruleName: string) {
    /* istanbul ignore next */
    super(`Field "${field}" is required. In ${ruleName} rule.`);
  }
}

export class FolderIsInvalidInRuleError extends RuleError {
  constructor(result: string, ruleName: string) {
    /* istanbul ignore next */
    super(`Field folder with value ${result} In ${ruleName} rule.`);
  }
}

export class PatternsIsInvalidInRuleError extends RuleError {
  constructor(result: string, ruleName: string) {
    /* istanbul ignore next */
    super(`Field patterns with value ${result} In ${ruleName} rule.`);
  }
}

export class FilePatternNotMatchInRuleError extends RuleError {
  constructor(fileName: string, ruleName: string) {
    /* istanbul ignore next */
    super(`${grey(ruleName)}: File ${grey(fileName)} not match.`);
  }
}

export class FolderNameIsInvalidInRuleError extends RuleError {
  constructor(result: string, ruleName: string) {
    /* istanbul ignore next */
    super(`Field names with value ${result} In ${ruleName} rule.`);
  }
}

export class FolderNameNotMatchInRuleError extends RuleError {
  constructor(folderName: string, ruleName: string) {
    /* istanbul ignore next */
    super(`${grey(ruleName)}: Folder ${grey(folderName)} not match.`);
  }
}

export class QuantityIsInvalidInRuleError extends RuleError {
  constructor(result: string, ruleName: string) {
    /* istanbul ignore next */
    super(`Field quantity with value ${result} In ${ruleName} rule.`);
  }
}

export class MaxMinIsInvalidInRuleError extends RuleError {
  constructor(result: string, ruleName: string, fieldName: string) {
    /* istanbul ignore next */
    super(`Field ${fieldName} with value ${result} In ${ruleName} rule.`);
  }
}

export class FilenameSizeInRuleError extends RuleError {
  constructor(fileName: string, ruleName: string) {
    /* istanbul ignore next */
    super(`${grey(ruleName)}: Filename ${grey(fileName)} not match.`);
  }
}

export class FolderNameSizeInRuleError extends RuleError {
  constructor(fileName: string, ruleName: string) {
    /* istanbul ignore next */
    super(`${grey(ruleName)}: Folder name ${grey(fileName)} not match.`);
  }
}

export class FolderInListIsInvalidInRuleError extends RuleError {
  constructor(result: string, ruleName: string) {
    /* istanbul ignore next */
    super(`Field folders with value ${result} In ${ruleName} rule.`);
  }
}

export class FolderInListIsEqualToTargetFolderInRuleError extends RuleError {
  constructor(result: string, ruleName: string) {
    /* istanbul ignore next */
    super(`Field folders with value ${result} In ${ruleName} rule.`);
  }
}

export class FileContainsInvalidDependenciesInRuleError extends RuleError {
  constructor(targetFile: string, invalidDependence: string, ruleName: string) {
    /* istanbul ignore next */
    super(
      `${grey(ruleName)}: File ${grey(
        targetFile
      )} contains dependencies of ${invalidDependence}.`
    );
  }
}
