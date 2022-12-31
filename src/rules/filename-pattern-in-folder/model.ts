export interface FilenamePatternInFolderModel {
  folder: string;
  patterns: string[];
}

export enum FilenamePatternInFolderProps {
  folder = 'folder',
  patterns = 'patterns'
}
