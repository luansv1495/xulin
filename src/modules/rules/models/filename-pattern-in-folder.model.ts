export interface FilenamePatternInFolderRule {
  folder: string;
  patterns: string[];
}

export enum FilenamePatternInFolderRuleProps {
  folder = 'folder',
  patterns = 'patterns'
}
