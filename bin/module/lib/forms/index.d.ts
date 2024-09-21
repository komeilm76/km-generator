import { IResult } from '../service/form';
declare const _default: {
    forms: {
        template: {
            form: {
                start: () => void;
                formValuesUntilThisStep: import("rxjs").ReplaySubject<IResult<string>>;
                finish: import("rxjs").Subject<IResult<string>[]>;
            };
        };
    };
    mainForm: {
        start: () => void;
        formValuesUntilThisStep: import("rxjs").ReplaySubject<IResult<string>>;
        finish: import("rxjs").Subject<IResult<string>[]>;
    };
};
export default _default;
