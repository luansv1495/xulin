import { FilenamePatternInFolderModel } from './filename-pattern-in-folder';

export type RuleModel = FilenamePatternInFolderModel & {
  name: RuleNameEnum;
  skip: boolean;
};

export enum RuleProps {
  name = 'name',
  skip = 'skip'
}

export enum RuleNameEnum {
  filenamePatternInFolder = 'filename-pattern-in-folder'
}
