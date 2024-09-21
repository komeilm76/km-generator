declare const _default: {
    form: {
        makeForm: <FIELD extends {
            args: {
                message: string;
                default?: string | undefined;
                required: boolean;
            };
            action: "input";
            key: string;
        } | {
            args: {
                message: string;
                choices: {
                    name: string;
                    value: string;
                }[];
                default?: string | undefined;
            };
            action: "select";
            key: string;
        }>(fields: FIELD[]) => {
            start: () => void;
            formValuesUntilThisStep: import("rxjs").ReplaySubject<import("./form").IResult<string>>;
            finish: import("rxjs").Subject<import("./form").IResult<string>[]>;
        };
        makeFieldsMap: <FIELD_1 extends {
            args: {
                message: string;
                default?: string | undefined;
                required: boolean;
            };
            action: "input";
            key: string;
        } | {
            args: {
                message: string;
                choices: {
                    name: string;
                    value: string;
                }[];
                default?: string | undefined;
            };
            action: "select";
            key: string;
        }>(fields: FIELD_1[]) => FIELD_1[];
    };
    node: {
        makeNodes: <NODEINFO extends import("./node").INodeInfo>(nodesInfo: NODEINFO[], root: import("fs-jetpack/types").FSJetpack, clean: boolean) => void;
        prettyJson: (data: Object, space: number) => string;
        makeNodeMap: <NODEINFO_1 extends import("./node").INodeInfo>(nodesInfo: NODEINFO_1[]) => NODEINFO_1[];
    };
};
export default _default;
