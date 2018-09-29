import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginRequest } from '../../models/loginRequest';
import { GlobalsService } from '../shared/globalService';
import { person } from '../../models/person';

@Injectable()
export class DataServiceProvider {
  constructor(public http: HttpClient, public global: GlobalsService) {
  }
  public AuthenticateUser(request: loginRequest) {
    return this.http.post<person>(this.global.ApiBase + 'api/person/ValidateAndGetPerson/', request)
  }
  public GetEvents() {
    const getEventURL = this.global.ApiBase + 'api/item/getallevents/' + this.global.PortalId + '/' + this.global.EventListStartDate + '/' + this.global.EventListEndDate;
    debugger;
    return this.http.get(getEventURL);
  }
  public GetVendorEvents(personId: string) {
    const getEventURL = this.global.ApiBase + 'api/item/getallevents/' + personId + '/' + this.global.PortalId
    debugger;
    return this.http.get(getEventURL);
  }
}
