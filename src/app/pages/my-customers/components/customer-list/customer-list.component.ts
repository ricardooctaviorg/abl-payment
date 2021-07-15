import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll, IonRefresher } from '@ionic/angular';
import { Customer } from '../../../../commons/interfaces/customer';
import { StorageService } from '../../../../commons/services/storage.service';
import { CustomerService } from '../../../../services/customer.service';

const PAGE_SIZE       = 10;
const ORDER           = "name,-1";

const AVATAR_MALE     = "https://www.gravatar.com/userimage/198148610/9557a41195e40455d045b52ec8107418?size=120";
const AVATAR_FEMALE   = "https://www.gravatar.com/userimage/198148610/0da9921b30af847359c2e2d61169e484?size=120";

const MORNING         = "morning";
const AFTERNOON       = "afternoon";

const EMPTY_MORNING   = "empty_morning";
const EMPTY_AFTERNOON = "empty_afternoon";

const SUCCESS_TRUE  = true;
const SUCCESS_FALSE = false;

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll  : IonInfiniteScroll;
  @ViewChild(IonRefresher)      ionRefresher    : IonRefresher;

  customer                : Customer;
  customers               : Customer[]  = new Array();
  customersCurrent        : Customer[]  = new Array();
  
  dataResponse            : any;
  pageData                : any;
  pageCurrent             : number      = 1;

  countMorning            : number      = 0;
  countAfternoon          : number      = 0;

  showStatusTitle         : string      = "";
  isEmptyList             : string      = "";

  statusArray             : string[];
  scheduleArray           : string[];

  avatarMale              : string      = AVATAR_MALE;
  avatarFemale            : string      = AVATAR_FEMALE;
  
  constructor(private storageService      : StorageService
                , private customerService : CustomerService
                , private route           : ActivatedRoute) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(
      params => {

        const status    : string  = String(params.get("status"));
        const schedule  : string  = String(params.get("schedule"));
        
        this.statusArray          = status.split(","); 
        this.scheduleArray        = schedule.split(",");
          
        this.cleanCustomers();
        this.consumeData(this.statusArray, this.scheduleArray, String(this.pageCurrent), String(PAGE_SIZE), ORDER);
      }
    );
  }

  private consumeData(
    status          : string[]
    , schedule      : string[]
    , page          : string
    , size          : string
    , sort          : string): void {
    this.customerService.getCostomers(status, schedule, page, size, sort)
      .subscribe(
        data => 
        {
          if (data.success) {
            //this.infoManagementService.sendStatusTitle(statusId[0]);
            if( data.count == 0 )
              if ( schedule[0] == MORNING )
                this.isEmptyList = EMPTY_MORNING;
              else if ( schedule[0] == AFTERNOON )
                this.isEmptyList = EMPTY_AFTERNOON;

            this.customersCurrent = data.customers as Customer[];
            this.customers.push(... this.customersCurrent);
            this.storageService.setCustomers(this.customers);
            this.pageData = data.page;
            
            /*this.deliveryManagementService.countAllStatus(startDate, endDate).subscribe(
              data => this.infoManagementService.sendCountAllStatus(data)
            );*/
          }
        }
      );
  }

  loadData(event) {
    setTimeout(() => {
      this.pageCurrent++;
      this.consumeData(this.statusArray, this.scheduleArray, String(this.pageCurrent), String(PAGE_SIZE), ORDER);
      this.infiniteScroll.complete();
    }, 500);
    
  }

  async doRefresh(event) {
    await this.cleanCustomers();    
    setTimeout(() => {
      this.consumeData(this.statusArray, this.scheduleArray, String(this.pageCurrent), String(PAGE_SIZE), ORDER);
      this.ionRefresher.complete();
    }, 1000);
  }

  async cleanCustomers() {
    this.customers              = [];
    this.countMorning           = 0;
    this.countAfternoon         = 0;
    this.pageCurrent            = 1;
    await this.storageService.setCustomers(this.customers);
  }

}
