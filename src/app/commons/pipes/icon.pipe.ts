import { Pipe, PipeTransform } from '@angular/core';
import { ScheduleType } from '../enums/schedule-type.enum';

@Pipe({
  name: 'icon'
})
export class IconPipe implements PipeTransform {

  transform(value: string): string {
    let response: string;
    switch(value){
      case ScheduleType.MORNING.toString():
        response = 'sunny';
      break;
      case ScheduleType.AFTERNOON.toString():
        response = 'moon';
      break;

    }
    return response;
  }

}