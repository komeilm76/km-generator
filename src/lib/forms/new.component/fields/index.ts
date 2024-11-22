import chalk from 'chalk';
import service from '../../../service';

const fields = service.form.makeFieldsMap([
  {
    action: 'select',
    args: {
      choices: [
        {
          name: chalk.hex('#43d195')('Vue'),
          value: 'vue-component',
          description: 'This Component maked for Default Vue Component in .vue Format',
        },
        // {
        //   name: chalk.hex('#58c4dc')('React'),
        //   value: 'react-component',
        //   description: 'This Component maked for Default Vue Component in .vue Format',
        // },
        // {
        //   name: chalk.hex('#f0095c')('Angular'),
        //   value: 'angular-component',
        //   description: 'This Component maked for Default Vue Component in .vue Format',
        // },
      ],
      message: 'Please Select Component Mode',
    },
    key: 'component-mode',
  },
]);

export default fields;
