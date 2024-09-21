import { FSJetpack } from 'fs-jetpack/types';
import { z } from 'zod';
export declare const packageJsonSchema: z.ZodObject<{
    name: z.ZodString;
    author: z.ZodObject<{
        email: z.ZodString;
        name: z.ZodString;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        url: string;
        email: string;
    }, {
        name: string;
        url: string;
        email: string;
    }>;
    version: z.ZodString;
    description: z.ZodString;
    main: z.ZodString;
    module: z.ZodString;
    types: z.ZodString;
    scripts: z.ZodRecord<z.ZodString, z.ZodString>;
    files: z.ZodArray<z.ZodString, "many">;
    devDependencies: z.ZodRecord<z.ZodString, z.ZodString>;
    dependencies: z.ZodRecord<z.ZodString, z.ZodString>;
    categories: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    module: string;
    description: string;
    author: {
        name: string;
        url: string;
        email: string;
    };
    version: string;
    main: string;
    types: string;
    scripts: Record<string, string>;
    files: string[];
    devDependencies: Record<string, string>;
    dependencies: Record<string, string>;
    categories: string[];
}, {
    name: string;
    module: string;
    description: string;
    author: {
        name: string;
        url: string;
        email: string;
    };
    version: string;
    main: string;
    types: string;
    scripts: Record<string, string>;
    files: string[];
    devDependencies: Record<string, string>;
    dependencies: Record<string, string>;
    categories: string[];
}>;
export type IFileInfo = {
    type: 'file';
    name: string;
    content?: string;
};
export type INodeInfo = IFileInfo | IDirectoryInfo;
export type IDirectoryInfo = {
    type: 'directory';
    name: string;
    children?: INodeInfo[];
};
declare const _default: {
    makeNodes: <NODEINFO extends INodeInfo>(nodesInfo: NODEINFO[], root: FSJetpack, clean: boolean) => void;
    prettyJson: (data: Object, space: number) => string;
    makeNodeMap: <NODEINFO_1 extends INodeInfo>(nodesInfo: NODEINFO_1[]) => NODEINFO_1[];
};
export default _default;
