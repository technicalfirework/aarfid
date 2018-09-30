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
    return this.http.get(getEventURL);
  }
  public GetVendorEvents(personId: string) {
    const getEventURL = this.global.ApiBase + 'api/person/GetVendorEvents/' + personId + '/' + this.global.PortalId
    return this.http.get(getEventURL);
  }
  public GetVisitedPersons(personId: string) {
    const getEventURL = this.global.ApiBase + 'api/readpoint/GetVisitedPersons/' + personId
    return this.http.get(getEventURL);
  }
  public GetRaffleWinners(personId: string) {
    const getEventURL = this.global.ApiBase + 'api/item/GetRaffleWinners/' + personId
    return this.http.get(getEventURL);
  }
  //Check Option for localstorage
  public getFiles(fileId: number, docType: string, personId: string) {
    const getFilesURL = this.global.ApiBase + 'api/Person/GetFiles/' + fileId + '/' + this.global.PortalId + '/' + docType + '/' + personId;
    return this.http.get(getFilesURL);
  }
}
