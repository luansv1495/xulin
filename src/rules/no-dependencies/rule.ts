import { grey } from 'kleur';

import { FileSystem, Logger } from '../../utils';
import {
  BaseValidation,
  ContainsRequiredFieldsValidation,
  ContainsTargetFolderInFolderListValidation,
  ContainsUnexpectFieldValidation,
  IsValidFolderListValidation,
  IsValidFolderValidation
} from '../../validation';
import { BaseRule, BaseRuleProps } from '../base.rule';
import { VerifyRuleState, VerifyStateEnum } from '../rule.model';
import { FileContainsInvalidDependenciesInRuleError } from '../../error';
import { NoDependenciesProps } from './model';

export class NoDependenciesRule extends BaseRule {
  expectedFields: string[] = Object.values(NoDependenciesProps) as string[];
  validations: BaseValidation[] = [
    new ContainsUnexpectFieldValidation(),
    new ContainsRequiredFieldsValidation(),
    new IsValidFolderValidation(),
    new IsValidFolderListValidation(),
    new ContainsTargetFolderInFolderListValidation()
  ];

  constructor(props: BaseRuleProps) {
    super(props);
  }

  makeVerifyMessage(): void {
    this.verifyMessage = `${grey(
      this.rule.folder
    )} files must not contain dependencies on ${grey(
      this.rule.folders.join(', ')
    )} folders.`;
  }

  getFilesThatCannotDepend = (): string[] => {
    let files: string[] = [];

    this.rule.folders.forEach((folder: string) => {
      const items = FileSystem.getDeepFilesInFolder(this.rootDir, folder, []);
      files = files.concat(items);
    });

    return files;
  };

  async customVerify(): Promise<VerifyRuleState> {
    const filesToCheck = FileSystem.getDeepFilesInFolder(
      this.rootDir,
      this.rule.folder,
      []
    );

    const filesThatCannotDepend = this.getFilesThatCannotDepend();

    interface InvalidDependence {
      targetFile: string;
      invalidDependence: string;
    }

    const invalidDependences: InvalidDependence[] = [];

    const checkPromisses = filesToCheck.map(async (file: string) => {
      const extension = FileSystem.getFileExtension(file);

      if (!!extension && ['ts', 'js'].includes(extension)) {
        const filesInCompile = await FileSystem.getImportsInTsFile(file);

        filesInCompile.forEach((item: string) => {
          if (filesThatCannotDepend.includes(item)) {
            invalidDependences.push({
              targetFile: file,
              invalidDependence: item
            });
          }
        });
      }
    });

    return Promise.all(checkPromisses).then(() => {
      const validFiles = invalidDependences.filter(
        (item: InvalidDependence) => !filesToCheck.includes(item.targetFile)
      );

      if (invalidDependences.length != 0) {
        Logger.handler(VerifyStateEnum.failed, this.verifyMessage);

        invalidDependences.forEach((item: InvalidDependence) => {
          new FileContainsInvalidDependenciesInRuleError(
            item.targetFile,
            item.invalidDependence,
            this.rule.name
          ).showError(1);
        });

        return {
          state: VerifyStateEnum.failed,
          passed: validFiles.length,
          failed: invalidDependences.length
        };
      } else {
        Logger.handler(VerifyStateEnum.passed, this.verifyMessage);
        return {
          state: VerifyStateEnum.passed,
          passed: validFiles.length,
          failed: invalidDependences.length
        };
      }
    });
  }
}
