import { RuleIsNotArrayError } from '../../../error';
import { RuleFactory } from '../../../rules';

export const validateRulesField = (projectPath: string, rules: unknown) => {
  if (Object.prototype.toString.call(rules) != '[object Array]') {
    throw new RuleIsNotArrayError();
  }

  (rules as unknown[]).forEach((item: unknown) => {
    new RuleFactory(item, projectPath).validate();
  });
};
