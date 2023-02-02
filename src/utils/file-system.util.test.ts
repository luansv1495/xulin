import fs from 'fs';
import { FileSystem } from './file-system.util';

describe('FileSystem tests', () => {
  test('should return config file', () => {
    jest
      .spyOn(fs, 'readFileSync')
      .mockReturnValueOnce(Buffer.from(JSON.stringify({})));
    const result = FileSystem.getJsonFile('fixtures/example/xulin.config.json');
    expect(result).toStrictEqual({});
  });

  describe('getFileExtension', () => {
    test('should return null when file not contains extension', () => {
      const result = FileSystem.getFileExtension('fixtures/example/xulin');

      expect(result).toBeNull();
    });
  });
});
