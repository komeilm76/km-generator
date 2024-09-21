import simpleGit from 'simple-git';
import jetpack from 'fs-jetpack';
import _ from 'lodash';
const controller = (result) => {
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
            fileData = _.omit(fileData, ['homepage']);
            if (projectRepository) {
                fileData.repository = {
                    url: projectRepository,
                };
            }
            else {
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
    });
};
export default controller;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2Zvcm1zL3RlbXBsYXRlL2NvbnRyb2xsZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLE1BQU0sWUFBWSxDQUFDO0FBRW5DLE9BQU8sT0FBTyxNQUFNLFlBQVksQ0FBQztBQUNqQyxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsTUFBTSxVQUFVLEdBQUcsQ0FBQyxNQUFpQixFQUFFLEVBQUU7SUFDdkMsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLEdBQUcsSUFBSSxjQUFjLENBQUM7SUFDcEMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDO0lBQ1YsSUFBSSxlQUFlLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQztJQUN4QyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUM7SUFDVixJQUFJLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUM1QyxPQUFPLElBQUksQ0FBQyxHQUFHLElBQUkscUJBQXFCLENBQUM7SUFDM0MsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDO0lBRVYsSUFBSSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDM0MsT0FBTyxJQUFJLENBQUMsR0FBRyxJQUFJLG9CQUFvQixDQUFDO0lBQzFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQztJQUVWLElBQUksYUFBYSxHQUFHLGdDQUFnQyxlQUFlLE1BQU0sQ0FBQztJQUMxRSxJQUFJLGVBQWUsR0FBRyxLQUFLLFdBQVcsRUFBRSxDQUFDO0lBRXpDLFNBQVMsRUFBRTtTQUNSLEtBQUssQ0FBQyxhQUFhLEVBQUUsZUFBZSxDQUFDO1NBQ3JDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzQixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNqRCxJQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3JELElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQztZQUNuQixRQUFRLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztZQUM1QixRQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksaUJBQWlCLEVBQUU7Z0JBQ3JCLFFBQVEsQ0FBQyxVQUFVLEdBQUc7b0JBQ3BCLEdBQUcsRUFBRSxpQkFBaUI7aUJBQ3ZCLENBQUM7YUFDSDtpQkFBTTtnQkFDTCxRQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2FBQzdDO1lBQ0QsVUFBVSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLFVBQVUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzlDLFVBQVUsQ0FBQyxVQUFVLENBQ25CLFVBQVUsRUFDVixLQUFLLFdBQVcsaUJBQWlCLGtCQUFrQixFQUFFLENBQ3RELENBQUM7UUFFRixJQUFJLGVBQWUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDM0QsVUFBVSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUVuQyxJQUFJLGFBQWEsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLFVBQVUsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFakMsSUFBSSxhQUFhLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNwRCxVQUFVLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDO0FBRUYsZUFBZSxVQUFVLENBQUMifQ==