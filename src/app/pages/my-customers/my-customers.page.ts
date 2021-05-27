import { Component, OnInit } from '@angular/core';
import { ScheduleType } from '../../commons/enums/schedule-type.enum';
import { StatusType } from '../../commons/enums/status-type.enum copy';

const ROUTE_BASE        = "customerList";
const SLASH             = "/";

const SCHEDULE_MORNING    = "morning";
const SCHEDULE_AFTERNOON  = "afternoon";

const STATUS_ACTIVE   = ""
const STATUS_INACTIVE = "";

@Component({
  selector: 'app-my-customers',
  templateUrl: './my-customers.page.html',
  styleUrls: ['./my-customers.page.scss'],
})
export class MyCustomersPage implements OnInit {

  titleMain         : string  = "";
  titleSecondary    : string  = "";

  iconMorning       : string  = ScheduleType.MORNING.toString();
  iconAfternoon     : string  = ScheduleType.AFTERNOON.toString();

  countMorning      : number  = 0;
  countAfternoon    : number  = 0;

  routeMorning      : string  = "";
  routeAfternoon    : string  = "";

  constructor() { }

  ngOnInit() {

    this.routeMorning   = ROUTE_BASE + SLASH + StatusType.ACTIVE_CUSTOMER.toString() + SLASH + ScheduleType.MORNING.toString();
    this.routeAfternoon = ROUTE_BASE + SLASH + StatusType.ACTIVE_CUSTOMER.toString() + SLASH + ScheduleType.AFTERNOON.toString();

  }

}
