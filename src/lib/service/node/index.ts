import { FSJetpack } from 'fs-jetpack/types';
import { z } from 'zod';

export const packageJsonSchema = z.object({
  name: z.string(),
  author: z.object({
    email: z.string(),
    name: z.string(),
    url: z.string(),
  }),
  version: z.string(),
  description: z.string(),
  main: z.string(),
  module: z.string(),
  types: z.string(),
  scripts: z.record(z.string(), z.string()),
  files: z.string().array(),
  devDependencies: z.record(z.string(), z.string()),
  dependencies: z.record(z.string(), z.string()),
  categories: z.string().array(),
});

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

const prettyJson = (data: Object, space: number) => {
  let spaceAmount = ' '.repeat(space);
  return JSON.stringify(data, null, spaceAmount);
};

const makeNodeMap = <NODEINFO extends INodeInfo>(nodesInfo: NODEINFO[]) => {
  return nodesInfo;
};

const makeNodes = <NODEINFO extends INodeInfo>(
  nodesInfo: NODEINFO[],
  root: FSJetpack,
  clean: boolean
) => {
  if (clean) {
    root.remove();
  }
  nodesInfo.forEach((item) => {
    if (item.type == 'file') {
      root.file(item.name, { content: item.content });
    }
    if (item.type == 'directory') {
      let dir = root.dir(item.name);
      if (item.children) {
        makeNodes(item.children, dir, clean);
      }
    }
  });
};

export default {
  makeNodes,
  prettyJson,
  makeNodeMap,
};
