import path from 'path';
import fs from 'fs';

import { ConfigModel } from './models/config.model';
import { Validate } from './validations';
import { BaseError } from '../../error';
import { Logger } from '../../utils';

export const ConfigModule = {
  getConfigFile: (projectPath: string): ConfigModel | undefined => {
    try {
      const buffer = fs.readFileSync(path.join(projectPath, 'ata.config.json'));

      const jsonData = JSON.parse(buffer.toString());

      Validate.configProps(projectPath, jsonData);

      return jsonData;
    } catch (error: unknown) {
      if ((error as Error).name === 'SyntaxError') {
        Logger.error('UnexpectedError', (error as Error).message);
      } else {
        (error as BaseError).showError();
      }
    }
  }
};
