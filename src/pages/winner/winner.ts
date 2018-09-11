import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ContactDetailsPage } from '../contact-details/contact-details';


@Component({
  selector: 'page-winner',
  templateUrl: 'winner.html',
})
export class WinnerPage {

  events: any[];

  constructor(public navCtrl: NavController, private http: HttpClient,public modalCtrl: ModalController) {
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
    let modal = this.modalCtrl.create(ContactDetailsPage);
    modal.present({
      ev: event
    });
  }
}
