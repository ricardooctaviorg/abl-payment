import { Component, OnInit } from '@angular/core';
import { ScheduleType } from '../../commons/enums/schedule-type.enum';

@Component({
  selector: 'app-my-customers',
  templateUrl: './my-customers.page.html',
  styleUrls: ['./my-customers.page.scss'],
})
export class MyCustomersPage implements OnInit {

  titleMain         : string = "";
  titleSecondary    : string = "";

  iconMorning       : string = ScheduleType.MORNING.toString();
  iconAfternoon     : string = ScheduleType.AFTERNOON.toString();

  countMorning      : number = 0;
  countAfternoon    : number = 0;

  constructor() { }

  ngOnInit() {
  }

}
