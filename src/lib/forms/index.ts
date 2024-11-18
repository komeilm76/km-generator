import form, { IResult } from '../service/form';
import component from './component';
import template from './template';

const forms = {
  template,
  component
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
        {
          name: 'Component Form',
          value: 'component',
          description: 'Select Component Framework',
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
