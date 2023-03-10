import { bgRed, bgGreen, bgYellow, red, grey, bold } from 'kleur';
import { main } from '../../../src';
import { RuleNameEnum } from '../../../src/rules/rule.model';
import { FileSystem } from '../../../src/utils';
import { ExpectUtil, ConfigBuild, RuleBuild } from '../../utils';

const RULE_NAME = RuleNameEnum.folderNameInFolder;
jest.mock('../../../src/utils/process.util');

describe('Folder name in folder tests', () => {
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

  test('should display error when names field not exists', () => {
    const fakeConfig = config
      .withRule(rule.withFolder('source/services').build())
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    ExpectUtil.ruleError.requiredField(RULE_NAME, 'names');
  });

  test('should display error when folder field is invalid', () => {
    const fakeConfig = config
      .withRule(rule.withFolder(true).withNames(['services']).build())
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    ExpectUtil.ruleError.invalidStringField(RULE_NAME, 'folder', 'true');
  });

  test('should display error when names field is not a array', () => {
    const fakeConfig = config
      .withRule(rule.withFolder('source/services').withNames('1').build())
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    ExpectUtil.ruleError.invalidArrayField(RULE_NAME, 'names', '1');
  });

  test('should display error when names field is invalid', () => {
    const fakeConfig = config
      .withRule(
        rule.withFolder('source/services').withNames(['file.ts']).build()
      )
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    ExpectUtil.ruleError.invalidFolderField(RULE_NAME, 'names', 'file.ts');
  });

  test('should display rule passed status when the verification passed', () => {
    const fakeConfig = config
      .withRule(
        rule
          .withFolder('source')
          .withNames(['services', 'pages', 'configs', 'constants'])
          .build()
      )
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      4,
      bold(bgGreen(' PASS ')) +
        ` Folder in ${grey(
          'source'
        )} should must contain one of the names ${grey(
          'services,pages,configs,constants'
        )}.\n`
    );
  });

  test('should display rule fail status when the verification fail', () => {
    const fakeConfig = config
      .withRule(
        rule
          .withFolder('source')
          .withNames(['services', 'pages', 'config'])
          .build()
      )
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      4,
      bold(bgRed(' FAIL ')) +
        ` Folder in ${grey(
          'source'
        )} should must contain one of the names ${grey(
          'services,pages,config'
        )}.\n`
    );
  });

  test('should display rule skip status when the verification skip', () => {
    const fakeConfig = config
      .withRule(
        rule.withFolder('source').withNames(['services']).withSkip(true).build()
      )
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      4,
      bold(bgYellow(' SKIP ')) +
        ` Folder in ${grey(
          'source'
        )} should must contain one of the names ${grey('services')}.\n`
    );
  });

  test('should display fails description when the verification fail', () => {
    const fakeConfig = config
      .withRule(
        rule
          .withFolder('source')
          .withNames(['services', 'pages', 'config'])
          .build()
      )
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      5,
      '      ' +
        red('ERROR: ') +
        `RuleError ${grey('folder-name-in-folder')}: Folder ${grey(
          'configs'
        )} not match.\n`
    );
  });
});
