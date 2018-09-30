import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { contacts } from '../../models/contacts';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { LocalStorageServiceProvider } from '../../providers/local-storage-service/local-storage-service';
import { person } from '../../models/person';

@Component({
  selector: 'page-contact-details',
  templateUrl: 'contact-details.html',
})
//rename to send doc
export class ContactDetailsPage {
  contact: contacts = {
    personId: 0,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    transactionDate: '',
    title: '',
    company: '',
    open: false
  };
  files:any[];
  person: person;
  constructor(public navParams: NavParams, public viewCtrl: ViewController, private dataService: DataServiceProvider, private storage: LocalStorageServiceProvider) { }

  close() {
    this.viewCtrl.dismiss();
  }
  ionViewDidEnter() {
    this.storage.get('Profile').then(response => {
      debugger;
      this.person = response;
      this.dataService.getFiles(null,'DOCT012',this.person.personId).subscribe(fileResponse => {
        debugger;
         this.files=fileResponse["entity"]
         this.contact = this.navParams.get('contact');
      })
    })
  }
  // ionViewDidLoad() {
  //   debugger;
    
  //   console.log(this.navParams.get('contact'));
  // }

}
