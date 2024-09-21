import service from '../../../service';

const fields = service.form.makeFieldsMap([
  {
    args: {
      message: 'Set A Name For Project:',
      required: true,
    },
    action: 'input',
    key: 'project-name',
  },
  {
    action: 'select',
    args: {
      choices: [
        {
          name: 'package-template-starter',
          value: 'package-template-starter',
        },
        {
          name: 'server-template-starter',
          value: 'server-template-starter',
        },
      ],
      message: 'Please Select Project Template',
    },
    key: 'project-template',
  },
  {
    action: 'input',
    args: {
      message: 'Add Repository Address:',
      required: false,
      default: undefined,
    },
    key: 'project-repository',
  },
  {
    args: {
      message: 'Write Description For Project:',
      required: false,
      default: '',
    },
    action: 'input',
    key: 'project-description',
  },
]);

export default fields;
