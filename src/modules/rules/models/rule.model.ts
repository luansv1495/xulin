import { FilenamePatternInFolderRule } from '.';

export type RuleModel = FilenamePatternInFolderRule & {
  name: RuleNameEnum;
  skip: boolean;
};

export enum RuleNameEnum {
  filenamePatternInFolder = 'filename-pattern-in-folder'
}
