import { red } from 'kleur';
import fs from 'fs';
import { main } from '../../../src/index';
import { RuleNameEnum } from '../../../src/modules/rules/models';
import { RuleModule } from '../../../src/modules/rules';

describe('Config tests', () => {
  beforeAll(() => {
    jest.spyOn(process.stdout, 'write').mockImplementationOnce(() => false);
    process.argv = ['node', 'ata', './example'];
  });

  test('should display error when config read return unexpected error', () => {
    fs.writeFileSync('./example/ata.config.json', '');

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') + 'UnexpectedError Unexpected end of JSON input\n'
    );
  });

  test('should display error when config is empty', () => {
    fs.writeFileSync('./example/ata.config.json', JSON.stringify({}));

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') + 'ConfigError Config file is empty.\n'
    );
  });

  test('should display error when exists a unexpected field in config', () => {
    fs.writeFileSync(
      './example/ata.config.json',
      JSON.stringify({ fakeKey: '' })
    );

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') + 'ConfigError Unexpected field "fakeKey".\n'
    );
  });

  test('should display error when field rules is not a array', () => {
    fs.writeFileSync(
      './example/ata.config.json',
      JSON.stringify({ rules: '' })
    );

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') + 'RuleError Field [rules] is not a array.\n'
    );
  });

  test('should display error when field rule item is not a json object', () => {
    fs.writeFileSync(
      './example/ata.config.json',
      JSON.stringify({ rules: ['test'] })
    );

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') + 'RuleError Rule ["test"] is invalid.\n'
    );
  });

  test('should display error when field rule item not contains name field', () => {
    fs.writeFileSync(
      './example/ata.config.json',
      JSON.stringify({ rules: [{}] })
    );

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') + 'RuleError Rule name is required in: {}.\n'
    );
  });

  test('should display error when field name in rule is not a string', () => {
    fs.writeFileSync(
      './example/ata.config.json',
      JSON.stringify({ rules: [{ name: 1 }] })
    );

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') + 'RuleError Rule name "1" is not a string.\n'
    );
  });

  test('should display error when field name in rule is not recognize', () => {
    fs.writeFileSync(
      './example/ata.config.json',
      JSON.stringify({ rules: [{ name: 'fake' }] })
    );

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') + 'RuleError Rule "fake" not recognize.\n'
    );
  });

  test('should display error when field skip in rule is not a boolean', () => {
    fs.writeFileSync(
      './example/ata.config.json',
      JSON.stringify({
        rules: [{ name: RuleNameEnum.filenamePatternInFolder, skip: 'fake' }]
      })
    );

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Rule field skip with value "fake" is not a boolean.\n'
    );
  });

  test('should return a config when config object file is valid', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.filenamePatternInFolder,
          skip: false,
          folder: 'source/services',
          patterns: ['.ts']
        }
      ]
    };
    fs.writeFileSync('./example/ata.config.json', JSON.stringify(fakeConfig));
    jest
      .spyOn(RuleModule, 'handlerRules')
      .mockImplementationOnce(() => undefined);

    main();

    expect(RuleModule.handlerRules).toBeCalledWith(
      './example',
      fakeConfig.rules
    );
  });
});
