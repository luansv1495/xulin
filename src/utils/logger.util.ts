import { red, blue } from 'kleur';

export const showError = (errorName: string, message: string, nivel = 0) => {
  console.error(
    ' '.repeat(nivel * 6) + red('ERROR: ') + errorName + ' ' + message
  );
};

export const showInfo = (message: string) => {
  console.info(blue('INFO: ') + message);
};
