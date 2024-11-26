// @ts-ignore
import jetpack from 'fs-jetpack';
import { IResult } from '../../../service/form';
import _ from 'lodash';
import service from '../../../service';

const controller = (result: IResult[]) => {
  console.log('result', result);

  let generatorName = result.find((item) => {
    return item.key == 'generator-name';
  })?.value;
  if (generatorName == undefined) {
    generatorName = 'custom-projects';
  }
  let generatorMode = result.find((item) => {
    return item.key == 'generator-mode';
  })?.value as string;

  let fileName = service.path.makeFileName(
    generatorName as string,
    undefined,
    undefined,
    'vue',
    '.',
    'kebab'
  );

  console.log('fileName', fileName);

  if (generatorMode == 'km-generator-project') {
    let callLocation = jetpack.cwd(`./src/lib/custom-forms/${fileName.path}`);

    let controllerPath = callLocation.path('controller/index.ts');
    let fieldsPath = callLocation.path('fields/index.ts');
    let indexPath = callLocation.path('index.ts');

    let controllerTemplate = [
      `import { IResult } from '../../../service/form';`,
      `const controller = (result: IResult[]) => {`,
      `// write logic of controller here`,
      `};`,
      `export default controller;`,
    ];

    let fieldsTemplate = [
      `import service from '../../../service';`,
      `const fields = service.form.makeFieldsMap([`,
      ` // insert fields here`,
      `]);`,
      ``,
      `export default fields;`,
    ];

    let indexTemplate = [
      `import service from '../../service';`,
      `import controller from './controller';`,
      `import fields from './fields';`,

      `const form = service.form.makeForm('create-template', fields);`,

      `form.finish.subscribe((observer) => {`,
      `  controller(observer);`,
      `});`,
      `export default {`,
      `  form,`,
      `};`,
    ];

    callLocation.writeAsync(controllerPath, controllerTemplate.join('\t\n'));
    callLocation.writeAsync(fieldsPath, fieldsTemplate.join('\t\n'));
    callLocation.writeAsync(indexPath, indexTemplate.join('\t\n'));
  } else if (generatorMode == 'custom-projects') {
    let callLocation = jetpack.cwd(`./.km-generator/custom-forms/${fileName.path}`);

    let controllerPath = callLocation.path('controller/index.ts');
    let fieldsPath = callLocation.path('fields/index.ts');
    let indexPath = callLocation.path('index.ts');

    let controllerTemplate = [
      `import { IResult } from 'km-generator/build/main/lib/service/form';`,
      `import kmGenerator from 'km-generator';`,
      `const controller = (result: IResult[]) => {`,
      `// write logic of controller here`,
      `};`,
      `export default controller;`,
    ];

    let fieldsTemplate = [
      `import kmGenerator from 'km-generator';`,
      `const fields = kmGenerator.service.form.makeFieldsMap([`,
      ` // insert fields here`,
      `]);`,
      ``,
      `export default fields;`,
    ];

    let indexTemplate = [
      `import kmGenerator from 'km-generator';`,
      `import controller from './controller';`,
      `import fields from './fields';`,
      `const form = kmGenerator.service.form.makeForm('create-template', fields);`,
      `form.finish.subscribe((observer) => {`,
      `  controller(observer);`,
      `});`,
      `export default {`,
      `  form,`,
      `};`,
    ];

    Promise.all([
      callLocation.writeAsync(controllerPath, controllerTemplate.join('\t\n')),
      callLocation.writeAsync(fieldsPath, fieldsTemplate.join('\t\n')),
      callLocation.writeAsync(indexPath, indexTemplate.join('\t\n')),
    ]).then((res) => {
      let itemsPath = jetpack.find('.km-generator/custom-forms', {
        directories: true,
        files: false,
        recursive: false,
      });
      let items = itemsPath.map((item) => {
        let path = item.split('\\');
        let output = _.last(path) as string;
        return output;
      });
      let importItems = items.map((item) => {
        return `import ${item} from './${item}';`;
      });
      let exportItems = items.map((item) => {
        return `  ${item},`;
      });
      let configTemplate = [...importItems, 'export default {', ...exportItems, '}'];
      let configLocation = jetpack.cwd(`./.km-generator/custom-forms`);
      configLocation.writeAsync('index.ts', configTemplate.join('\t\n'));
    });
  }
};

export default controller;
