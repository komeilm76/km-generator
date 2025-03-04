import { z } from 'zod';
import fields from './fields';

const fieldsSchema = z.union([
  fields.input.schema(),
  fields.confirm.schema(),
  fields.select.schema(),
]);

export default fieldsSchema;
