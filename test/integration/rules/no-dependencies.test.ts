import { bgRed, bgGreen, bgYellow, grey, bold } from 'kleur';
import { main } from '../../../src';
import { RuleNameEnum } from '../../../src/rules/rule.model';
import { FileSystem } from '../../../src/utils';
import { ExpectUtil, ConfigBuild, RuleBuild } from '../../utils';

const RULE_NAME = RuleNameEnum.noDependencies;
jest.mock('../../../src/utils/process.util');

describe('No Dependencies tests', () => {
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

  test('should display error when folders field not exists', () => {
    const fakeConfig = config
      .withRule(rule.withFolder('source/configs').build())
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    ExpectUtil.ruleError.requiredField(RULE_NAME, 'folders');
  });

  test('should display error when folder field is invalid', () => {
    const fakeConfig = config
      .withRule(rule.withFolder(true).withFolders(['sources/services']).build())
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    ExpectUtil.ruleError.invalidStringField(RULE_NAME, 'folder', 'true');
  });

  test('should display error when folders field is not a array', () => {
    const fakeConfig = config
      .withRule(rule.withFolder('source/configs').withFolders('1').build())
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    ExpectUtil.ruleError.invalidArrayField(RULE_NAME, 'folders', '1');
  });

  test('should display error when folders field is invalid', () => {
    const fakeConfig = config
      .withRule(
        rule.withFolder('source/configs').withFolders(['file.txt']).build()
      )
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    ExpectUtil.ruleError.invalidFolderField(RULE_NAME, 'folders', 'file.txt');
  });

  test('should display error when folders field contains a item equal target folder field', () => {
    const fakeConfig = config
      .withRule(
        rule
          .withFolder('source/configs')
          .withFolders(['source/configs'])
          .build()
      )
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    ExpectUtil.ruleError.invalidFolderListItemField(
      RULE_NAME,
      'folders',
      'source/configs'
    );
  });

  test('should display rule passed status when no contains typescript files in target folder', async () => {
    expect.assertions(1);

    const fakeConfig = config
      .withRule(
        rule
          .withFolder('source/constants')
          .withFolders(['source/services'])
          .build()
      )
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    await main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      4,
      bold(bgGreen(' PASS ')) +
        ` ${grey(
          'source/constants'
        )} files must not contain dependencies on ${grey(
          'source/services'
        )} folders.\n`
    );
  });

  test('should display rule passed status when the verification passed', async () => {
    expect.assertions(1);

    const fakeConfig = config
      .withRule(
        rule
          .withFolder('source/configs')
          .withFolders(['source/services'])
          .build()
      )
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    await main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      4,
      bold(bgGreen(' PASS ')) +
        ` ${grey(
          'source/configs'
        )} files must not contain dependencies on ${grey(
          'source/services'
        )} folders.\n`
    );
  });

  test('should display rule fail status when the verification fail', async () => {
    expect.assertions(1);

    const fakeConfig = config
      .withRule(
        rule.withFolder('source/configs').withFolders(['source/pages']).build()
      )
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    await main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      4,
      bold(bgRed(' FAIL ')) +
        ` ${grey(
          'source/configs'
        )} files must not contain dependencies on ${grey(
          'source/pages'
        )} folders.\n`
    );
  });

  test('should display rule skip status when the verification skip', async () => {
    expect.assertions(1);

    const fakeConfig = config
      .withRule(
        rule
          .withFolder('source/configs')
          .withFolders(['source/pages'])
          .withSkip(true)
          .build()
      )
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    await main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      4,
      bold(bgYellow(' SKIP ')) +
        ` ${grey(
          'source/configs'
        )} files must not contain dependencies on ${grey(
          'source/pages'
        )} folders.\n`
    );
  });
});
