import { ConfigModel, ConfigProps } from './config.model';
import { ConfigFileIsEmptyError, UnexpectFieldInConfigError } from '../error';
import { RulesModule } from '../rules';
import { FileSystem } from '../utils';
import { join } from 'path';

export class ConfigModule {
  constructor(
    private readonly rootDir: string,
    private readonly rulesModule: RulesModule
  ) {}

  getConfigFile = (): ConfigModel | undefined => {
    const jsonData = FileSystem.getJsonFile(
      join(this.rootDir, 'nata.config.json')
    );

    this.validate(jsonData);

    return jsonData;
  };

  validate = (jsonData: object) => {
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

    this.rulesModule.validate(config.rules);
  };
}
