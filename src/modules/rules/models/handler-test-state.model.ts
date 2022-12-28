export interface HandlerRuleStateModel {
  key: number;
  message: string;
  state: HandlerRuleStateEnum;
}

export enum HandlerRuleStateEnum {
  skipped = 'skipped',
  passed = 'passed',
  failed = 'failed'
}
