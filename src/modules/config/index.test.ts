import fs from 'fs';
import path from 'path';
import { ConfigModule } from '.';
import { Validate } from './validations';

jest.mock('fs');

describe('Config tests', () => {
  test('should call join path methof is called with correct params', () => {
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() => Buffer.from(''));
    jest.spyOn(JSON, 'parse').mockImplementationOnce(() => ({}));
    jest.spyOn(Validate, 'configProps').mockImplementationOnce(() => null);
    jest.spyOn(path, 'join').mockImplementationOnce(() => '');

    ConfigModule.getConfigFile('./test');

    expect(path.join).toBeCalledWith('./test', 'ata.config.json');
  });

  test('should call read file method with correct params', () => {
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() => Buffer.from(''));
    jest.spyOn(JSON, 'parse').mockImplementationOnce(() => ({}));
    jest.spyOn(Validate, 'configProps').mockImplementationOnce(() => null);

    ConfigModule.getConfigFile('./test');

    expect(fs.readFileSync).toBeCalledWith('test/ata.config.json');
  });

  test('should call parse json method is called with correct params', () => {
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() => Buffer.from(''));
    jest.spyOn(JSON, 'parse').mockImplementationOnce(() => ({}));
    jest.spyOn(Validate, 'configProps').mockImplementationOnce(() => null);

    ConfigModule.getConfigFile('./test');

    expect(fs.readFileSync).toBeCalledWith('test/ata.config.json');
  });
});
