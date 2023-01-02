import { validateQuantity } from './quantity.validation';

describe('Quantity validation tests', () => {
  test('should display error when quantity is not a number', () => {
    const result = validateQuantity('1');
    expect(result).toBe('"1" is not a number.');
  });

  test('should display error when quantity is not greater than 0', () => {
    const result = validateQuantity(0);
    expect(result).toBe('"0" must be greater than 0.');
  });
});
