import { blue, red, yellow, green, bold } from 'kleur';
import fs from 'fs';
import { main } from '../../../src/index';
import { RuleNameEnum } from '../../../src/rules/rule.model';

describe('Rules tests', () => {
  beforeAll(() => {
    jest.spyOn(process.stdout, 'write').mockImplementationOnce(() => false);
    process.argv = ['node', 'ata', './fixtures/example'];
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
