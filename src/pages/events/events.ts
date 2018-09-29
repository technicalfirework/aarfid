import { Component } from '@angular/core';
import { NavController, Platform, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { LocalStorageServiceProvider } from '../../providers/local-storage-service/local-storage-service';
import { person } from '../../models/person';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { events } from '../../models/events';
import { readpoints } from '../../models/readpoints';
import { elementAt } from 'rxjs/operator/elementAt';
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  person: person;
  loader: any;
  allevents: any[] = [];
  vendorevents: any[] = [];
  myEvents: events[] = [];
  constructor(private dataService: DataServiceProvider, private storage: LocalStorageServiceProvider, private loadingCtrl: LoadingController, private platform: Platform, private screenOrientation: ScreenOrientation, public navCtrl: NavController, private http: HttpClient) {
  }

  toggleSection(i, item) {
    debugger
    if (item.readPoints.length > 0)
      this.myEvents[i].open = !this.myEvents[i].open;
  }

  toggleItem(i, j) {
    debugger
    this.myEvents[i].readPoints[j].open = !this.myEvents[i].readPoints[j].open;
  }
  ionViewDidEnter() {
    this.presentLoading();
    this.storage.get('Profile').then(response => {
      debugger;
      this.person = response;
      this.dataService.GetEvents().subscribe(allEvent => {
        this.allevents = allEvent["entity"];
        this.dataService.GetVendorEvents(this.person.personId).subscribe(vendrEvents => {
          this.loader.dismiss();
          this.vendorevents = vendrEvents["entity"];
          var eventsIds = this.vendorevents.map(item => item.eventId)
          this.allevents.forEach(event => {
            debugger;
            const rps: readpoints[] = [];
            if (eventsIds.filter(q => q == event.eventId).length > 0) {
              this.vendorevents.filter(q => q.eventId == event.eventId)[0].readPoints.forEach(rp => {
                const myrp: readpoints = {
                  isRaffle: rp.isRaffle,
                  isCheckpoint: rp.isCheckpoint,
                  readPointId: rp.readPointId,
                  code: rp.code,
                  description: rp.description,
                  name: rp.name,
                  open: false
                };
                rps.push(myrp)
              });
            }
            const myEvent: events = {
              eventId: event.eventId,
              eventName: event.eventName,
              eventStartDate: event.eventStartDate,
              eventEndDate: event.eventEndDate,
              eventDescription: event.eventDescription,
              eventCode: event.eventCode,
              status: event.status,
              portalId: event.portalId,
              stationCount: event.stationCount,
              personCount: event.personCount,
              readPoints: rps,
              open: false
            }
            this.myEvents.push(myEvent)
          });
          debugger;
        })

      });
    })
    // if (!(this.platform.is('core') || this.platform.is('mobileweb'))) {
    //   this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    // }
  }
  ionViewWillLeave() {
    // if (!(this.platform.is('core') || this.platform.is('mobileweb'))) {
    //   this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    // }
  }
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    this.loader.present();
  }
}
