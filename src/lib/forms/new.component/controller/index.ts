import { IResult } from '../../../service/form';
import _ from 'lodash';
import vueComponent from '../../vue-component';
const controller = (result: IResult[]) => {
  let componentMode = result.find((item) => {
    return item.key == 'component-mode';
  })?.value;
  if (componentMode == 'vue-component') {
    vueComponent.form.start();
  }
};

export default controller;
