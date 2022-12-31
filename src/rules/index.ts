import moment from 'moment';
import { RuleIsNotArrayError } from '../error';
import { InfoMessage, Logger } from '../utils';
import { verifyFilenamePatternInFolder } from './filename-pattern-in-folder/verify';
import { RuleFactory } from './rule.factory';
import { HandlerStateEnum, RuleModel, RuleNameEnum } from './rule.model';

export class RulesModule {
  private rules: RuleModel[] = [];

  constructor(private readonly rootDir: string) {}

  validate = (rules: unknown) => {
    if (Object.prototype.toString.call(rules) != '[object Array]') {
      throw new RuleIsNotArrayError();
    }

    (rules as unknown[]).forEach((item: unknown) => {
      new RuleFactory(item, this.rootDir).validate();
    });

    this.rules = rules as RuleModel[];
  };

  execRule = (rule: RuleModel) => {
    let state = HandlerStateEnum.skipped;

    if (rule.name === RuleNameEnum.filenamePatternInFolder) {
      state = verifyFilenamePatternInFolder(this.rootDir, rule);
    }

    return state;
  };

  handler = () => {
    Logger.info(InfoMessage.execRules);

    const stats = {
      [HandlerStateEnum.skipped]: 0,
      [HandlerStateEnum.passed]: 0,
      [HandlerStateEnum.failed]: 0
    };

    const startTime = new Date();

    console.info('\n');

    this.rules.forEach((rule) => {
      const state = this.execRule(rule);
      stats[state] += 1;
    });

    const endTime = new Date();

    const execTime = moment(endTime).diff(startTime);

    Logger.stats(
      stats[HandlerStateEnum.failed],
      stats[HandlerStateEnum.passed],
      stats[HandlerStateEnum.skipped],
      this.rules.length,
      execTime
    );
  };
}
