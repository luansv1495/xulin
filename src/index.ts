import { BaseError, ProjectPathNotFoundError } from './error';
import {
  ErrorMessage,
  FileSystem,
  InfoMessage,
  Logger,
  ProcessUtil
} from './utils';
import { RulesModule } from './rules';
import { ConfigModule } from './config';

export const main = (): void => {
  try {
    Logger.info(InfoMessage.loadConfig);

    const rootDir = process.argv[2];

    if (!FileSystem.exists(rootDir)) {
      throw new ProjectPathNotFoundError(rootDir);
    } else {
      const rulesModule = new RulesModule(rootDir);
      const configModule = new ConfigModule(rootDir, rulesModule);

      const config = configModule.getConfigFile();

      if (config) {
        //Logger.excludeErrorLogger();

        rulesModule.verify();
      }
    }
  } catch (error: unknown) {
    if ((error as Error).name === 'SyntaxError') {
      Logger.error('UnexpectedError', (error as Error).message);
    } else if (
      (error as Error).message.startsWith(ErrorMessage.configNotFound)
    ) {
      Logger.error('ConfigError', (error as Error).message);
    } else {
      (error as BaseError).showError();
    }
    ProcessUtil.exit();
  }
};

main();
