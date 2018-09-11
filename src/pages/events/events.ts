import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  events: any[];

  constructor(private platform: Platform, private screenOrientation: ScreenOrientation, public navCtrl: NavController, private http: HttpClient) {
    console.log(this.screenOrientation.type)
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
    if (!(this.platform.is('core') || this.platform.is('mobileweb'))) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }
  }
  ionViewWillLeave(){
    if (!(this.platform.is('core') || this.platform.is('mobileweb'))) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
  }
}
