export class ConfigBuild {
  rules: object[] = [];

  withRule = (newRule: object): ConfigBuild => {
    this.rules.push(newRule);
    return this;
  };

  build = (): object => {
    return { rules: this.rules };
  };
}
