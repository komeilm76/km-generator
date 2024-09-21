import { ReplaySubject, Subject } from 'rxjs';
type IField = {
    args: {
        message: string;
        default?: string;
        required: boolean;
    };
    action: 'input';
    key: string;
} | {
    args: {
        message: string;
        choices: {
            name: string;
            value: string;
        }[];
        default?: string;
    };
    action: 'select';
    key: string;
};
export type IResult<KEY extends string = string> = {
    key: KEY;
    value: string;
};
declare const _default: {
    makeForm: <FIELD extends IField>(fields: FIELD[]) => {
        start: () => void;
        formValuesUntilThisStep: ReplaySubject<IResult<string>>;
        finish: Subject<IResult<string>[]>;
    };
    makeFieldsMap: <FIELD_1 extends IField>(fields: FIELD_1[]) => FIELD_1[];
};
export default _default;
