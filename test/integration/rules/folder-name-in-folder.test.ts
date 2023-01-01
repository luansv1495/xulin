import { bgRed, bgGreen, bgYellow, red, grey, bold } from 'kleur';
import fs from 'fs';
import { main } from '../../../src';
import { RuleNameEnum } from '../../../src/rules/rule.model';

describe('Folder name in folder tests', () => {
  beforeAll(() => {
    jest.spyOn(process.stdout, 'write').mockImplementationOnce(() => false);
    process.argv = ['node', 'ata', './fixtures/example'];
  });

  test('should display error when exists a unexpect field', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.folderNameInFolder,
          skip: false,
          fakeField: ''
        }
      ]
    };
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() => Buffer.from(JSON.stringify(fakeConfig)));

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Unexpected field "fakeField". In folder-name-in-folder rule.\n'
    );
  });

  test('should display error when folder field not exists', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.folderNameInFolder,
          skip: false
        }
      ]
    };
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() => Buffer.from(JSON.stringify(fakeConfig)));

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Field "folder" is required. In folder-name-in-folder rule.\n'
    );
  });

  test('should display error when names field not exists', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.folderNameInFolder,
          skip: false,
          folder: 'source/services'
        }
      ]
    };
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() => Buffer.from(JSON.stringify(fakeConfig)));

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Field "names" is required. In folder-name-in-folder rule.\n'
    );
  });

  test('should display error when folder field is invalid', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.folderNameInFolder,
          skip: false,
          names: ['services'],
          folder: true
        }
      ]
    };
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() => Buffer.from(JSON.stringify(fakeConfig)));

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Field folder with value "true" is not a string. In folder-name-in-folder rule.\n'
    );
  });

  test('should display error when names field is invalid', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.folderNameInFolder,
          skip: false,
          names: ['file.ts'],
          folder: 'source/services'
        }
      ]
    };
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() => Buffer.from(JSON.stringify(fakeConfig)));

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Folder name with value "file.ts" is not a folder. In folder-name-in-folder rule.\n'
    );
  });

  test('should display rule passed status when the verification passed', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.folderNameInFolder,
          skip: false,
          names: ['services', 'pages', 'configs'],
          folder: 'source'
        }
      ]
    };
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() => Buffer.from(JSON.stringify(fakeConfig)));

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      3,
      bold(bgGreen(' PASS ')) +
        ` Folder in ${grey(
          'source'
        )} should must contain one of the names ${grey(
          'services,pages,configs'
        )}.\n`
    );
  });

  test('should display rule fail status when the verification fail', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.folderNameInFolder,
          skip: false,
          names: ['services', 'pages', 'config'],
          folder: 'source'
        }
      ]
    };
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() => Buffer.from(JSON.stringify(fakeConfig)));

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      3,
      bold(bgRed(' FAIL ')) +
        ` Folder in ${grey(
          'source'
        )} should must contain one of the names ${grey(
          'services,pages,config'
        )}.\n`
    );
  });

  test('should display rule skip status when the verification skip', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.folderNameInFolder,
          skip: true,
          names: ['services', 'pages', 'configs'],
          folder: 'source'
        }
      ]
    };
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() => Buffer.from(JSON.stringify(fakeConfig)));

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      3,
      bold(bgYellow(' SKIP ')) +
        ` Folder in ${grey(
          'source'
        )} should must contain one of the names ${grey(
          'services,pages,configs'
        )}.\n`
    );
  });

  test('should display fails description when the verification fail', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.folderNameInFolder,
          skip: false,
          names: ['services', 'pages', 'config'],
          folder: 'source'
        }
      ]
    };
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() => Buffer.from(JSON.stringify(fakeConfig)));

    main();

    expect(process.stdout.write).toHaveBeenNthCalledWith(
      4,
      '      ' +
        red('ERROR: ') +
        `RuleError ${grey('folder-name-in-folder')}: Folder ${grey(
          'configs'
        )} not match.\n`
    );
  });
});
