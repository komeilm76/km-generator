import jetpack from 'fs-jetpack';
import { IResult } from '../../../service/form';
import _ from 'lodash';
import service from '../../../service';
import content from './content';

const controller = (result: IResult[]) => {
  console.log('result', result);

  let componentName = result.find((item) => {
    return item.key == 'component-name';
  })?.value as string;

  let componentPrefix = result.find((item) => {
    return item.key == 'component-prefix';
  })?.value as string;

  let componentSuffix = result.find((item) => {
    return item.key == 'component-suffix';
  })?.value as string;

  let componentScriptLanguage = result.find((item) => {
    return item.key == 'component-script-language';
  })?.value as string;

  let componentStyleLanguage = result.find((item) => {
    return item.key == 'component-style-language';
  })?.value as string;
  let componentDesign = result.find((item) => {
    return item.key == 'component-design';
  })?.value as string;

  let componentMacro = result.find((item) => {
    return item.key == 'component-macro';
  })?.value as boolean;

  let fileName = service.path.makeFileName(
    componentName,
    componentPrefix,
    componentSuffix,
    'vue',
    '.'
  );

  console.log('fileName', fileName);

  const componentFile = {
    content: [
      ...content.addTemplateInComponentFile(fileName.kebabName, [`  ${fileName.name}`]),
      ...content.addScriptToComponentFile(componentScriptLanguage, [
        ...(componentMacro == true
          ? content.addMacrosInComponentFile(fileName.justName, componentDesign)
          : []),
      ]),
      ...content.addStyleToComponentFile(componentStyleLanguage, fileName.kebabName),
    ],
    fileFullName:
      componentDesign == 'file'
        ? fileName.fullpath
        : `${fileName.path}/Component.${fileName.format}`,
    mode: 'both',
  };
  const typescriptFile = {
    content: [
      ...(componentMacro == true
        ? content.addMacrosInTypeScriptFile(fileName.justName, componentDesign)
        : []),
    ],
    fileFullName: `${fileName.path}/types.ts`,
    mode: 'folder',
  };
  const indexFile = {
    content: [...content.indexFileContent],
    fileFullName: `${fileName.path}/index.ts`,
    mode: 'folder',
  };

  [componentFile, typescriptFile, indexFile].forEach((item) => {
    let content = item.content.join('\t\n');
    let callLocation = jetpack.cwd(`./`);
    if (item.mode == 'both') {
      callLocation.writeAsync(item.fileFullName, content);
    }
    if (item.mode == componentDesign) {
      callLocation.writeAsync(item.fileFullName, content);
    }
  });
};

export default controller;
