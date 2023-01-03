import { RuleNameEnum } from '../../src/rules/rule.model';

export class RuleBuild {
  name: RuleNameEnum;
  skip = false;
  folder?: unknown;
  patterns?: unknown;
  names?: unknown;
  quantity?: unknown;
  max?: unknown;
  min?: unknown;
  fakeField?: unknown;

  constructor(name: RuleNameEnum) {
    this.name = name;
  }

  withSkip = (skip: boolean): RuleBuild => {
    this.skip = skip;
    return this;
  };

  withFolder = (folder: unknown): RuleBuild => {
    this.folder = folder;
    return this;
  };

  withPatterns = (patterns: unknown): RuleBuild => {
    this.patterns = patterns;
    return this;
  };

  withFakeField = (): RuleBuild => {
    this.fakeField = true;
    return this;
  };

  withMax = (max: unknown): RuleBuild => {
    this.max = max;
    return this;
  };

  withMin = (min: unknown): RuleBuild => {
    this.min = min;
    return this;
  };

  withNames = (names: unknown): RuleBuild => {
    this.names = names;
    return this;
  };

  withQuantity = (quantity: unknown): RuleBuild => {
    this.quantity = quantity;
    return this;
  };

  build = (): object => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rule: any = {
      name: this.name,
      skip: this.skip
    };

    if (this.folder != undefined) {
      rule.folder = this.folder;
    }

    if (this.patterns != undefined) {
      rule.patterns = this.patterns;
    }

    if (this.fakeField != undefined) {
      rule.fakeField = this.fakeField;
    }

    if (this.max != undefined) {
      rule.max = this.max;
    }

    if (this.min != undefined) {
      rule.min = this.min;
    }

    if (this.names != undefined) {
      rule.names = this.names;
    }

    if (this.quantity != undefined) {
      rule.quantity = this.quantity;
    }

    return rule;
  };
}
