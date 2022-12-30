import { red, blue, bgRed, bgGreen, bgYellow, yellow, green } from 'kleur';
import moment from 'moment';
import { HandlerRuleStateEnum } from '../modules/rules/models';

export const Logger = {
  error: (errorName: string, message: string, nivel = 0) => {
    process.stdout.write(
      ' '.repeat(nivel * 6) + red('ERROR: ') + errorName + ' ' + message + '\n'
    );
  },

  info: (message: string) => {
    process.stdout.write(blue('INFO: ') + message + '\n');
  },

  handler: (state: HandlerRuleStateEnum, message: string) => {
    if (state === HandlerRuleStateEnum.failed) {
      process.stdout.write(bgRed(' FAIL ') + ' ' + message + '\n');
    } else if (state === HandlerRuleStateEnum.passed) {
      process.stdout.write(bgGreen(' PASS ') + ' ' + message + '\n');
    } else {
      process.stdout.write(bgYellow(' SKIP ') + ' ' + message + '\n');
    }
  },

  stats: (
    failure: number,
    passed: number,
    skipped: number,
    total: number,
    execTime: number
  ) => {
    const failures = red(failure + ' failed');
    const skippeds = yellow(skipped + ' skipped');
    const passeds = green(passed + ' passed');

    process.stdout.write(
      `\nStats: ${failures}, ${skippeds}, ${passeds}, ${total} total.`
    );

    const execTimeHuman = moment
      .utc(moment.duration(execTime).asMilliseconds())
      .format('HH:mm:ss.SSS');

    process.stdout.write(`\nExec time: ${execTimeHuman}\n`);
  }
};
