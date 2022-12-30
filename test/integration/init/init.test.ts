import { red, blue } from 'kleur';
import { main } from '../../../src/index';

describe('Init tests', () => {
  beforeAll(() => {
    jest.spyOn(process.stdout, 'write').mockImplementationOnce(() => false);
    process.argv = ['node', 'ata', './fake-folder'];
  });

  test('should display loding config message', () => {
    main();

    expect(process.stdout.write).toBeCalledWith(
      blue('INFO: ') + 'Loading config...\n'
    );
  });

  test('should display error when project path not found', () => {
    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') + 'InitError Project path "./fake-folder" not found.\n'
    );
  });
});
