import moment from 'moment';
import { RuleIsNotArrayError } from '../error';
import { InfoMessage, Logger, ProcessUtil } from '../utils';
import { RuleFactory } from './rule.factory';
import { VerifyStateEnum, RuleModel } from './rule.model';

export class RulesModule {
  private rules: RuleModel[] = [];
  stats = {
    suite: {
      [VerifyStateEnum.skipped]: 0,
      [VerifyStateEnum.passed]: 0,
      [VerifyStateEnum.failed]: 0
    },
    all: {
      [VerifyStateEnum.passed]: 0,
      [VerifyStateEnum.failed]: 0
    }
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

    Logger.stats(this.stats.suite, this.stats.all, this.rules.length, execTime);
  };

  verify = () => {
    Logger.info(InfoMessage.execRules);

    const startTime = new Date();

    process.stdout.write('\n');

    this.rules.forEach((rule) => {
      const result = new RuleFactory(rule, this.rootDir).verify();
      this.stats.suite[result.state] += 1;
      this.stats.all[VerifyStateEnum.failed] += result.failed;
      this.stats.all[VerifyStateEnum.passed] += result.passed;
    });

    this.showStats(startTime);

    if (this.stats.suite.failed >= 1) {
      ProcessUtil.exit();
    }
  };
}
