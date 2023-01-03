import { FilenamePatternInFolderModel } from './filename-pattern-in-folder';
import { FilenameSizeInFolderModel } from './filename-size-in-folder';
import { FolderNameInFolderModel } from './folder-name-in-folder';
import { FolderNameSizeInFolderModel } from './folder-name-size-in-folder';
import { MaxFilesInFolderModel } from './max-files-in-folder';
import { MaxFoldersInFolderModel } from './max-folders-in-folder';

export type RuleModel = FilenamePatternInFolderModel &
  FilenameSizeInFolderModel &
  FolderNameInFolderModel &
  FolderNameSizeInFolderModel &
  MaxFilesInFolderModel &
  MaxFoldersInFolderModel & {
    name: RuleNameEnum;
    skip: boolean;
  };

export enum RuleProps {
  name = 'name',
  skip = 'skip'
}

export enum RuleNameEnum {
  filenamePatternInFolder = 'filename-pattern-in-folder',
  folderNameInFolder = 'folder-name-in-folder',
  maxFilesInFolder = 'max-files-in-folder',
  maxFoldersInFolder = 'max-folders-in-folder',
  filenameSizeInFolder = 'filename-size-in-folder',
  folderNameSizeInFolder = 'folder-name-size-in-folder'
}

export enum VerifyStateEnum {
  skipped = 'skipped',
  passed = 'passed',
  failed = 'failed'
}

export interface VerifyRuleState {
  passed: number;
  failed: number;
  state: VerifyStateEnum;
}
