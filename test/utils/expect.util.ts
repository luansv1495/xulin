import { red } from 'kleur';
import { RuleNameEnum } from '../../src/rules/rule.model';

export const ExpectUtil = {
  ruleError: {
    unexpectedField: (ruleName: RuleNameEnum, field: string): void => {
      expect(process.stdout.write).toBeCalledWith(
        red('ERROR: ') +
          `RuleError Unexpected field "${field}". In ${ruleName} rule.\n`
      );
    },

    requiredField: (ruleName: RuleNameEnum, field: string): void => {
      expect(process.stdout.write).toBeCalledWith(
        red('ERROR: ') +
          `RuleError Field "${field}" is required. In ${ruleName} rule.\n`
      );
    },

    invalidStringField: (
      ruleName: RuleNameEnum,
      field: string,
      value: unknown
    ): void => {
      expect(process.stdout.write).toBeCalledWith(
        red('ERROR: ') +
          `RuleError Field ${field} with value "${value}" is not a string. In ${ruleName} rule.\n`
      );
    },

    invalidNumberField: (
      ruleName: RuleNameEnum,
      field: string,
      value: unknown
    ): void => {
      expect(process.stdout.write).toBeCalledWith(
        red('ERROR: ') +
          `RuleError Field ${field} with value "${value}" is not a number. In ${ruleName} rule.\n`
      );
    },

    invalidFileField: (
      ruleName: RuleNameEnum,
      field: string,
      value: unknown
    ): void => {
      expect(process.stdout.write).toBeCalledWith(
        red('ERROR: ') +
          `RuleError Field ${field} with value "${value}" is not a file. In ${ruleName} rule.\n`
      );
    },

    invalidFolderField: (
      ruleName: RuleNameEnum,
      field: string,
      value: unknown
    ): void => {
      expect(process.stdout.write).toBeCalledWith(
        red('ERROR: ') +
          `RuleError Field ${field} with value "${value}" is not a folder. In ${ruleName} rule.\n`
      );
    },

    invalidMaxMinField: (ruleName: RuleNameEnum, value: unknown): void => {
      expect(process.stdout.write).toBeCalledWith(
        red('ERROR: ') +
          `RuleError Field min with value "${value}" is greater than or equal to the max value. In ${ruleName} rule.\n`
      );
    }
  }
};
