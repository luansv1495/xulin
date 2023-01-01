import { FilenamePatternInFolderModel } from './filename-pattern-in-folder';
import { FolderNameInFolderModel } from './folder-name-in-folder';

export type RuleModel = {
  name: RuleNameEnum;
  skip: boolean;
} & FilenamePatternInFolderModel &
  FolderNameInFolderModel;

export enum RuleProps {
  name = 'name',
  skip = 'skip'
}

export enum RuleNameEnum {
  filenamePatternInFolder = 'filename-pattern-in-folder',
  folderNameInFolder = 'folder-name-in-folder'
}

export enum VerifyStateEnum {
  skipped = 'skipped',
  passed = 'passed',
  failed = 'failed'
}
