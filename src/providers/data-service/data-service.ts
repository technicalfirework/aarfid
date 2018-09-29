import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginRequest } from '../../models/loginRequest';
import { GlobalsService } from '../shared/globalService';
import { person } from '../../models/person';

@Injectable()
export class DataServiceProvider {
  constructor(public http: HttpClient, public globalsService: GlobalsService) {
  }
  public AuthenticateUser(request: loginRequest) {
    return this.http.post<person>(this.globalsService.ApiBase + 'api/person/ValidateAndGetPerson/', request)
  }
}
