import {
  RuleIsInvalidError,
  RuleIsNotArrayError,
  RuleNameIsNotStringError,
  RuleNameIsRequiredError,
  RuleNameNotRecognizeError,
  RuleSkipIsNotBooleanError
} from '../../../error';
import { RuleModel, RuleNameEnum } from '../models';
import { validateFilenamePatterInFolderRule } from './filename-pattern-in-folder.validation';

export const validateRulesField = (projectPath: string, rules: unknown) => {
  if (Object.prototype.toString.call(rules) != '[object Array]') {
    throw new RuleIsNotArrayError();
  }

  const rulesList = rules as RuleModel[];

  const expectedRuleNames = Object.values(RuleNameEnum);

  rulesList.forEach((rule: RuleModel) => {
    if (Object.prototype.toString.call(rule) != '[object Object]') {
      throw new RuleIsInvalidError(rule);
    } else if (!rule.name) {
      throw new RuleNameIsRequiredError(rule);
    } else if (typeof rule.name != 'string') {
      throw new RuleNameIsNotStringError(rule.name);
    } else if (!expectedRuleNames.includes(rule.name)) {
      throw new RuleNameNotRecognizeError(rule.name);
    } else if (!!rule.skip && typeof rule.skip != 'boolean') {
      throw new RuleSkipIsNotBooleanError(rule.skip);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { name, skip, ...rest } = rule;

      if (name === RuleNameEnum.filenamePatternInFolder) {
        validateFilenamePatterInFolderRule(projectPath, { ...rest });
      }
    }
  });
};
