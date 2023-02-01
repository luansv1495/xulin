import { BaseRule, BaseRuleProps } from './base.rule';
import { FilenamePatternInFolderRule } from './filename-pattern-in-folder';
import { FilenameSizeInFolderRule } from './filename-size-in-folder';
import { FolderNameInFolderRule } from './folder-name-in-folder';
import { FolderNameSizeInFolderRule } from './folder-name-size-in-folder';
import { MaxFilesInFolderRule } from './max-files-in-folder';
import { MaxFoldersInFolderRule } from './max-folders-in-folder';
import { NoDependenciesRule } from './no-dependencies';
import {
  VerifyStateEnum,
  RuleModel,
  RuleNameEnum,
  VerifyRuleState
} from './rule.model';

export class RuleFactory {
  props: BaseRuleProps;

  constructor(private rule: RuleModel, private rootDir: string) {
    this.props = {
      rule: this.rule,
      rootDir: this.rootDir
    };
  }

  validate = (): void => {
    new BaseRule(this.props).validate();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { skip, ...rest } = this.rule;
    const props = { rule: rest, rootDir: this.rootDir } as BaseRuleProps;

    if (this.rule.name === RuleNameEnum.filenamePatternInFolder) {
      new FilenamePatternInFolderRule(props).validate();
    } else if (this.rule.name === RuleNameEnum.folderNameInFolder) {
      new FolderNameInFolderRule(props).validate();
    } else if (this.rule.name === RuleNameEnum.maxFilesInFolder) {
      new MaxFilesInFolderRule(props).validate();
    } else if (this.rule.name === RuleNameEnum.maxFoldersInFolder) {
      new MaxFoldersInFolderRule(props).validate();
    } else if (this.rule.name === RuleNameEnum.filenameSizeInFolder) {
      new FilenameSizeInFolderRule(props).validate();
    } else if (this.rule.name === RuleNameEnum.folderNameSizeInFolder) {
      new FolderNameSizeInFolderRule(props).validate();
    } else if (this.rule.name === RuleNameEnum.noDependencies) {
      new NoDependenciesRule(props).validate();
    }
  };

  verify = async (): Promise<VerifyRuleState> => {
    switch (this.rule.name) {
      case RuleNameEnum.filenamePatternInFolder:
        return await new FilenamePatternInFolderRule(this.props).verify();
      case RuleNameEnum.folderNameInFolder:
        return await new FolderNameInFolderRule(this.props).verify();
      case RuleNameEnum.maxFilesInFolder:
        return await new MaxFilesInFolderRule(this.props).verify();
      case RuleNameEnum.maxFoldersInFolder:
        return await new MaxFoldersInFolderRule(this.props).verify();
      case RuleNameEnum.filenameSizeInFolder:
        return await new FilenameSizeInFolderRule(this.props).verify();
      case RuleNameEnum.folderNameSizeInFolder:
        return await new FolderNameSizeInFolderRule(this.props).verify();
      case RuleNameEnum.noDependencies:
        return await new NoDependenciesRule(this.props).verify();
    }
  };
}
