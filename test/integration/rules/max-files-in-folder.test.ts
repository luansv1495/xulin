import { bgRed, bgGreen, bgYellow, red, grey, bold } from 'kleur';
import { main } from '../../../src';
import { RuleNameEnum } from '../../../src/rules/rule.model';
import { FileSystem } from '../../../src/utils';
import { ExpectUtil, ConfigBuild, RuleBuild } from '../../utils';

const RULE_NAME = RuleNameEnum.maxFilesInFolder;
jest.mock('../../../src/utils/process.util');

describe('Max files in folder tests', () => {
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

  test('should display error when quantity field not exists', () => {
    const fakeConfig = config
      .withRule(rule.withFolder('source/services').build())
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    ExpectUtil.RuleError.requiredField(RULE_NAME, 'quantity');
  });

  test('should display error when folder field is invalid', () => {
    const fakeConfig = config
      .withRule(rule.withFolder(true).withQuantity(1).build())
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Field folder with value "true" is not a string. In max-files-in-folder rule.\n'
    );
  });

  test('should display error when quantity field is invalid', () => {
    const fakeConfig = config
      .withRule(rule.withFolder('source/services').withQuantity('1').build())
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Field quantity with value "1" is not a number. In max-files-in-folder rule.\n'
    );
  });

  test('should display rule passed status when the verification passed', () => {
    const fakeConfig = config
      .withRule(rule.withFolder('source/services').withQuantity(2).build())
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      4,
      bold(bgGreen(' PASS ')) +
        ` Folder ${grey('source/services')} should contain ${grey(2)} files.\n`
    );
  });

  test('should display rule fail status when the verification fail', () => {
    const fakeConfig = config
      .withRule(rule.withFolder('source/services').withQuantity(1).build())
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      4,
      bold(bgRed(' FAIL ')) +
        ` Folder ${grey('source/services')} should contain ${grey(1)} files.\n`
    );
  });

  test('should display rule skip status when the verification skip', () => {
    const fakeConfig = config
      .withRule(
        rule.withFolder('source').withQuantity(2).withSkip(true).build()
      )
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      4,
      bold(bgYellow(' SKIP ')) +
        ` Folder ${grey('source')} should contain ${grey(2)} files.\n`
    );
  });
});
