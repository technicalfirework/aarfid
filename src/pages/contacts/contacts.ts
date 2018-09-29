import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {

  events: any[];

  constructor(public navCtrl: NavController, private http: HttpClient,public popoverCtrl: PopoverController) {
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
  presentPopover(event,data){
    console.log(event)
    console.log(data)
  }
}
