import { ReplaySubject, Subject } from 'rxjs';
import { input, select, confirm } from '@inquirer/prompts';
import fields from './fields';
import { z } from 'zod';
import schemas from './schemas';

export type IField = z.infer<typeof schemas>;

export type IResult<KEY extends string = string> = {
  key: KEY;
  value: string | boolean | number;
};

const field = (field: IField) => {
  let result = new Subject<IResult<IField['key']>>();
  let call = new Subject<void>();
  call.subscribe((observer) => {
    let selectedMethod: typeof select | typeof input | typeof confirm | undefined = undefined;
    selectedMethod = fields[field.action as keyof typeof fields].method;

    if (selectedMethod) {
      selectedMethod(field.args as any).then((res: any) => {
        result.next({ key: field.key, value: res });
      });
    }
  });
  return {
    result,
    call,
  };
};

const makeFieldsMap = <FIELD extends IField>(fields: FIELD[]) => {
  return fields;
};

const makeForm = <FIELD extends IField>(path: string, fields: FIELD[]) => {
  const step = new Subject<number>();
  const formValuesUntilThisStep = new ReplaySubject<IResult>(fields.length);
  const completedFields = new Subject<void>();
  let finish = new Subject<IResult[]>();

  step.subscribe({
    next: (stepObserver) => {
      let item = fields.find((item, index) => {
        return index == stepObserver;
      });
      if (item) {
        let request = field(item);
        request.call.next();
        request.result.subscribe((resultObserver) => {
          formValuesUntilThisStep.next(resultObserver);
          if (stepObserver + 1 === fields.length) {
            step.complete();
          }
          step.next(stepObserver + 1);
        });
      }
    },
    complete: () => {
      completedFields.next();
    },
  });

  return {
    path,
    start: () => {
      step.next(0);
      let values: IResult[] = [];
      formValuesUntilThisStep.subscribe((observer) => {
        values.push(observer);
      });

      completedFields.subscribe((observer) => {
        finish.next(values);
      });
    },
    formValuesUntilThisStep,
    finish,
  };
};

export default {
  makeForm,
  makeFieldsMap,
};
