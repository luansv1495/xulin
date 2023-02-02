import { bgRed, bgGreen, bgYellow, red, grey, bold } from 'kleur';
import { main } from '../../../src';
import { RuleNameEnum } from '../../../src/rules/rule.model';
import { FileSystem } from '../../../src/utils';
import { ExpectUtil, ConfigBuild, RuleBuild } from '../../utils';

const RULE_NAME = RuleNameEnum.folderNameSizeInFolder;
jest.mock('../../../src/utils/process.util');

describe('Folder name size in folder tests', () => {
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

    ExpectUtil.ruleError.unexpectedField(RULE_NAME, 'fakeField');
  });

  test('should display error when folder field not exists', () => {
    const fakeConfig = config.withRule(rule.build()).build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    ExpectUtil.ruleError.requiredField(RULE_NAME, 'folder');
  });

  test('should display error when max field not exists', () => {
    const fakeConfig = config
      .withRule(rule.withFolder('source/services').build())
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    ExpectUtil.ruleError.requiredField(RULE_NAME, 'max');
  });

  test('should display error when min field not exists', () => {
    const fakeConfig = config
      .withRule(rule.withFolder('source/services').withMax(1).build())
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    ExpectUtil.ruleError.requiredField(RULE_NAME, 'min');
  });

  test('should display error when folder field is invalid', () => {
    const fakeConfig = config
      .withRule(rule.withFolder(true).withMax(2).withMin(1).build())
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    ExpectUtil.ruleError.invalidStringField(RULE_NAME, 'folder', 'true');
  });

  test('should display error when max field is invalid', () => {
    const fakeConfig = config
      .withRule(
        rule.withFolder('source/services').withMax('2').withMin(1).build()
      )
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    ExpectUtil.ruleError.invalidNumberField(RULE_NAME, 'max', '2');
  });

  test('should display error when min and max field is invalid', () => {
    const fakeConfig = config
      .withRule(
        rule.withFolder('source/services').withMax(2).withMin(2).build()
      )
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    ExpectUtil.ruleError.invalidMaxMinField(RULE_NAME, '2');
  });

  test('should display error when min field is invalid', () => {
    const fakeConfig = config
      .withRule(
        rule.withFolder('source/services').withMax(2).withMin('2').build()
      )
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    ExpectUtil.ruleError.invalidNumberField(RULE_NAME, 'min', '2');
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
        ` Folders names must contain a minimum of ${grey(
          3
        )} characters and a maximum of ${grey(16)} characters in ${grey(
          'source/services'
        )} folder.\n`
    );
  });

  test('should display rule fail status when the verification fail', () => {
    const fakeConfig = config
      .withRule(rule.withFolder('source').withMax(7).withMin(3).build())
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      4,
      bold(bgRed(' FAIL ')) +
        ` Folders names must contain a minimum of ${grey(
          3
        )} characters and a maximum of ${grey(7)} characters in ${grey(
          'source'
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
        ` Folders names must contain a minimum of ${grey(
          3
        )} characters and a maximum of ${grey(10)} characters in ${grey(
          'source'
        )} folder.\n`
    );
  });

  test('should display fails description when the verification fail', () => {
    const fakeConfig = config
      .withRule(rule.withFolder('source').withMax(7).withMin(3).build())
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      5,
      '      ' +
        red('ERROR: ') +
        `RuleError ${grey('folder-name-size-in-folder')}: Folder name ${grey(
          'fixtures/example/source/constants'
        )} not match.\n`
    );
  });
});
