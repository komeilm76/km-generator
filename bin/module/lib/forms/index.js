import form from '../service/form';
import template from './template';
const forms = {
    template,
};
const mainForm = form.makeForm([
    {
        action: 'select',
        args: {
            choices: [
                {
                    name: 'Template Form',
                    value: 'template',
                },
            ],
            message: 'Select Form',
        },
        key: 'form',
    },
]);
const controller = (result) => {
    let selectedFormName = result[0].value;
    const selectedForm = forms[selectedFormName].form;
    selectedForm.start();
};
mainForm.finish.subscribe((observer) => {
    controller(observer);
});
export default {
    forms: {
        template,
    },
    mainForm,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2Zvcm1zL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sSUFBaUIsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLFFBQVEsTUFBTSxZQUFZLENBQUM7QUFFbEMsTUFBTSxLQUFLLEdBQUc7SUFDWixRQUFRO0NBQ1QsQ0FBQztBQUVGLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDN0I7UUFDRSxNQUFNLEVBQUUsUUFBUTtRQUNoQixJQUFJLEVBQUU7WUFDSixPQUFPLEVBQUU7Z0JBQ1A7b0JBQ0UsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLEtBQUssRUFBRSxVQUFVO2lCQUNsQjthQUNGO1lBQ0QsT0FBTyxFQUFFLGFBQWE7U0FDdkI7UUFDRCxHQUFHLEVBQUUsTUFBTTtLQUNaO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsTUFBTSxVQUFVLEdBQUcsQ0FBQyxNQUFpQixFQUFFLEVBQUU7SUFDdkMsSUFBSSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBMkIsQ0FBQztJQUM3RCxNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDbEQsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ3ZCLENBQUMsQ0FBQztBQUVGLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7SUFDckMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0FBRUgsZUFBZTtJQUNiLEtBQUssRUFBRTtRQUNMLFFBQVE7S0FDVDtJQUNELFFBQVE7Q0FDVCxDQUFDIn0=