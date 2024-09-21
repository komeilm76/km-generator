import service from '../../../service';
const fields = service.form.makeFieldsMap([
    {
        args: {
            message: 'Set A Name For Project:',
            required: true,
        },
        action: 'input',
        key: 'project-name',
    },
    {
        action: 'select',
        args: {
            choices: [
                {
                    name: 'package-template-starter',
                    value: 'package-template-starter',
                },
                {
                    name: 'server-template-starter',
                    value: 'server-template-starter',
                },
            ],
            message: 'Please Select Project Template',
        },
        key: 'project-template',
    },
    {
        action: 'input',
        args: {
            message: 'Add Repository Address:',
            required: false,
            default: undefined,
        },
        key: 'project-repository',
    },
    {
        args: {
            message: 'Write Description For Project:',
            required: false,
            default: '',
        },
        action: 'input',
        key: 'project-description',
    },
]);
export default fields;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2Zvcm1zL3RlbXBsYXRlL2ZpZWxkcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE9BQU8sTUFBTSxrQkFBa0IsQ0FBQztBQUV2QyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUN4QztRQUNFLElBQUksRUFBRTtZQUNKLE9BQU8sRUFBRSx5QkFBeUI7WUFDbEMsUUFBUSxFQUFFLElBQUk7U0FDZjtRQUNELE1BQU0sRUFBRSxPQUFPO1FBQ2YsR0FBRyxFQUFFLGNBQWM7S0FDcEI7SUFDRDtRQUNFLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLElBQUksRUFBRTtZQUNKLE9BQU8sRUFBRTtnQkFDUDtvQkFDRSxJQUFJLEVBQUUsMEJBQTBCO29CQUNoQyxLQUFLLEVBQUUsMEJBQTBCO2lCQUNsQztnQkFDRDtvQkFDRSxJQUFJLEVBQUUseUJBQXlCO29CQUMvQixLQUFLLEVBQUUseUJBQXlCO2lCQUNqQzthQUNGO1lBQ0QsT0FBTyxFQUFFLGdDQUFnQztTQUMxQztRQUNELEdBQUcsRUFBRSxrQkFBa0I7S0FDeEI7SUFDRDtRQUNFLE1BQU0sRUFBRSxPQUFPO1FBQ2YsSUFBSSxFQUFFO1lBQ0osT0FBTyxFQUFFLHlCQUF5QjtZQUNsQyxRQUFRLEVBQUUsS0FBSztZQUNmLE9BQU8sRUFBRSxTQUFTO1NBQ25CO1FBQ0QsR0FBRyxFQUFFLG9CQUFvQjtLQUMxQjtJQUNEO1FBQ0UsSUFBSSxFQUFFO1lBQ0osT0FBTyxFQUFFLGdDQUFnQztZQUN6QyxRQUFRLEVBQUUsS0FBSztZQUNmLE9BQU8sRUFBRSxFQUFFO1NBQ1o7UUFDRCxNQUFNLEVBQUUsT0FBTztRQUNmLEdBQUcsRUFBRSxxQkFBcUI7S0FDM0I7Q0FDRixDQUFDLENBQUM7QUFFSCxlQUFlLE1BQU0sQ0FBQyJ9