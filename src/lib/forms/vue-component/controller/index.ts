import jetpack from 'fs-jetpack';
import { IResult } from '../../../service/form';
import _ from 'lodash';

const makeFileName = (
  name: string,
  prefix: string | undefined,
  suffix: string | undefined,
  format: string,
  joinSymbol: string
) => {
  name = _.upperFirst(_.camelCase(name));
  format = _.toLower(format);
  if (_.isEmpty(prefix)) {
    prefix = undefined;
  } else {
    prefix = _.toLower(prefix);
  }
  if (_.isEmpty(suffix)) {
    suffix = undefined;
  } else {
    suffix = _.toLower(suffix);
  }

  let nameScope = [];
  nameScope.push(prefix);
  nameScope.push(name);
  nameScope.push(suffix);
  nameScope = nameScope.filter((item) => {
    return item !== undefined;
  });
  let fileName = nameScope.join(joinSymbol);
  let fullFileName = `${fileName}.${format}`;

  return {
    name: fileName,
    fullName: fullFileName,
    format,
    kebabName: _.kebabCase(fileName),
  };
};

const controller = (result: IResult[]) => {
  let componentName = result.find((item) => {
    return item.key == 'component-name';
  })?.value as string;

  let componentPrefix = result.find((item) => {
    return item.key == 'component-prefix';
  })?.value;

  let componentSuffix = result.find((item) => {
    return item.key == 'component-suffix';
  })?.value;

  let componentScriptLanguage = result.find((item) => {
    return item.key == 'component-script-language';
  })?.value;

  let componentStyleLanguage = result.find((item) => {
    return item.key == 'component-style-language';
  })?.value;

  let componentDesign = result.find((item) => {
    return item.key == 'component-design';
  })?.value;

  let fileName = makeFileName(componentName, componentPrefix, componentSuffix, 'vue', '.');
  let fileData = [
    `<template>`,
    ` <div class='${fileName.kebabName}'></div>`,
    `</template>`,
    ``,
    `<script setup lang='${componentScriptLanguage == 'typescript' ? 'ts' : 'js'}'></script>`,
    ``,
    `<style scoped lang='${componentStyleLanguage == 'scss' ? 'scss' : 'css'}'>`,
    ` .${fileName.kebabName} {`,
    ` }`,
    `</style>`,
  ];
  let fileDataAsString = fileData.join('\t\n');
  console.log(fileData);
  console.log(fileDataAsString);
  let callLocation = jetpack.cwd(`./`);

  if (componentDesign == 'file') {
    callLocation.writeAsync(fileName.fullName, fileDataAsString);
  } else {
    callLocation.writeAsync(`${fileName.name}/index.${fileName.format}`, fileDataAsString);
  }
};

export default controller;
