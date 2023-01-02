import { bgRed, bgGreen, bgYellow, red, grey, bold } from 'kleur';
import { main } from '../../../src';
import { RuleNameEnum } from '../../../src/rules/rule.model';
import { FileSystem } from '../../../src/utils';

jest.mock('../../../src/utils/process.util');

describe('Max files in folder tests', () => {
  beforeAll(() => {
    jest.spyOn(process.stdout, 'write').mockImplementationOnce(() => false);
    process.argv = ['node', 'ata', './fixtures/example'];
  });

  test('should display error when exists a unexpect field', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.maxFilesInFolder,
          skip: false,
          fakeField: ''
        }
      ]
    };
    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Unexpected field "fakeField". In max-files-in-folder rule.\n'
    );
  });

  test('should display error when folder field not exists', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.maxFilesInFolder,
          skip: false
        }
      ]
    };
    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Field "folder" is required. In max-files-in-folder rule.\n'
    );
  });

  test('should display error when quantity field not exists', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.maxFilesInFolder,
          skip: false,
          folder: 'source/services'
        }
      ]
    };
    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Field "quantity" is required. In max-files-in-folder rule.\n'
    );
  });

  test('should display error when folder field is invalid', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.maxFilesInFolder,
          skip: false,
          quantity: 1,
          folder: true
        }
      ]
    };
    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Field folder with value "true" is not a string. In max-files-in-folder rule.\n'
    );
  });

  test('should display error when quantity field is invalid', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.maxFilesInFolder,
          skip: false,
          quantity: '1',
          folder: 'source/services'
        }
      ]
    };
    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Field quantity with value "1" is not a number. In max-files-in-folder rule.\n'
    );
  });

  test('should display rule passed status when the verification passed', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.maxFilesInFolder,
          skip: false,
          quantity: 2,
          folder: 'source/services'
        }
      ]
    };
    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      4,
      bold(bgGreen(' PASS ')) +
        ` Folder ${grey('source/services')} should contain ${grey(2)} files.\n`
    );
  });

  test('should display rule fail status when the verification fail', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.maxFilesInFolder,
          skip: false,
          quantity: 1,
          folder: 'source/services'
        }
      ]
    };
    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      4,
      bold(bgRed(' FAIL ')) +
        ` Folder ${grey('source/services')} should contain ${grey(1)} files.\n`
    );
  });

  test('should display rule skip status when the verification skip', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.maxFilesInFolder,
          skip: true,
          quantity: 2,
          folder: 'source/services'
        }
      ]
    };
    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      4,
      bold(bgYellow(' SKIP ')) +
        ` Folder ${grey('source/services')} should contain ${grey(2)} files.\n`
    );
  });
});
