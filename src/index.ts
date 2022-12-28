import { existsSync } from 'fs';
import { getConfigFile } from './modules/config';
import { ProjectPathNotFoundError } from './error';
import { handlerRules } from './modules/rules';
import { InfoMessage, showInfo } from './utils';

showInfo(InfoMessage.loadConfig);

const projectPath = process.argv[2];

if (!existsSync(projectPath)) {
  new ProjectPathNotFoundError(projectPath).showError();
} else {
  const config = getConfigFile(projectPath);

  if (config) {
    handlerRules(projectPath, config.rules);
  }
}
