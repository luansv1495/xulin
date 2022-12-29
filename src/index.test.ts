import fs from 'fs';
import { red } from 'kleur';
import { main } from '.';
import { ConfigModule } from './modules/config';
import { RuleModule } from './modules/rules';

jest.mock('fs');

describe('Init tests', () => {
  test('should call exist project folder method', () => {
    process.argv = ['node', 'ata', './test'];

    jest.spyOn(fs, 'existsSync').mockImplementationOnce(() => true);
    jest
      .spyOn(ConfigModule, 'getConfigFile')
      .mockImplementationOnce(() => undefined);

    main();

    expect(fs.existsSync).toBeCalledWith('./test');
  });

  test('should render error message when project path not found', () => {
    process.argv = ['node', 'ata', './test'];

    jest.spyOn(fs, 'existsSync').mockImplementationOnce(() => false);
    jest.spyOn(console, 'error').mockImplementationOnce(() => null);

    main();

    expect(console.error).toBeCalledWith(
      red('ERROR: ') + 'InitError ' + `Project path "${'./test'}" not found.`
    );
  });

  test('should call getConfigFile when exists project folder', () => {
    process.argv = ['node', 'ata', './test'];

    jest.spyOn(fs, 'existsSync').mockImplementationOnce(() => true);
    jest
      .spyOn(ConfigModule, 'getConfigFile')
      .mockImplementationOnce(() => undefined);

    main();

    expect(ConfigModule.getConfigFile).toBeCalled();
  });

  test('should call handlerRules when getConfigFile is successfully', () => {
    process.argv = ['node', 'ata', './test'];

    jest.spyOn(fs, 'existsSync').mockImplementationOnce(() => true);
    jest.spyOn(ConfigModule, 'getConfigFile').mockReturnValueOnce({
      rules: []
    });
    jest.spyOn(RuleModule, 'handlerRules').mockImplementationOnce(() => null);

    main();

    expect(RuleModule.handlerRules).toBeCalledWith('./test', []);
  });
});
