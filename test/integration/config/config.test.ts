import { red } from 'kleur';
import fs from 'fs';
import { main } from '../../../src/index';
import { RuleNameEnum } from '../../../src/rules/rule.model';
import { ErrorMessage, FileSystem } from '../../../src/utils';

jest.mock('../../../src/utils/process.util');

describe('Config tests', () => {
  beforeAll(() => {
    jest.spyOn(process.stdout, 'write').mockImplementationOnce(() => false);
    process.argv = ['node', 'ata', './fixtures/example'];
  });

  test('should display error when project path not found', () => {
    process.argv = ['node', 'ata', './fixtures/without-config'];

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'ConfigError ' +
        ErrorMessage.configNotFound +
        " 'fixtures/without-config/nata.config.json'\n"
    );
  });

  test('should display error when config read return unexpected error', () => {
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() => Buffer.from(''));

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') + 'UnexpectedError Unexpected end of JSON input\n'
    );
  });

  test('should display error when config is empty', () => {
    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce({});

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') + 'ConfigError Config file is empty.\n'
    );
  });

  test('should display error when exists a unexpected field in config', () => {
    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce({ fakeKey: '' });

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') + 'ConfigError Unexpected field "fakeKey".\n'
    );
  });

  test('should display error when field rules is not a array', () => {
    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce({ rules: '' });

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') + 'RuleError Field [rules] is not a array.\n'
    );
  });

  test('should display error when field rule item is not a json object', () => {
    const fakeConfig = { rules: ['test'] };
    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') + 'RuleError Rule ["test"] is invalid.\n'
    );
  });

  test('should display error when field rule item not contains name field', () => {
    const fakeConfig = { rules: [{}] };
    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') + 'RuleError Rule name is required in: {}.\n'
    );
  });

  test('should display error when field name in rule is not a string', () => {
    const fakeConfig = { rules: [{ name: 1 }] };
    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') + 'RuleError Rule name "1" is not a string.\n'
    );
  });

  test('should display error when field name in rule is not recognize', () => {
    const fakeConfig = { rules: [{ name: 'fake' }] };
    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') + 'RuleError Rule "fake" not recognize.\n'
    );
  });

  test('should display error when field skip in rule is not a boolean', () => {
    const fakeConfig = {
      rules: [{ name: RuleNameEnum.filenamePatternInFolder, skip: 'fake' }]
    };
    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Rule field skip with value "fake" is not a boolean.\n'
    );
  });
});
