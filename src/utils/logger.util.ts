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
import { HandlerStateEnum } from '../rules/rule.model';

export const Logger = {
  error: (errorName: string, message: string, nivel = 0) => {
    process.stdout.write(
      ' '.repeat(nivel * 6) + red('ERROR: ') + errorName + ' ' + message + '\n'
    );
  },

  info: (message: string) => {
    process.stdout.write(blue('INFO: ') + message + '\n');
  },

  handler: (state: HandlerStateEnum, message: string) => {
    if (state === HandlerStateEnum.failed) {
      process.stdout.write(bold(bgRed(' FAIL ')) + ' ' + message + '\n');
    } else if (state === HandlerStateEnum.passed) {
      process.stdout.write(bold(bgGreen(' PASS ')) + ' ' + message + '\n');
    } else {
      process.stdout.write(bold(bgYellow(' SKIP ')) + ' ' + message + '\n');
    }
  },

  stats: (
    failure: number,
    passed: number,
    skipped: number,
    total: number,
    execTime: number
  ) => {
    const failures = bold(red(failure + ' failed'));
    const skippeds = bold(yellow(skipped + ' skipped'));
    const passeds = bold(green(passed + ' passed'));

    process.stdout.write(
      `\n${bold(
        'Results:'
      )}   ${failures}, ${skippeds}, ${passeds}, ${total} total.`
    );

    const execTimeHuman = moment
      .utc(moment.duration(execTime).asMilliseconds())
      .format('HH:mm:ss.SSS');

    process.stdout.write(`\n${bold('Exec time:')} ${execTimeHuman}\n`);
  }
};
