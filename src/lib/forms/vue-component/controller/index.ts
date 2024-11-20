import jetpack from 'fs-jetpack';
import { IResult } from '../../../service/form';
import _ from 'lodash';

const parsePath = (path: string) => {
  let splitedPath = path.split('/');
  let fileNameAsArray = _.takeRight(splitedPath);
  let directoryPathAsArray = _.dropRight(splitedPath);
  let fileName = fileNameAsArray.join('/');
  let directoryPath = directoryPathAsArray.join('/');
  if (_.isEmpty(directoryPath)) {
    directoryPath = '.';
  }
  let output = {
    name: fileName,
    location: directoryPath,
  };
  return output;
};

const makeFileName = (
  path: string,
  prefix: string | undefined,
  suffix: string | undefined,
  format: string,
  joinSymbol: string
) => {
  let { name, location } = parsePath(path);

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
  let truePath = _.join([location, fileName], '/');
  let truefullPath = _.join([location, fullFileName], '/');
  return {
    name: fileName,
    fullName: fullFileName,
    format,
    kebabName: _.kebabCase(fileName),
    location,
    path: truePath,
    fullpath: truefullPath,
  };
};

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

  let fileName = makeFileName(componentName, componentPrefix, componentSuffix, 'vue', '.');
  let fileData = [
    `<template>`,
    ` <div class='${fileName.kebabName}'> ${fileName.name} </div>`,
    `</template>`,
    ``,
    `<script setup lang='${componentScriptLanguage == 'typescript' ? 'ts' : 'js'}'>`,

    ...(componentMacro == true ? [
      `type IMacros = {`,
      `  props:{`,
      `   fooProps:string`,
      `  },`,
      `  emits:{`,
      `   fooEvent:[data:string]`,
      `  },`,
      `  slots:{`,
      `   fooSlot(props:{data:string}):any`,
      `  },`,
      `  exposes:{`,
      `   foo:string,`,
      `   bar:number`,
      `  }`,
      `}`,
      `   `,
      `const props = defineProps<IMacros['props']>();`,
      `const emits = defineEmits<IMacros['emits']>();`,
      `const slots = defineSlots<IMacros['slots']>()`,
      `defineExpose<IMacros['exposes']>({})`,

    ] : []),

    `</script>`,
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
    callLocation.writeAsync(fileName.fullpath, fileDataAsString);
  } else {
    callLocation.writeAsync(`${fileName.path}/index.${fileName.format}`, fileDataAsString);
  }
};

export default controller;



`
  type IMacros = {
    props:{
      fooProps:string
    },
    emits:{
      fooEvent:[data:string]
    },
    slots:{
      fooSlot(props:{data:string}):any
    },
    exposes:{
      foo:string,
      bar:number
    }
  }
  
  const props = defineProps<IMacros['props']>();
  const emits = defineEmits<IMacros['emits']>();
  const slots = defineSlots<IMacros['slots']>()
  defineExpose<IMacros['exposes']>({})
  `