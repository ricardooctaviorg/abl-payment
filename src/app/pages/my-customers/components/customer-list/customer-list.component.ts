import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonRefresher } from '@ionic/angular';
import { Customer } from '../../../../commons/interfaces/customer';
import { StorageService } from '../../../../commons/services/storage.service';

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

  constructor(private storageService: StorageService) { }

  ngOnInit() {}

  loadData(event) {
    setTimeout(() => {
      //this.pageCurrent++;
      //this.consumeData(this.statusDelivery, this.todayStringInit, this.todayStringEnd, String(this.pageCurrent), String(PAGE_SIZE), ORDERDATE_DESC);
      this.infiniteScroll.complete();
    }, 500);
    
  }

  async doRefresh(event) {
    await this.cleanCustomers();    
    setTimeout(() => {
      //this.consumeData(this.statusDelivery, this.todayStringInit, this.todayStringEnd, String(this.pageCurrent), String(PAGE_SIZE), ORDERDATE_DESC);
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
