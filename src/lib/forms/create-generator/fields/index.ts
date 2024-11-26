import service from '../../../service';

let fields = service.form.makeFieldsMap([
  {
    action: 'input',
    args: {
      message: 'Set A Name For Generator',
      default: '',
      required: true,
    },
    key: 'generator-name',
  },

  {
    action: 'select',
    args: {
      message: 'Set A Name For Generator',
      default: '',
      choices: [
        {
          name: 'Custom',
          description: 'when you want create new Project In Other Project',
          value: 'custom-projects',
        },
        {
          name: 'For km-generator',
          description: 'When Developer Want Create a New Generator For Core Of km-generator',
          value: 'km-generator-project',
        },
      ],
    },
    key: 'generator-mode',
  },
]);

export default fields;
