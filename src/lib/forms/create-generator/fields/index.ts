import service from '../../../service';

const fields = service.form.makeFieldsMap([
  {
    action: 'input',
    args: {
      message: 'Set A Name For Generator',
      default: '',
      required: true,
    },
    key: 'generator-name',
  },
]);

export default fields;
