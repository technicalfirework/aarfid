import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginRequest } from '../../models/loginRequest';
/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataServiceProvider {
apiUrl='http://eventmanage.azurewebsites.net/api/person/ValidateAndGetPerson/'
  constructor(public http: HttpClient) {
    console.log('Hello DataServiceProvider Provider');
  }
  public login(request: loginRequest) {

  }
}
