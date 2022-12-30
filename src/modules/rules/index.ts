import moment from 'moment';
import { RuleModel, RuleNameEnum } from './models/rule.model';
import { HandlerRuleStateEnum } from './models';
import { verifyFilenamePatternInFolder } from './verifications';
import { InfoMessage, Logger } from '../../utils';

export const RuleModule = {
  execRule: (projectPath: string, rule: RuleModel) => {
    let state = HandlerRuleStateEnum.skipped;

    if (rule.name === RuleNameEnum.filenamePatternInFolder) {
      state = verifyFilenamePatternInFolder(projectPath, rule);
    }

    return state;
  },

  handlerRules: (projectPath: string, rules: RuleModel[]) => {
    try {
      Logger.info(InfoMessage.execRules);

      const stats = {
        [HandlerRuleStateEnum.skipped]: 0,
        [HandlerRuleStateEnum.passed]: 0,
        [HandlerRuleStateEnum.failed]: 0
      };

      const startTime = new Date();

      console.info('\n');

      rules.forEach((rule) => {
        const state = RuleModule.execRule(projectPath, rule);
        stats[state] += 1;
      });

      const endTime = new Date();

      const execTime = moment(endTime).diff(startTime);

      Logger.stats(
        stats[HandlerRuleStateEnum.failed],
        stats[HandlerRuleStateEnum.passed],
        stats[HandlerRuleStateEnum.skipped],
        rules.length,
        execTime
      );
    } catch (error: unknown) {
      Logger.error('UnexpectedError', (error as Error).message);
    }
  }
};
