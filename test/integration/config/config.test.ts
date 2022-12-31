import { red } from 'kleur';
import fs from 'fs';
import { main } from '../../../src/index';
import { RuleNameEnum } from '../../../src/rules/rule.model';
import { ErrorMessage } from '../../../src/utils';

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
        " 'fixtures/without-config/ata.config.json'\n"
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
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() => Buffer.from(JSON.stringify({})));

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') + 'ConfigError Config file is empty.\n'
    );
  });

  test('should display error when exists a unexpected field in config', () => {
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() =>
        Buffer.from(JSON.stringify({ fakeKey: '' }))
      );

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') + 'ConfigError Unexpected field "fakeKey".\n'
    );
  });

  test('should display error when field rules is not a array', () => {
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() => Buffer.from(JSON.stringify({ rules: '' })));

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') + 'RuleError Field [rules] is not a array.\n'
    );
  });

  test('should display error when field rule item is not a json object', () => {
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() =>
        Buffer.from(JSON.stringify({ rules: ['test'] }))
      );

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') + 'RuleError Rule ["test"] is invalid.\n'
    );
  });

  test('should display error when field rule item not contains name field', () => {
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() =>
        Buffer.from(JSON.stringify({ rules: [{}] }))
      );

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') + 'RuleError Rule name is required in: {}.\n'
    );
  });

  test('should display error when field name in rule is not a string', () => {
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() =>
        Buffer.from(JSON.stringify({ rules: [{ name: 1 }] }))
      );

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') + 'RuleError Rule name "1" is not a string.\n'
    );
  });

  test('should display error when field name in rule is not recognize', () => {
    jest
      .spyOn(fs, 'readFileSync')
      .mockReturnValue(
        Buffer.from(JSON.stringify({ rules: [{ name: 'fake' }] }))
      );

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') + 'RuleError Rule "fake" not recognize.\n'
    );
  });

  test('should display error when field skip in rule is not a boolean', () => {
    jest.spyOn(fs, 'readFileSync').mockReturnValue(
      Buffer.from(
        JSON.stringify({
          rules: [{ name: RuleNameEnum.filenamePatternInFolder, skip: 'fake' }]
        })
      )
    );

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Rule field skip with value "fake" is not a boolean.\n'
    );
  });
});
