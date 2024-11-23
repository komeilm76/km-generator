import { IResult } from '../../../service/form';
import _ from 'lodash';
import createComponentVue from '../../create-component-vue';
const controller = (result: IResult[]) => {
  let componentMode = result.find((item) => {
    return item.key == 'component-mode';
  })?.value;
  if (componentMode == 'create-component-vue') {
    createComponentVue.form.start();
  }
};

export default controller;
