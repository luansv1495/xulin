import { validateFilenamePattern } from './filename-pattern.validation';

describe('Filename pattern validation tests', () => {
  test('should display error when pattern is not a string', () => {
    const result = validateFilenamePattern(true);
    expect(result).toBe('"true" is not a string.');
  });

  test('should display error when pattern is empty', () => {
    const result = validateFilenamePattern('');
    expect(result).toBe('"" is invalid.');
  });

  test('should display error when pattern is not a file', () => {
    const result = validateFilenamePattern('folder');
    expect(result).toBe('"folder" is not a file.');
  });

  test('should return null when pattern is valid', () => {
    const result = validateFilenamePattern('folder.json');
    expect(result).toBeNull();
  });
});
