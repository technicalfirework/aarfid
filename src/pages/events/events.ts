import { Component } from '@angular/core';
import { NavController, Platform, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { LocalStorageServiceProvider } from '../../providers/local-storage-service/local-storage-service';
import { person } from '../../models/person';
import { DataServiceProvider } from '../../providers/data-service/data-service';
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  events: any[];
  person: person;
  loader: any;
  constructor(private dataService: DataServiceProvider, private storage: LocalStorageServiceProvider, private loadingCtrl: LoadingController, private platform: Platform, private screenOrientation: ScreenOrientation, public navCtrl: NavController, private http: HttpClient) {

    debugger;
    this.http.get('assets/information.json').subscribe(data => {
      debugger;
      this.events = data['items'];
    })
  }

  toggleSection(i) {
    this.events[i].open = !this.events[i].open;
  }

  toggleItem(i, j) {
    this.events[i].children[j].open = !this.events[i].children[j].open;
  }
  ionViewDidEnter() {
    this.storage.get('Profile').then(response => {
      debugger;
      this.person = response
      this.dataService.GetVendorEvents(this.person.personId).subscribe(response => {

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
