import { blue, red } from 'kleur';
import { showError, showInfo } from './logger.util';

describe('Logger tests', () => {
  test('should call console.info with currect message', () => {
    jest.spyOn(console, 'info').mockImplementation();

    showInfo('test message');

    expect(console.info).toBeCalledWith(blue('INFO: ') + 'test message');
  });

  test('should call console.error with currect message', () => {
    jest.spyOn(console, 'error').mockImplementation();

    showError('TestError', 'test message');

    expect(console.error).toBeCalledWith(
      red('ERROR: ') + 'TestError ' + 'test message'
    );
  });
});
