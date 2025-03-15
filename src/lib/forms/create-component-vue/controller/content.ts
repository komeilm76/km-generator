const space = () => {
  return [' '];
};
const macrosTypeInComponent = [
  `type IMacros = {`,
  `  props:{`,
  `   text:string`,
  `  },`,
  `  emits:{`,
  `   close:[data:string]`,
  `  },`,
  `  slots:{`,
  `   header(props:{data:string}):any`,
  `  },`,
  `  exposes:{`,
  `   text:string,`,
  `  }`,
  `}`,
  ...space(),
];
const macrosTypeInTypeScriptFile = (componentName: string) => {
  let output = [
    `export namespace ${componentName} {`,
    ` export type IMacros = {`,
    `  props:{`,
    `   text:string`,
    `  },`,
    `  emits:{`,
    `   close:[data:string]`,
    `  },`,
    `  slots:{`,
    `   header(props:{data:string}):any`,
    `  },`,
    `  exposes:{`,
    `   text:string,`,
    `  }`,
    ` }`,
    ...space(),
    ' export const service = () => {}',
    `}`,
  ];
  return output;
};
const macrosDefines = (componentName: string) => {
  return [
    `const props = defineProps<IMacros['props']>();`,
    `const emits = defineEmits<IMacros['emits']>();`,
    `const slots = defineSlots<IMacros['slots']>()`,
    `defineExpose<IMacros['exposes']>({`,
    ` text:props.text`,
    `})`,
    `defineOptions({`,
    ` name:'${componentName}'`,
    `})`,
    ...space(),
  ];
};
const macrosImport = (componentName: string) => {
  let output = [
    `import { ${componentName} } from "./script"`,
    ...space(),
    `type IMacros = ${componentName}.IMacros;`,
    ...space(),
  ];
  return output;
};

const addMacrosInComponentFile = <MODE extends string>(
  componentName: string,
  mode: 'folder' | 'file' | MODE
) => {
  let output =
    mode == 'folder'
      ? [...macrosImport(componentName), ...macrosDefines(componentName)]
      : [...macrosTypeInComponent, ...macrosDefines(componentName)];
  return output;
};

const addMacrosInTypeScriptFile = <MODE extends string>(
  componentName: string,
  mode: 'folder' | 'file' | MODE
) => {
  let output = mode == 'folder' ? [...macrosTypeInTypeScriptFile(componentName)] : [];
  return output;
};

const addTemplateInComponentFile = (className: string, content: string[]) => {
  let output = [
    `<template>`,
    ` <div class='${className}'>`,
    ...content,
    ` </div>`,
    `</template>`,
    ...space(),
  ];
  return output;
};

const addScriptToComponentFile = <LANG extends string>(
  lang: 'ts' | 'js' | LANG,
  content: string[]
) => {
  let output = [`<script setup lang='${lang}'>`, ...content, `</script>`, ...space()];
  return output;
};

const addStyleToComponentFile = <LANG extends string>(
  lang: 'scss' | 'css' | LANG,
  className: string
) => {
  let output = [`<style scoped lang='${lang}'>`, ` .${className} {`, ` }`, `</style>`, ...space()];
  return output;
};

const indexFileContent = (componentName: string) => {
  return [
    `import Cm from "./Component.vue"`,
    `import { ${componentName} } from './script'`,
    `export default {`,
    ` Cm,`,
    ` ...${componentName},`,
    `}`,
  ];
};

export default {
  macrosTypeInComponent,
  macrosTypeInTypeScriptFile,
  macrosDefines,
  indexFileContent,
  macrosImport,
  addMacrosInComponentFile,
  addMacrosInTypeScriptFile,
  addTemplateInComponentFile,
  addScriptToComponentFile,
  addStyleToComponentFile,
};
