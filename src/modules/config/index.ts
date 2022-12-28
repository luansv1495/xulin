import path from 'path';
import { readFileSync } from 'fs';

import { ConfigModel } from './models/config.model';
import { validateConfigProps } from './validations';
import { BaseError } from '../../error';

export const getConfigFile = (projectPath: string): ConfigModel | undefined => {
  try {
    const buffer = readFileSync(path.join(projectPath, 'ata.config.json'));

    const jsonData = JSON.parse(buffer.toString());

    validateConfigProps(projectPath, jsonData);

    return jsonData;
  } catch (error: unknown) {
    (error as BaseError).showError();
  }
};
