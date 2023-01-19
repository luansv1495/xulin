import { BaseRule } from './base.rule';
import {
  FilenamePatternInFolderProps,
  FilenamePatternInFolderRule
} from './filename-pattern-in-folder';
import {
  FilenameSizeInFolderProps,
  FilenameSizeInFolderRule
} from './filename-size-in-folder';
import {
  FolderNameInFolderProps,
  FolderNameInFolderRule
} from './folder-name-in-folder';
import {
  FolderNameSizeInFolderProps,
  FolderNameSizeInFolderRule
} from './folder-name-size-in-folder';
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
  VerifyRuleState
} from './rule.model';

export class RuleFactory {
  constructor(private rule: RuleModel, private rootDir: string) {}

  validate = (): void => {
    new BaseRule(this.rule).validate({
      rule: this.rule,
      rootDir: this.rootDir,
      expectedFields: Object.values(RuleNameEnum)
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { skip, ...rest } = this.rule;

    if (this.rule.name === RuleNameEnum.filenamePatternInFolder) {
      new FilenamePatternInFolderRule(this.rule).validate({
        rule: rest,
        rootDir: this.rootDir,
        expectedFields: Object.values(FilenamePatternInFolderProps) as string[]
      });
    } else if (this.rule.name === RuleNameEnum.folderNameInFolder) {
      new FolderNameInFolderRule(this.rule).validate({
        rule: rest,
        rootDir: this.rootDir,
        expectedFields: Object.values(FolderNameInFolderProps) as string[]
      });
    } else if (this.rule.name === RuleNameEnum.maxFilesInFolder) {
      new MaxFilesInFolderRule(this.rule).validate({
        rule: rest,
        rootDir: this.rootDir,
        expectedFields: Object.values(MaxFilesInFolderProps) as string[]
      });
    } else if (this.rule.name === RuleNameEnum.maxFoldersInFolder) {
      new MaxFoldersInFolderRule(this.rule).validate({
        rule: rest,
        rootDir: this.rootDir,
        expectedFields: Object.values(MaxFoldersInFolderProps) as string[]
      });
    } else if (this.rule.name === RuleNameEnum.filenameSizeInFolder) {
      new FilenameSizeInFolderRule(this.rule).validate({
        rule: rest,
        rootDir: this.rootDir,
        expectedFields: Object.values(FilenameSizeInFolderProps) as string[]
      });
    } else if (this.rule.name === RuleNameEnum.folderNameSizeInFolder) {
      new FolderNameSizeInFolderRule(this.rule).validate({
        rule: rest,
        rootDir: this.rootDir,
        expectedFields: Object.values(FolderNameSizeInFolderProps) as string[]
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
    } else if (this.rule.name === RuleNameEnum.folderNameSizeInFolder) {
      state = new FolderNameSizeInFolderRule(this.rule).verify(this.rootDir);
    }

    return state;
  };
}
