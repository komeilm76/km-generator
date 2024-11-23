import kmCase from 'km-case';
import _ from 'lodash';

const parsePath = (path: string) => {
  let splitedPath = path.split('/');
  let fileNameAsArray = _.takeRight(splitedPath);
  let directoryPathAsArray = _.dropRight(splitedPath);
  let fileName = fileNameAsArray.join('/');
  let directoryPath = directoryPathAsArray.join('/');
  if (_.isEmpty(directoryPath)) {
    directoryPath = '.';
  }
  let output = {
    name: fileName,
    location: directoryPath,
  };
  return output;
};

const makeFileName = (
  path: string,
  prefix: string | undefined,
  suffix: string | undefined,
  format: string,
  joinSymbol: string,
  fileCase: keyof ReturnType<typeof kmCase.cases> = 'pascal'
) => {
  let { name, location } = parsePath(path);

  name = kmCase[fileCase](name);
  format = _.toLower(format);
  if (_.isEmpty(prefix)) {
    prefix = undefined;
  } else {
    prefix = _.toLower(prefix);
  }
  if (_.isEmpty(suffix)) {
    suffix = undefined;
  } else {
    suffix = _.toLower(suffix);
  }

  let nameScope = [];
  nameScope.push(prefix);
  nameScope.push(name);
  nameScope.push(suffix);
  nameScope = nameScope.filter((item) => {
    return item !== undefined;
  });
  let fileName = nameScope.join(joinSymbol);
  let fullFileName = `${fileName}.${format}`;
  let truePath = _.join([location, fileName], '/');
  let truefullPath = _.join([location, fullFileName], '/');
  return {
    name: fileName,
    fullName: fullFileName,
    format,
    kebabName: _.kebabCase(fileName),
    location,
    path: truePath,
    fullpath: truefullPath,
  };
};

export default {
  makeFileName,
  parsePath,
};
