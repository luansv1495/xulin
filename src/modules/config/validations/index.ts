import {
  ConfigFileIsEmptyError,
  UnexpectFieldInConfigError
} from '../../../error';
import { validateRulesField } from '../../rules/validations';
import { ConfigModel, ConfigProps } from '../models';

export const Validate = {
  configProps: (projectPath: string, jsonData: object) => {
    console.log(jsonData);

    const receivedKeys = Object.keys(jsonData);
    const expectedKeys = Object.values(ConfigProps);

    if (receivedKeys.length === 0) {
      throw new ConfigFileIsEmptyError();
    }

    receivedKeys.forEach((receivedKey) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!expectedKeys.includes(receivedKey as any)) {
        throw new UnexpectFieldInConfigError(receivedKey);
      }
    });

    const config = jsonData as ConfigModel;

    validateRulesField(projectPath, config.rules);
  }
};
