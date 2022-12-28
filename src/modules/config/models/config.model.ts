import { RuleModel } from '../../rules/models';

export interface ConfigModel {
  rules: RuleModel[];
}

export enum ConfigProps {
  rules = 'rules'
}
