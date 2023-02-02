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

  constructor(private rootDir: string) {}

  validate = (rules: unknown): void => {
    if (Object.prototype.toString.call(rules) != '[object Array]') {
      throw new RuleIsNotArrayError();
    }

    (rules as unknown[]).forEach((item: unknown) => {
      new RuleFactory(item as RuleModel, this.rootDir).validate();
    });

    this.rules = rules as RuleModel[];
  };

  showStats = (startTime: Date): void => {
    const endTime = new Date();

    const execTime = moment(endTime).diff(startTime);

    Logger.stats(this.stats.suite, this.stats.all, this.rules.length, execTime);
  };

  verify = async (): Promise<void> => {
    Logger.info(InfoMessage.execRules);

    const startTime = new Date();

    process.stdout.write('\n');

    const ruleVerifies = this.rules.map(async (rule: RuleModel) => {
      const result = await new RuleFactory(rule, this.rootDir).verify();
      this.stats.suite[result.state] += 1;
      this.stats.all[VerifyStateEnum.failed] += result.failed;
      this.stats.all[VerifyStateEnum.passed] += result.passed;
    });

    await Promise.all(ruleVerifies).then(() => {
      this.showStats(startTime);

      if (this.stats.suite.failed >= 1) {
        ProcessUtil.exit();
      }
    });
  };
}
