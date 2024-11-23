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



  let fileName = service.path.makeFileName(generatorName, undefined, undefined, 'vue', '.', 'kebab');

  console.log('fileName',fileName);
  

  let callLocation = jetpack.cwd(`./.km-generator/${fileName.path}`);
  let controllerPath = callLocation.path('controller/index.ts');
  let fieldsPath = callLocation.path('fields/index.ts');
  let indexPath = callLocation.path('index.ts');

  callLocation.writeAsync(controllerPath, 'controller')
  callLocation.writeAsync(fieldsPath, 'fields')
  callLocation.writeAsync(indexPath, 'index')

};

export default controller;

