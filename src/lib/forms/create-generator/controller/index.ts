// @ts-ignore
import jetpack from 'fs-jetpack';
import { IResult } from '../../../service/form';
import _ from 'lodash';
import service from '../../../service';

const controller = (result: IResult[]) => {
  console.log('result', result);

  let generatorName = result.find((item) => {
    return item.key == 'generator-name';
  })?.value as string;

  let fileName = service.path.makeFileName(
    generatorName,
    undefined,
    undefined,
    'vue',
    '.',
    'kebab'
  );

  console.log('fileName', fileName);

  let callLocation = jetpack.cwd(`./src/.km-generator/${fileName.path}`);
  let controllerPath = callLocation.path('controller/index.ts');
  let fieldsPath = callLocation.path('fields/index.ts');
  let indexPath = callLocation.path('index.ts');

  callLocation.writeAsync(controllerPath, 'controller');
  callLocation.writeAsync(fieldsPath, 'fields');
  let indexTemplate = [
    `    import service from '../../service';`,
    `    import controller from './controller';`,
    `    import fields from './fields';`,

    `    const form = service.form.makeForm('create-template', fields);`,

    `    form.finish.subscribe((observer) => {`,
    `      controller(observer);`,
    `    });`,
    `    export default {`,
    `      form,`,
    `    };`,
  ];
  callLocation.writeAsync(indexPath, indexTemplate.join('\t\n'));
};

export default controller;
