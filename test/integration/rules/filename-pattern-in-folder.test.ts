import { bgRed, bgGreen, bgYellow, red, grey, bold } from 'kleur';
import { main } from '../../../src';
import { RuleNameEnum } from '../../../src/rules/rule.model';
import { FileSystem } from '../../../src/utils';
import { ExpectUtil, ConfigBuild, RuleBuild } from '../../utils';

const RULE_NAME = RuleNameEnum.filenamePatternInFolder;
jest.mock('../../../src/utils/process.util');

describe('Filename pattern in folder tests', () => {
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

  test('should display error when patterns field not exists', () => {
    const fakeConfig = config
      .withRule(rule.withFolder('sources/services').build())
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    ExpectUtil.ruleError.requiredField(RULE_NAME, 'patterns');
  });

  test('should display error when folder field is invalid', () => {
    const fakeConfig = config
      .withRule(rule.withFolder(true).withPatterns(['*.ts']).build())
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    ExpectUtil.ruleError.invalidStringField(RULE_NAME, 'folder', 'true');
  });

  test('should display error when pattern field is invalid', () => {
    const fakeConfig = config
      .withRule(
        rule.withFolder('source/services').withPatterns(['folder']).build()
      )
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    ExpectUtil.ruleError.invalidFileField(RULE_NAME, 'pattern', 'folder');
  });

  test('should display rule passed status when the verification passed', () => {
    const fakeConfig = config
      .withRule(
        rule.withFolder('source/services').withPatterns(['*.ts']).build()
      )
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      4,
      bold(bgGreen(' PASS ')) +
        ` Files in ${grey('source/services')} should contains ${grey(
          '*.ts'
        )}.\n`
    );
  });

  test('should display rule fail status when the verification fail', () => {
    const fakeConfig = config
      .withRule(
        rule.withFolder('source/services').withPatterns(['*.js']).build()
      )
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      4,
      bold(bgRed(' FAIL ')) +
        ` Files in ${grey('source/services')} should contains ${grey(
          '*.js'
        )}.\n`
    );
  });

  test('should display rule skip status when the verification skip', () => {
    const fakeConfig = config
      .withRule(
        rule.withFolder('source').withPatterns(['*.js']).withSkip(true).build()
      )
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      4,
      bold(bgYellow(' SKIP ')) +
        ` Files in ${grey('source')} should contains ${grey('*.js')}.\n`
    );
  });

  test('should display fails description when the verification fail', () => {
    const fakeConfig = config
      .withRule(
        rule.withFolder('source/services').withPatterns(['*.js']).build()
      )
      .build();

    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      5,
      '      ' +
        red('ERROR: ') +
        `RuleError ${grey('filename-pattern-in-folder')}: File ${grey(
          'fixtures/example/source/services/api.service.test.ts'
        )} not match.\n`
    );
  });
});
