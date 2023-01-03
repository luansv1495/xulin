import { red } from 'kleur';
import { RuleNameEnum } from '../../src/rules/rule.model';

export const ExpectUtil = {
  RuleError: {
    unexpectedField: (ruleName: RuleNameEnum, field: string) => {
      expect(process.stdout.write).toBeCalledWith(
        red('ERROR: ') +
          `RuleError Unexpected field "${field}". In ${ruleName} rule.\n`
      );
    },

    requiredField: (ruleName: RuleNameEnum, field: string) => {
      expect(process.stdout.write).toBeCalledWith(
        red('ERROR: ') +
          `RuleError Field "${field}" is required. In ${ruleName} rule.\n`
      );
    }
  }
};
