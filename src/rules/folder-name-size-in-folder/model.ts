export interface FolderNameSizeInFolderModel {
  min: number;
  max: number;
  folder: string;
}

export enum FolderNameSizeInFolderProps {
  folder = 'folder',
  max = 'max',
  min = 'min'
}
