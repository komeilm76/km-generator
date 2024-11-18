import chalk from 'chalk';
import service from '../../../service';

const fields = service.form.makeFieldsMap([
  {
    action: 'input',
    args: {
      message: 'Set A Name For Vue Component',
      default: '',
      required: true,
    },
    key: 'component-name',
  },
  {
    action: 'input',
    args: {
      message: 'Set A Prefix For Vue Component',
      default: '',
      required: false,
    },
    key: 'component-prefix',
  },
  {
    action: 'input',
    args: {
      message: 'Set A Suffix For Vue Component',
      default: '',
      required: false,
    },
    key: 'component-suffix',
  },

  {
    action: 'select',
    args: {
      message: 'Select Design',
      default: 'file',
      choices: [
        {
          name: 'File',
          value: 'file',
          description: 'Example: prefix.Name.suffix.format',
        },
        {
          name: 'Folder',
          value: 'folder',
          description: 'Example: prefix.Name.suffix > index.format',
        },
      ],
    },
    key: 'component-design',
  },

  {
    action: 'select',
    args: {
      message: 'Select Script Language',
      default: 'typescript',
      choices: [
        {
          name: chalk.hex('#0376c6')('Typescript'),
          value: 'typescript',
          description: 'Javascript Compiler Language',
        },
        {
          name: chalk.hex('#f7e025')('Javascript'),
          value: 'javascript',
          description: 'Javascript Language',
        },
      ],
    },
    key: 'component-script-language',
  },
  {
    action: 'select',
    args: {
      message: 'Select Style Language',
      default: 'scss',
      choices: [
        {
          name: chalk.hex('#bf4080')('SCSS'),
          value: 'scss',
          description: 'CSS Compiler Style Language',
        },
        {
          name: chalk.hex('#2d53e5')('CSS'),
          value: 'css',
          description: 'CSS Style Language',
        },
      ],
    },
    key: 'component-style-language',
  },
]);

export default fields;
