import fs from 'fs';
import { BaseError, ProjectPathNotFoundError } from './error';
import { InfoMessage, Logger } from './utils';
import { RulesModule } from './rules';
import { ConfigModule } from './config';

export const main = () => {
  try {
    Logger.info(InfoMessage.loadConfig);

    const rootDir = process.argv[2];

    if (!fs.existsSync(rootDir)) {
      new ProjectPathNotFoundError(rootDir).showError();
    } else {
      const rulesModule = new RulesModule(rootDir);
      const configModule = new ConfigModule(rootDir, rulesModule);

      const config = configModule.getConfigFile();

      if (config) {
        rulesModule.handler();
      }
    }
  } catch (error: unknown) {
    if ((error as Error).name === 'SyntaxError') {
      Logger.error('UnexpectedError', (error as Error).message);
    } else {
      (error as BaseError).showError();
    }
  }
};

main();
