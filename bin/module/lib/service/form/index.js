import { ReplaySubject, Subject } from 'rxjs';
import { input, select } from '@inquirer/prompts';
const field = (field) => {
    let result = new Subject();
    let call = new Subject();
    call.subscribe((observer) => {
        let selectedMethod = undefined;
        if (field.action == 'input') {
            selectedMethod = input;
        }
        else if (field.action == 'select') {
            selectedMethod = select;
        }
        if (selectedMethod) {
            selectedMethod(field.args).then((res) => {
                result.next({ key: field.key, value: res });
            });
        }
    });
    return {
        result,
        call,
    };
};
const makeFieldsMap = (fields) => {
    return fields;
};
const makeForm = (fields) => {
    const step = new Subject();
    const formValuesUntilThisStep = new ReplaySubject(fields.length);
    const completedFields = new Subject();
    let finish = new Subject();
    step.subscribe({
        next: (stepObserver) => {
            let item = fields.find((item, index) => {
                return index == stepObserver;
            });
            if (item) {
                let request = field(item);
                request.call.next();
                request.result.subscribe((resultObserver) => {
                    formValuesUntilThisStep.next(resultObserver);
                    if (stepObserver + 1 === fields.length) {
                        step.complete();
                    }
                    step.next(stepObserver + 1);
                });
            }
        },
        complete: () => {
            completedFields.next();
        },
    });
    return {
        start: () => {
            step.next(0);
            let values = [];
            formValuesUntilThisStep.subscribe((observer) => {
                values.push(observer);
            });
            completedFields.subscribe((observer) => {
                finish.next(values);
            });
        },
        formValuesUntilThisStep,
        finish,
    };
};
export default {
    makeForm,
    makeFieldsMap,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL3NlcnZpY2UvZm9ybS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBOEJsRCxNQUFNLEtBQUssR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO0lBQzlCLElBQUksTUFBTSxHQUFHLElBQUksT0FBTyxFQUEwQixDQUFDO0lBQ25ELElBQUksSUFBSSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7SUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQzFCLElBQUksY0FBYyxHQUE2QyxTQUFTLENBQUM7UUFDekUsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLE9BQU8sRUFBRTtZQUMzQixjQUFjLEdBQUcsS0FBSyxDQUFDO1NBQ3hCO2FBQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLFFBQVEsRUFBRTtZQUNuQyxjQUFjLEdBQUcsTUFBTSxDQUFDO1NBQ3pCO1FBQ0QsSUFBSSxjQUFjLEVBQUU7WUFDbEIsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtnQkFDbEQsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQzlDLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU87UUFDTCxNQUFNO1FBQ04sSUFBSTtLQUNMLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixNQUFNLGFBQWEsR0FBRyxDQUF1QixNQUFlLEVBQUUsRUFBRTtJQUM5RCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDLENBQUM7QUFFRixNQUFNLFFBQVEsR0FBRyxDQUF1QixNQUFlLEVBQUUsRUFBRTtJQUN6RCxNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO0lBQ25DLE1BQU0sdUJBQXVCLEdBQUcsSUFBSSxhQUFhLENBQVUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFFLE1BQU0sZUFBZSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7SUFDNUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxPQUFPLEVBQWEsQ0FBQztJQUV0QyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2IsSUFBSSxFQUFFLENBQUMsWUFBWSxFQUFFLEVBQUU7WUFDckIsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDckMsT0FBTyxLQUFLLElBQUksWUFBWSxDQUFDO1lBQy9CLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMxQixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNwQixPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFO29CQUMxQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQzdDLElBQUksWUFBWSxHQUFHLENBQUMsS0FBSyxNQUFNLENBQUMsTUFBTSxFQUFFO3dCQUN0QyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7cUJBQ2pCO29CQUNELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQztRQUNELFFBQVEsRUFBRSxHQUFHLEVBQUU7WUFDYixlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsQ0FBQztLQUNGLENBQUMsQ0FBQztJQUVILE9BQU87UUFDTCxLQUFLLEVBQUUsR0FBRyxFQUFFO1lBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksTUFBTSxHQUFjLEVBQUUsQ0FBQztZQUMzQix1QkFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDN0MsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztZQUVILGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFDRCx1QkFBdUI7UUFDdkIsTUFBTTtLQUNQLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixlQUFlO0lBQ2IsUUFBUTtJQUNSLGFBQWE7Q0FDZCxDQUFDIn0=