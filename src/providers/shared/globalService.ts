import { Injectable } from '@angular/core';
import * as moment from 'moment/moment';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GlobalsService {

    private _portalId = 2;
    private _apiBase = 'http://eventmanage.azurewebsites.net/';
    private _eventListStartDate: Date;
    private _locationId = 1;
    private _readpointId = 1;
    public spinnerSubject = new Subject<Observable<any>>();

    constructor() { }


    get PortalId(): number {
        return this._portalId;
    }

    get LocationId(): number {
        return this._locationId;
    }

    get ReadpointId(): number {
        return this._readpointId;
    }

    get ApiBase(): string {
        return this._apiBase;
    }

    get EventListStartDate(): string {

        return '2017-01-01';
    }

    get EventListEndDate(): string {

        return '2079-12-12';
    }

    get CurrentDate(): Date {

        return moment().toDate();
    }

    convertYorN(value): boolean {
        if (value === 'Y') { return true; }
        if (value === 'N') { return false; }
    }

    convertBooleanToYorN(value: boolean): string {
        if (value === true) { return 'Y'; }
        else if (value === false || value === '' || value === null || value === undefined) { return 'N'; }
    }

    showSpinner(value: boolean): void {
        const result = Observable.of(value);

        this.spinnerSubject.next(result);
    }

}