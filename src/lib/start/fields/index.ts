import chalk from 'chalk';
import service from '../../service';

const fields = service.form.makeFieldsMap([
  {
    action: 'select',
    args: {
      choices: [
        {
          name: chalk.hex('#83c255')('New Component'),
          value: 'new-component',
          description: 'Generate New Component',
        },
        {
          name: chalk.hex('#ffc131')('New Service'),
          value: 'new-service',
          description: 'Generate New Service',
        },
        {
          name: chalk.hex('#ff5754')('New Starter Template'),
          value: 'new-template',
          description: 'Generate New Starter Template',
        },
        {
          name: chalk.hex('#e76c8f')('⚙️  New Generator'),
          value: 'new-generator',
          description: 'Create New Generator',
        },
      ],
      message: 'What do You Want ?',
    },
    key: 'generate-form',
  },
]);

export default fields;
