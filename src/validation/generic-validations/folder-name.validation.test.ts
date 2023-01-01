import { validateFoldername } from './folder-name.validation';

describe('Folder name validation tests', () => {
  test('should display error when folder name is not a string', () => {
    const result = validateFoldername(true);
    expect(result).toBe('"true" is not a string.');
  });

  test('should display error when folder name is empty', () => {
    const result = validateFoldername('');
    expect(result).toBe('"" is invalid.');
  });

  test('should display error when folder name is not a folder', () => {
    const result = validateFoldername('folder.json');
    expect(result).toBe('"folder.json" is not a folder.');
  });

  test('should return null when folder name is valid', () => {
    const result = validateFoldername('folder');
    expect(result).toBeNull();
  });
});
