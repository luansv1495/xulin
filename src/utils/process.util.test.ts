import { ProcessUtil } from './process.util';

describe('Process tests', () => {
  test('should call process.exit', () => {
    const exit = jest
      .spyOn(process, 'exit')
      .mockImplementationOnce(() => undefined as never);

    ProcessUtil.exit();

    expect(exit).toBeCalledWith(1);
  });
});
