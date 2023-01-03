export interface FilenameSizeInFolderModel {
  min: number;
  max: number;
  folder: string;
}

export enum FilenameSizeInFolderProps {
  folder = 'folder',
  max = 'max',
  min = 'min'
}
