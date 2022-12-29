import moment from 'moment';
import { RuleModel, RuleNameEnum } from './models/rule.model';
import { HandlerRuleStateEnum } from './models';
import { verifyFilenamePatternInFolder } from './verifications';
import { InfoMessage, showInfo } from '../../utils';
import { showStats } from './utils';

const execRule = (projectPath: string, rule: RuleModel) => {
  let state = HandlerRuleStateEnum.skipped;

  switch (rule.name) {
    case RuleNameEnum.filenamePatternInFolder:
      state = verifyFilenamePatternInFolder(projectPath, rule);
      break;
    default:
      break;
  }

  return state;
};

export const RuleModule = {
  handlerRules: (projectPath: string, rules: RuleModel[]) => {
    showInfo(InfoMessage.execRules);

    const stats = {
      [HandlerRuleStateEnum.skipped]: 0,
      [HandlerRuleStateEnum.passed]: 0,
      [HandlerRuleStateEnum.failed]: 0
    };

    const startTime = new Date();

    console.info('\n');

    rules.forEach((rule) => {
      const state = execRule(projectPath, rule);
      stats[state] += 1;
    });

    const endTime = new Date();

    const execTime = moment(endTime).diff(startTime);

    showStats(
      stats[HandlerRuleStateEnum.failed],
      stats[HandlerRuleStateEnum.passed],
      stats[HandlerRuleStateEnum.skipped],
      rules.length,
      execTime
    );
  }
};
