import moment from 'moment';
import { RuleIsNotArrayError } from '../error';
import { InfoMessage, Logger } from '../utils';
import { RuleFactory } from './rule.factory';
import { VerifyStateEnum, RuleModel } from './rule.model';

export class RulesModule {
  private rules: RuleModel[] = [];
  stats = {
    [VerifyStateEnum.skipped]: 0,
    [VerifyStateEnum.passed]: 0,
    [VerifyStateEnum.failed]: 0
  };

  constructor(private readonly rootDir: string) {}

  validate = (rules: unknown) => {
    if (Object.prototype.toString.call(rules) != '[object Array]') {
      throw new RuleIsNotArrayError();
    }

    (rules as unknown[]).forEach((item: unknown) => {
      new RuleFactory(item as RuleModel, this.rootDir).validate();
    });

    this.rules = rules as RuleModel[];
  };

  showStats = (startTime: Date) => {
    const endTime = new Date();

    const execTime = moment(endTime).diff(startTime);

    Logger.stats(
      this.stats[VerifyStateEnum.failed],
      this.stats[VerifyStateEnum.passed],
      this.stats[VerifyStateEnum.skipped],
      this.rules.length,
      execTime
    );
  };

  verify = () => {
    Logger.info(InfoMessage.execRules);

    const startTime = new Date();

    console.info('\n');

    this.rules.forEach((rule) => {
      const state = new RuleFactory(rule, this.rootDir).verify();
      this.stats[state] += 1;
    });

    this.showStats(startTime);
  };
}
