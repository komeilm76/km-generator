declare const _default: {
    form: {
        start: () => void;
        formValuesUntilThisStep: import("rxjs").ReplaySubject<import("../../service/form").IResult<string>>;
        finish: import("rxjs").Subject<import("../../service/form").IResult<string>[]>;
    };
};
export default _default;
