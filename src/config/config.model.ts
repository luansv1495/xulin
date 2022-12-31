import { RuleModel } from '../rules/rule.model';

export interface ConfigModel {
  rules: RuleModel[];
}

export enum ConfigProps {
  rules = 'rules'
}
