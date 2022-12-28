import { BaseError } from './base.error';
import { grey } from 'kleur';

class RuleError extends BaseError {
  constructor(message: string) {
    super(message, 'RuleError');
  }
}

export class RuleIsNotArrayError extends RuleError {
  constructor() {
    super('Field [rules] is not a array.');
  }
}

export class RuleIsInvalidError extends RuleError {
  constructor(rule: unknown) {
    super(`Rule [${JSON.stringify(rule)}] is invalid.`);
  }
}

export class RuleNameIsRequiredError extends RuleError {
  constructor(rule: unknown) {
    super(`Rule name is required in: ${JSON.stringify(rule)}.`);
  }
}

export class RuleNameIsNotStringError extends RuleError {
  constructor(ruleName: unknown) {
    super(`Rule name "${ruleName}" is not a string.`);
  }
}

export class RuleNameNotRecognizeError extends RuleError {
  constructor(ruleName: unknown) {
    super(`Rule "${ruleName}" not recognize.`);
  }
}

export class RuleSkipIsNotBooleanError extends RuleError {
  constructor(ruleSkip: unknown) {
    super(`Rule field skip with value "${ruleSkip}" is not a boolean.`);
  }
}

export class UnexpectFieldInRuleError extends RuleError {
  constructor(field: unknown, ruleName: string) {
    super(`Unexpected field "${field}" in ${ruleName} rule.`);
  }
}

export class FieldIsRequiredInRuleError extends RuleError {
  constructor(field: unknown, ruleName: string) {
    super(`Field "${field}" is required in ${ruleName} rule.`);
  }
}

export class FolderIsInvalidInRuleError extends RuleError {
  constructor(result: string, ruleName: string) {
    super(
      `Field folder with value ${result}`.replace('.', ` in ${ruleName} rule.`)
    );
  }
}

export class PatternsIsInvalidInRuleError extends RuleError {
  constructor(result: string, ruleName: string) {
    super(`Pattern with value ${result}`.replace('.', ` in ${ruleName} rule.`));
  }
}

export class FilePatternNotMatchInRuleError extends RuleError {
  constructor(fileName: string, ruleName: string) {
    super(`${grey(ruleName)}: File ${grey(fileName)} not match.`);
  }
}
