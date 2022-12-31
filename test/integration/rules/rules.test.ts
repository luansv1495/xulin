import {
  blue,
  bgRed,
  bgGreen,
  bgYellow,
  red,
  yellow,
  green,
  grey,
  bold
} from 'kleur';
import fs from 'fs';
import { main } from '../../../src/index';
import { RuleNameEnum } from '../../../src/rules/rule.model';

describe('Rules tests', () => {
  beforeAll(() => {
    jest.spyOn(process.stdout, 'write').mockImplementationOnce(() => false);
    process.argv = ['node', 'ata', './example'];
  });

  test('should display exec rules message', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.filenamePatternInFolder,
          skip: false,
          patterns: ['*.ts'],
          folder: 'source/services'
        }
      ]
    };
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() => Buffer.from(JSON.stringify(fakeConfig)));

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      2,
      blue('INFO: ') + 'Executing rules...\n'
    );
  });

  test('should display rule passed status when the verification passed', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.filenamePatternInFolder,
          skip: false,
          patterns: ['*.ts'],
          folder: 'source/services'
        }
      ]
    };
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() => Buffer.from(JSON.stringify(fakeConfig)));

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      3,
      bold(bgGreen(' PASS ')) +
        ` Files in ${grey('source/services')} should contains ${grey(
          '*.ts'
        )}.\n`
    );
  });

  test('should display rule fail status when the verification fail', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.filenamePatternInFolder,
          skip: false,
          patterns: ['*.js'],
          folder: 'source/services'
        }
      ]
    };
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() => Buffer.from(JSON.stringify(fakeConfig)));

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      3,
      bold(bgRed(' FAIL ')) +
        ` Files in ${grey('source/services')} should contains ${grey(
          '*.js'
        )}.\n`
    );
  });

  test('should display rule skip status when the verification skip', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.filenamePatternInFolder,
          skip: true,
          patterns: ['*.js'],
          folder: 'source/services'
        }
      ]
    };
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() => Buffer.from(JSON.stringify(fakeConfig)));

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      3,
      bold(bgYellow(' SKIP ')) +
        ` Files in ${grey('source/services')} should contains ${grey(
          '*.js'
        )}.\n`
    );
  });

  test('should display fails description when the verification fail', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.filenamePatternInFolder,
          skip: false,
          patterns: ['*.js'],
          folder: 'source/services'
        }
      ]
    };
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() => Buffer.from(JSON.stringify(fakeConfig)));

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      4,
      '      ' +
        red('ERROR: ') +
        `RuleError ${grey('filename-pattern-in-folder')}: File ${grey(
          'example/source/services/api.service.test.ts'
        )} not match.\n`
    );
  });

  test('should display stats count when handler rules is finish', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.filenamePatternInFolder,
          skip: false,
          patterns: ['*.ts'],
          folder: 'source/services'
        }
      ]
    };
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() => Buffer.from(JSON.stringify(fakeConfig)));

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      4,
      `\n${bold('Results:')}   ${bold(red('0 failed'))}, ${bold(
        yellow('0 skipped')
      )}, ${bold(green('1 passed'))}, 1 total.`
    );
  });
});
