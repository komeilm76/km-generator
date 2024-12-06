import chalk from 'chalk';
import service from '../../service';

const fields = service.form.makeFieldsMap([
  {
    action: 'select',
    args: {
      choices: [
        {
          name: chalk.hex('#390099').bold('🧩 Create Component'),
          value: 'create-component',
          description: 'Create New Component',
        },
        {
          name: chalk.hex('#9E0059').bold('🌐 Create Service'),
          value: 'create-service',
          description: 'Create New Service',
        },
        {
          name: chalk.hex('#FF0054').bold('🏠 Create Starter Template'),
          value: 'create-template',
          description: 'Create New Starter Template',
        },
        {
          name: chalk.hex('#FF5400').bold('⚙️  Create Generator'),
          value: 'create-generator',
          description: 'Create New Generator',
        },
        {
          name: chalk.hex('#FF5400').bold('📁 Custom Forms'),
          value: 'custom forms',
          description: 'use costom forms in km-generator',
        },
      ],
      message: 'What do You Want to Create?',
    },
    key: 'create-form',
  },
]);

export default fields;
