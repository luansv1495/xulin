import { BaseRule } from './base.rule';
import {
  FilenamePatternInFolderProps,
  FilenamePatternInFolderRule
} from './filename-pattern-in-folder';
import { RuleModel, RuleNameEnum, RuleProps } from './rule.model';

export class RuleFactory {
  constructor(
    private readonly rule: unknown,
    private readonly rootDir: string
  ) {}

  validate = () => {
    new BaseRule().validate({
      rule: this.rule,
      rootDir: this.rootDir,
      expectedFields: Object.values(RuleNameEnum)
    });

    if (
      (this.rule as RuleModel).name === RuleNameEnum.filenamePatternInFolder
    ) {
      new FilenamePatternInFolderRule().validate({
        rule: this.rule,
        rootDir: this.rootDir,
        expectedFields: (
          Object.values(FilenamePatternInFolderProps) as string[]
        ).concat(Object.values(RuleProps) as string[])
      });
    }
  };
}
