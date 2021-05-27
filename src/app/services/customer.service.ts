import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../commons/services/storage.service';
import { environment } from '../../environments/environment';

const GATEWAY             = environment.gateway;
const RESOURCE_BASE       = environment.customerResource;
const KEY_TOKEN           = environment.keyToken;

const RESOURCE_CREATE     = "/addCustomer";
const RESOURCE_READ       = "/getCustomers";
const RESOURCE_UPDATE     = "/updateCustomer";

const RESOURCE_COUNT      = "/countCustomers";

const ENDPOINT_CREATE 
  = GATEWAY
  + RESOURCE_BASE + RESOURCE_CREATE;

const ENDPOINT_READ 
  = GATEWAY
  + RESOURCE_BASE + RESOURCE_READ;

const ENDPOINT_UPDATE 
  = GATEWAY
  + RESOURCE_BASE + RESOURCE_UPDATE;

const ENDPOINT_COUNT 
  = GATEWAY
  + RESOURCE_BASE + RESOURCE_COUNT;
  
@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  constructor(private httpClient  : HttpClient
    , private storageService      : StorageService) { }

  public getCostomers(
    status      : string[]
    , schedulle : string[]
    , page      : string
    , size      : string
    , sort      : string): Observable<any> {

    const headers = new HttpHeaders()
      .set(KEY_TOKEN, this.storageService.getToken());
    
      const params = new HttpParams()
      .set('status', status.toString())
      .set('schedulle', schedulle.toString())
      .set('page', page)
      .set('size', size)
      .set('sort', sort);

    const httpOptions ={
      headers, params
    };
    return this.httpClient.get<any>(`${ENDPOINT_READ}`, httpOptions);
  }
}
