import {
  red,
  blue,
  bgRed,
  bgGreen,
  bgYellow,
  yellow,
  green,
  bold
} from 'kleur';
import moment from 'moment';
import { VerifyStateEnum } from '../rules/rule.model';

export const Logger = {
  error: (errorName: string, message: string, nivel = 0) => {
    process.stdout.write(
      ' '.repeat(nivel * 6) + red('ERROR: ') + errorName + ' ' + message + '\n'
    );
  },

  info: (message: string) => {
    process.stdout.write(blue('INFO: ') + message + '\n');
  },

  handler: (state: VerifyStateEnum, message: string) => {
    if (state === VerifyStateEnum.failed) {
      process.stdout.write(bold(bgRed(' FAIL ')) + ' ' + message + '\n');
    } else if (state === VerifyStateEnum.passed) {
      process.stdout.write(bold(bgGreen(' PASS ')) + ' ' + message + '\n');
    } else {
      process.stdout.write(bold(bgYellow(' SKIP ')) + ' ' + message + '\n');
    }
  },

  stats: (
    suite: { failed: number; passed: number; skipped: number },
    all: { failed: number; passed: number },
    total: number,
    execTime: number
  ) => {
    const suiteFailures = bold(red(suite.failed + ' failed'));
    const suiteSkippeds = bold(yellow(suite.skipped + ' skipped'));
    const suitePasseds = bold(green(suite.passed + ' passed'));

    process.stdout.write(
      `\n${bold(
        'Check Suites:'
      )} ${suiteFailures}, ${suiteSkippeds}, ${suitePasseds}, ${total} total.`
    );

    const allFailures = bold(red(all.failed + ' failed'));
    const allPasseds = bold(green(all.passed + ' passed'));

    process.stdout.write(
      `\n${bold('Checks:')}       ${allFailures}, ${allPasseds}`
    );

    const execTimeHuman = moment
      .utc(moment.duration(execTime).asMilliseconds())
      .format('HH:mm:ss.SSS');

    process.stdout.write(`\n${bold('Exec time:')}    ${execTimeHuman}\n`);
  }
};
