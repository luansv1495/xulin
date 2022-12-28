import { bgGreen, bgRed, green, red, yellow, bgYellow } from 'kleur';
import moment from 'moment';
import { HandlerRuleStateEnum } from '../models';

export const showState = (state: HandlerRuleStateEnum, message: string) => {
  if (state === HandlerRuleStateEnum.failed) {
    console.info(bgRed(' FAIL ') + ' ' + message);
  } else if (state === HandlerRuleStateEnum.passed) {
    console.info(bgGreen(' PASS ') + ' ' + message);
  } else {
    console.info(bgYellow(' SKIP ') + ' ' + message);
  }
};

export const showStats = (
  failure: number,
  passed: number,
  skipped: number,
  total: number,
  execTime: number
) => {
  console.info(
    `\nStats: ${red(failure + ' failed')}, ${yellow(
      skipped + ' skipped'
    )}, ${green(passed + ' passed')}, ${total} total.`
  );
  console.info(
    `Exec time: ${moment
      .utc(moment.duration(execTime).asMilliseconds())
      .format('HH:mm:ss.SSS')}\n`
  );
};
