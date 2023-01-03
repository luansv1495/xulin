import { validateMaxMin } from './max-min.validation';

describe('Quantity validation tests', () => {
  test('should display error when min is greater than or equal to the max value', () => {
    const result = validateMaxMin(1, 2);
    expect(result).toBe('"2" is greater than or equal to the max value.');
  });

  test('should return null when is valid values', () => {
    const result = validateMaxMin(2, 1);
    expect(result).toBeNull();
  });
});
