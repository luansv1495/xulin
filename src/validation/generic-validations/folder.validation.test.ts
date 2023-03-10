import { FileSystem } from '../../utils';
import { validateFolder } from './folder.validation';

describe('Folder validation tests', () => {
  test('should display error when folder is not a string', () => {
    const result = validateFolder('./fake-folder', true);
    expect(result).toBe('"true" is not a string.');
  });

  test('should display error when folder is empty', () => {
    const result = validateFolder('./fake-folder', '');
    expect(result).toBe('"" is invalid.');
  });

  test('should display error when folder is not a directory', () => {
    const result = validateFolder('./fake-folder', 'folder.js');
    expect(result).toBe('"folder.js" is not a folder.');
  });

  test('should display error when folder is not found', () => {
    jest.spyOn(FileSystem, 'exists').mockReturnValueOnce(false);
    const result = validateFolder('./fake-folder', 'fake');
    expect(result).toBe('"fake" not found.');
  });

  test('should return null when folder is valid', () => {
    jest.spyOn(FileSystem, 'exists').mockReturnValueOnce(true);
    const result = validateFolder('./fake-folder', 'fake');
    expect(result).toBeNull();
  });
});
