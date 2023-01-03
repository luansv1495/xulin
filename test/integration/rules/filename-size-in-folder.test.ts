import { bgRed, bgGreen, bgYellow, red, grey, bold } from 'kleur';
import { main } from '../../../src';
import { RuleNameEnum } from '../../../src/rules/rule.model';
import { FileSystem } from '../../../src/utils';
import { ExpectUtil, ConfigBuild, RuleBuild } from '../../utils';

const RULE_NAME = RuleNameEnum.filenameSizeInFolder;
jest.mock('../../../src/utils/process.util');

describe('Filename size in folder tests', () => {
  let config: ConfigBuild;
  let rule: RuleBuild;

  beforeEach(() => {
    config = new ConfigBuild();
    rule = new RuleBuild(RULE_NAME);
  });

  beforeAll(() => {
    jest.spyOn(process.stdout, 'write').mockImplementationOnce(() => false);
    process.argv = ['node', 'ata', './fixtures/example'];
  });

  test('should display error when exists a unexpect field', () => {
    const fakeConfig = config.withRule(rule.withFakeField().build()).build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    ExpectUtil.RuleError.unexpectedField(RULE_NAME, 'fakeField');
  });

  test('should display error when folder field not exists', () => {
    const fakeConfig = config.withRule(rule.build()).build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    ExpectUtil.RuleError.requiredField(RULE_NAME, 'folder');
  });

  test('should display error when max field not exists', () => {
    const fakeConfig = config
      .withRule(rule.withFolder('source/services').build())
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    ExpectUtil.RuleError.requiredField(RULE_NAME, 'max');
  });

  test('should display error when min field not exists', () => {
    const fakeConfig = config
      .withRule(rule.withFolder('source/services').withMax(1).build())
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    ExpectUtil.RuleError.requiredField(RULE_NAME, 'min');
  });

  test('should display error when folder field is invalid', () => {
    const fakeConfig = config
      .withRule(rule.withFolder(true).withMax(2).withMin(1).build())
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Field folder with value "true" is not a string. In filename-size-in-folder rule.\n'
    );
  });

  test('should display error when max field is invalid', () => {
    const fakeConfig = config
      .withRule(
        rule.withFolder('source/services').withMax('2').withMin(1).build()
      )
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Field max with value "2" is not a number. In filename-size-in-folder rule.\n'
    );
  });

  test('should display error when min and max field is invalid', () => {
    const fakeConfig = config
      .withRule(
        rule.withFolder('source/services').withMax(2).withMin(2).build()
      )
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Field min with value "2" is greater than or equal to the max value. In filename-size-in-folder rule.\n'
    );
  });

  test('should display error when min field is invalid', () => {
    const fakeConfig = config
      .withRule(
        rule.withFolder('source/services').withMax(2).withMin('2').build()
      )
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Field min with value "2" is not a number. In filename-size-in-folder rule.\n'
    );
  });

  test('should display rule passed status when the verification passed', () => {
    const fakeConfig = config
      .withRule(
        rule.withFolder('source/services').withMax(16).withMin(3).build()
      )
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      4,
      bold(bgGreen(' PASS ')) +
        ` Filenames must contain a minimum of ${grey(
          3
        )} characters and a maximum of ${grey(16)} characters in ${grey(
          'source/services'
        )} folder.\n`
    );
  });

  test('should display rule fail status when the verification fail', () => {
    const fakeConfig = config
      .withRule(
        rule.withFolder('source/services').withMax(10).withMin(3).build()
      )
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      4,
      bold(bgRed(' FAIL ')) +
        ` Filenames must contain a minimum of ${grey(
          3
        )} characters and a maximum of ${grey(10)} characters in ${grey(
          'source/services'
        )} folder.\n`
    );
  });

  test('should display rule skip status when the verification skip', () => {
    const fakeConfig = config
      .withRule(
        rule.withFolder('source').withMax(10).withMin(3).withSkip(true).build()
      )
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      4,
      bold(bgYellow(' SKIP ')) +
        ` Filenames must contain a minimum of ${grey(
          3
        )} characters and a maximum of ${grey(10)} characters in ${grey(
          'source'
        )} folder.\n`
    );
  });

  test('should display fails description when the verification fail', () => {
    const fakeConfig = config
      .withRule(
        rule.withFolder('source/services').withMax(10).withMin(3).build()
      )
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      5,
      '      ' +
        red('ERROR: ') +
        `RuleError ${grey('filename-size-in-folder')}: File ${grey(
          'fixtures/example/source/services/api.service.test.ts'
        )} not match.\n`
    );
  });
});
