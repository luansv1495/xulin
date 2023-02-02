import { blue, red, yellow, green, bold } from 'kleur';
import { main } from '../../../src/index';
import { RuleNameEnum } from '../../../src/rules/rule.model';
import { FileSystem } from '../../../src/utils';

jest.mock('../../../src/utils/process.util');

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
    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      2,
      blue('INFO: ') + 'Executing rules...\n'
    );
  });

  test('should display suite stats count when handler rules is finish', async () => {
    expect.assertions(1);

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
    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    await main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      5,
      `\n${bold('Check Suites:')} ${bold(red('0 failed'))}, ${bold(
        yellow('0 skipped')
      )}, ${bold(green('1 passed'))}, 1 total.`
    );
  });

  test('should display all stats count when handler rules is finish', async () => {
    expect.assertions(1);

    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.filenamePatternInFolder,
          patterns: ['*.ts'],
          folder: 'source/services'
        }
      ]
    };
    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    await main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      6,
      `\n${bold('Checks:')}       ${bold(red('0 failed'))}, ${bold(
        green('3 passed')
      )}, 3 total.`
    );
  });
});
