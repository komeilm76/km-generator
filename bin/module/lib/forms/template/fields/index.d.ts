declare const fields: ({
    args: {
        message: string;
        required: true;
        choices?: undefined;
        default?: undefined;
    };
    action: "input";
    key: string;
} | {
    action: "select";
    args: {
        choices: {
            name: string;
            value: string;
        }[];
        message: string;
        required?: undefined;
        default?: undefined;
    };
    key: string;
} | {
    action: "input";
    args: {
        message: string;
        required: false;
        default: undefined;
        choices?: undefined;
    };
    key: string;
} | {
    args: {
        message: string;
        required: false;
        default: string;
        choices?: undefined;
    };
    action: "input";
    key: string;
})[];
export default fields;
