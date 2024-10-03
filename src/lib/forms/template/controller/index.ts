import simpleGit from 'simple-git';
import { IResult } from '../../../service/form';
import jetpack from 'fs-jetpack';
import _ from 'lodash';
const controller = (result: IResult[]) => {
  let projectName = result.find((item) => {
    return item.key == 'project-name';
  })?.value;
  let projectTemplate = result.find((item) => {
    return item.key == 'project-template';
  })?.value;
  let projectDescription = result.find((item) => {
    return item.key == 'project-description';
  })?.value;

  let projectRepository = result.find((item) => {
    return item.key == 'project-repository';
  })?.value;

  let gitRepository = `https://github.com/komeilm76/${projectTemplate}.git`;
  let localRepository = `./${projectName}`;

  simpleGit()
    .clone(gitRepository, localRepository)
    .then((res) => {
      console.log('item cloned');
      let repository = jetpack.cwd(`./${projectName}`);
      let packageJson = repository.path('package.json');
      repository.readAsync(packageJson, 'json').then((res) => {
        let fileData = res;
        fileData.name = projectName;
        fileData.description = projectDescription;
        fileData = _.omit(fileData, ['homepage']);
        if (projectRepository) {
          fileData.repository = {
            url: projectRepository,
          };
        } else {
          fileData = _.omit(fileData, ['repository']);
        }
        repository.writeAsync(packageJson, fileData);
      });

      let readmeFile = repository.path('README.md');
      repository.writeAsync(readmeFile, `# ${projectName}\nDescription:${projectDescription}`);

      let packageLockJson = repository.path('package-lock.json');
      repository.remove(packageLockJson);

      let gitInitFolder = repository.path('.git');
      repository.remove(gitInitFolder);

      let changeLogFile = repository.path('CHANGELOG.md');
      repository.remove(changeLogFile);

      let releaseIt = repository.path('.release-it.json');
      repository.readAsync(releaseIt, 'json').then((res) => {
        let fileData = res;
        if (projectTemplate == 'package-template-starter') {
          fileData.npm.publish = true;
        } else {
          fileData.npm.publish = false;
        }
      });
    });
};

export default controller;
