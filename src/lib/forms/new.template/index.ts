import service from '../../service';
import controller from './controller';
import fields from './fields';

const form = service.form.makeForm('new-template', fields);

form.finish.subscribe((observer) => {
  controller(observer);
});
export default {
  form,
};
