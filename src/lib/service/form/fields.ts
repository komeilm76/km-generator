import { input, confirm, select } from '@inquirer/prompts';
import { z } from 'zod';

const inputField = {
  schema: () => {
    return z.object({
      args: z.object({
        message: z.string(),
        default: z.string().optional(),
        required: z.boolean(),
      }),
      action: z.literal('input'),
      key: z.string(),
    });
  },
  method: input,
};

const confirmField = {
  schema: () => {
    return z.object({
      args: z.object({
        message: z.string(),
        default: z.string().optional(),
      }),
      action: z.literal('confirm'),
      key: z.string(),
    });
  },
  method: confirm,
};

const selectField = {
  schema: () => {
    return z.object({
      args: z.object({
        message: z.string(),
        default: z.string().optional(),
        choices: z
          .object({
            name: z.string(),
            value: z.string(),
            description: z.string().or(z.undefined()),
          })
          .array(),
      }),
      action: z.literal('select'),
      key: z.string(),
    });
  },
  method: select,
};

export default {
  input: inputField,
  confirm: confirmField,
  select: selectField,
};
