import form, { IResult } from '../service/form';
import template from './template';

const forms = {
  template,
};

const mainForm = form.makeForm([
  {
    action: 'select',
    args: {
      choices: [
        {
          name: 'Template Form',
          value: 'template',
          description: 'Select Template For Project You Want Start',
        },
      ],
      message: 'Select Form',
    },
    key: 'form',
  },
]);

const controller = (result: IResult[]) => {
  let selectedFormName = result[0].value as keyof typeof forms;
  const selectedForm = forms[selectedFormName].form;
  selectedForm.start();
};

mainForm.finish.subscribe((observer) => {
  controller(observer);
});

export default {
  forms: {
    template,
  },
  mainForm,
};
