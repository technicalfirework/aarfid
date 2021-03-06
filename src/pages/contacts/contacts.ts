import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { LocalStorageServiceProvider } from '../../providers/local-storage-service/local-storage-service';
import { vendor } from '../../models/vendor';
import { person } from '../../models/person';
import { contacts } from '../../models/contacts';
import { ContactDetailsPage } from '../contact-details/contact-details';
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {
  loader: any;
  vendors: vendor[] = [];
  person: person;
  constructor(private modalCtrl: ModalController, private dataService: DataServiceProvider, private storage: LocalStorageServiceProvider, private loadingCtrl: LoadingController, public navCtrl: NavController, private http: HttpClient) {

  }
  ionViewDidEnter() {
    this.vendors=[];
    this.presentLoading();
    this.storage.get('Profile').then(response => {
      debugger;
      this.person = response;
      this.dataService.GetVisitedPersons(this.person.personId).subscribe(myvendors => {
        this.loader.dismiss();
        myvendors["entity"].forEach(element => {
          const mycontacts: contacts[] = [];
          var cons = element.contactPerson;
          cons.forEach(con => {
            const mycontact: contacts = {
              personId: con.personId,
              firstName: con.firstName,
              lastName: con.lastName,
              phone: con.phone,
              email: con.email,
              transactionDate: con.transactionDate,
              title: con.title,
              company: con.company,
              open: false
            }
            mycontacts.push(mycontact);
          });

          const myEVendor: vendor = {
            readPointId: element.readPointId,
            stationName: element.stationName,
            vendorFirstName: element.vendorFirstName,
            vendorLastName: element.vendorLastName,
            vendorCompany: element.vendorCompany,
            contactPerson: mycontacts,
            open: false
          };
          this.vendors.push(myEVendor);
        });
      });
    })
    // if (!(this.platform.is('core') || this.platform.is('mobileweb'))) {
    //   this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    // }
  }
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    this.loader.present();
  }
  toggleSection(i) {
    this.vendors[i].open = !this.vendors[i].open;
  }

  toggleItem(i, j) {
    this.vendors[i].contactPerson[j].open = !this.vendors[i].contactPerson[j].open;
  }
  presentPopover(event, data) {
    let modal = this.modalCtrl.create(ContactDetailsPage, { 'contact': data });
    modal.present({
      ev: event
    });
  }
}
