import { BaseRule } from './base.rule';
import {
  FilenamePatternInFolderProps,
  FilenamePatternInFolderRule
} from './filename-pattern-in-folder';
import {
  FilenameSizeInFolderProps,
  FilenameSizeInFolderRule
} from './filename-size';
import {
  FolderNameInFolderProps,
  FolderNameInFolderRule
} from './folder-name-in-folder';
import {
  MaxFilesInFolderProps,
  MaxFilesInFolderRule
} from './max-files-in-folder';
import {
  MaxFoldersInFolderProps,
  MaxFoldersInFolderRule
} from './max-folders-in-folder';
import {
  VerifyStateEnum,
  RuleModel,
  RuleNameEnum,
  RuleProps,
  VerifyRuleState
} from './rule.model';

export class RuleFactory {
  constructor(
    private readonly rule: RuleModel,
    private readonly rootDir: string
  ) {}

  validate = () => {
    new BaseRule(this.rule).validate({
      rule: this.rule,
      rootDir: this.rootDir,
      expectedFields: Object.values(RuleNameEnum)
    });

    if (this.rule.name === RuleNameEnum.filenamePatternInFolder) {
      new FilenamePatternInFolderRule(this.rule).validate({
        rule: this.rule,
        rootDir: this.rootDir,
        expectedFields: (
          Object.values(FilenamePatternInFolderProps) as string[]
        ).concat(Object.values(RuleProps) as string[])
      });
    } else if (this.rule.name === RuleNameEnum.folderNameInFolder) {
      new FolderNameInFolderRule(this.rule).validate({
        rule: this.rule,
        rootDir: this.rootDir,
        expectedFields: (
          Object.values(FolderNameInFolderProps) as string[]
        ).concat(Object.values(RuleProps) as string[])
      });
    } else if (this.rule.name === RuleNameEnum.maxFilesInFolder) {
      new MaxFilesInFolderRule(this.rule).validate({
        rule: this.rule,
        rootDir: this.rootDir,
        expectedFields: (
          Object.values(MaxFilesInFolderProps) as string[]
        ).concat(Object.values(RuleProps) as string[])
      });
    } else if (this.rule.name === RuleNameEnum.maxFoldersInFolder) {
      new MaxFoldersInFolderRule(this.rule).validate({
        rule: this.rule,
        rootDir: this.rootDir,
        expectedFields: (
          Object.values(MaxFoldersInFolderProps) as string[]
        ).concat(Object.values(RuleProps) as string[])
      });
    } else if (this.rule.name === RuleNameEnum.filenameSizeInFolder) {
      new FilenameSizeInFolderRule(this.rule).validate({
        rule: this.rule,
        rootDir: this.rootDir,
        expectedFields: (
          Object.values(FilenameSizeInFolderProps) as string[]
        ).concat(Object.values(RuleProps) as string[])
      });
    }
  };

  verify = (): VerifyRuleState => {
    let state = {
      state: VerifyStateEnum.skipped,
      passed: 0,
      failed: 0
    } as VerifyRuleState;

    if (this.rule.name === RuleNameEnum.filenamePatternInFolder) {
      state = new FilenamePatternInFolderRule(this.rule).verify(this.rootDir);
    } else if (this.rule.name === RuleNameEnum.folderNameInFolder) {
      state = new FolderNameInFolderRule(this.rule).verify(this.rootDir);
    } else if (this.rule.name === RuleNameEnum.maxFilesInFolder) {
      state = new MaxFilesInFolderRule(this.rule).verify(this.rootDir);
    } else if (this.rule.name === RuleNameEnum.maxFoldersInFolder) {
      state = new MaxFoldersInFolderRule(this.rule).verify(this.rootDir);
    } else if (this.rule.name === RuleNameEnum.filenameSizeInFolder) {
      state = new FilenameSizeInFolderRule(this.rule).verify(this.rootDir);
    }

    return state;
  };
}
