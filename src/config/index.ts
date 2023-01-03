import { ConfigModel, ConfigProps } from './config.model';
import { ConfigFileIsEmptyError, UnexpectFieldInConfigError } from '../error';
import { RulesModule } from '../rules';
import { FileSystem } from '../utils';
import { join } from 'path';

export class ConfigModule {
  constructor(private rootDir: string, private rulesModule: RulesModule) {}

  getConfigFile = (): ConfigModel | undefined => {
    const jsonData = FileSystem.getJsonFile(
      join(this.rootDir, 'xulin.config.json')
    );

    this.validate(jsonData);

    return jsonData;
  };

  validate = (jsonData: object): void => {
    const receivedKeys = Object.keys(jsonData);
    const expectedKeys = Object.values(ConfigProps);

    if (receivedKeys.length === 0) {
      throw new ConfigFileIsEmptyError();
    }

    receivedKeys.forEach((receivedKey: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!expectedKeys.includes(receivedKey as any)) {
        throw new UnexpectFieldInConfigError(receivedKey);
      }
    });

    const config = jsonData as ConfigModel;

    this.rulesModule.validate(config.rules);
  };
}
