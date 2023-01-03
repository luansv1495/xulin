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
});
