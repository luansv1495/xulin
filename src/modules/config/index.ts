import path from 'path';
import fs from 'fs';

import { ConfigModel } from './models/config.model';
import { Validate } from './validations';
import { BaseError } from '../../error';

export const ConfigModule = {
  getConfigFile: (projectPath: string): ConfigModel | undefined => {
    try {
      const buffer = fs.readFileSync(path.join(projectPath, 'ata.config.json'));

      const jsonData = JSON.parse(buffer.toString());

      Validate.configProps(projectPath, jsonData);

      return jsonData;
    } catch (error: unknown) {
      console.log(error);

      (error as BaseError).showError();
    }
  }
};
