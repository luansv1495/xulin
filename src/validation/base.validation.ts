/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
export interface BaseValidationProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rule: any;
  rootDir: string;
  expectedFields: string[];
}

export class BaseValidation {
  /* istanbul ignore next */
  validate = (props: BaseValidationProps): void => {};
}
