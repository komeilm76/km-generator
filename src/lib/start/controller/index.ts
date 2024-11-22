import _ from 'lodash';
import forms from '../../forms';
import { IResult } from '../../service/form';

const controller = (result: IResult[]) => {
  console.log('result', result);

  let generateFormValue = result.find((item) => {
    return item.key == 'generate-form';
  });

  if (generateFormValue) {
    let form = Object.values(forms).find((item) => {
      return item.form.path == (generateFormValue?.value as string);
    });
    if (form) {
      form.form.start();
    }
  }
};

export default controller;
