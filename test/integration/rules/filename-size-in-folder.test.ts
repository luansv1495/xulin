import { bgRed, bgGreen, bgYellow, red, grey, bold } from 'kleur';
import { main } from '../../../src';
import { RuleNameEnum } from '../../../src/rules/rule.model';
import { FileSystem } from '../../../src/utils';

jest.mock('../../../src/utils/process.util');

describe('Filename size in folder tests', () => {
  beforeAll(() => {
    jest.spyOn(process.stdout, 'write').mockImplementationOnce(() => false);
    process.argv = ['node', 'ata', './fixtures/example'];
  });

  test('should display error when exists a unexpect field', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.filenameSizeInFolder,
          skip: false,
          fakeField: ''
        }
      ]
    };
    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Unexpected field "fakeField". In filename-size-in-folder rule.\n'
    );
  });

  test('should display error when folder field not exists', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.filenameSizeInFolder,
          skip: false
        }
      ]
    };
    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Field "folder" is required. In filename-size-in-folder rule.\n'
    );
  });

  test('should display error when max field not exists', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.filenameSizeInFolder,
          skip: false,
          folder: 'source/services'
        }
      ]
    };
    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Field "max" is required. In filename-size-in-folder rule.\n'
    );
  });

  test('should display error when min field not exists', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.filenameSizeInFolder,
          skip: false,
          folder: 'source/services',
          max: 1
        }
      ]
    };
    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Field "min" is required. In filename-size-in-folder rule.\n'
    );
  });

  test('should display error when folder field is invalid', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.filenameSizeInFolder,
          skip: false,
          max: 2,
          min: 1,
          folder: true
        }
      ]
    };
    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Field folder with value "true" is not a string. In filename-size-in-folder rule.\n'
    );
  });

  test('should display error when max field is invalid', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.filenameSizeInFolder,
          skip: false,
          max: '2',
          min: 1,
          folder: 'source/services'
        }
      ]
    };
    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Field max with value "2" is not a number. In filename-size-in-folder rule.\n'
    );
  });

  test('should display error when min and max field is invalid', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.filenameSizeInFolder,
          skip: false,
          max: 2,
          min: 2,
          folder: 'source/services'
        }
      ]
    };
    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Field min with value "2" is greater than or equal to the max value. In filename-size-in-folder rule.\n'
    );
  });

  test('should display error when min field is invalid', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.filenameSizeInFolder,
          skip: false,
          max: 2,
          min: '2',
          folder: 'source/services'
        }
      ]
    };
    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Field min with value "2" is not a number. In filename-size-in-folder rule.\n'
    );
  });

  test('should display rule passed status when the verification passed', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.filenameSizeInFolder,
          skip: false,
          max: 16,
          min: 3,
          folder: 'source/services'
        }
      ]
    };
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
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.filenameSizeInFolder,
          skip: false,
          max: 10,
          min: 3,
          folder: 'source/services'
        }
      ]
    };
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
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.filenameSizeInFolder,
          skip: true,
          max: 10,
          min: 3,
          folder: 'source/services'
        }
      ]
    };
    jest.spyOn(FileSystem, 'getJsonFile').mockReturnValueOnce(fakeConfig);

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      4,
      bold(bgYellow(' SKIP ')) +
        ` Filenames must contain a minimum of ${grey(
          3
        )} characters and a maximum of ${grey(10)} characters in ${grey(
          'source/services'
        )} folder.\n`
    );
  });

  test('should display fails description when the verification fail', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.filenameSizeInFolder,
          skip: false,
          max: 10,
          min: 3,
          folder: 'source/services'
        }
      ]
    };
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
