import { Component } from '@angular/core';
import { ViewController, NavParams, ToastController } from 'ionic-angular';
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
  files: any[];
  selectedFileIds: number[] = [];
  person: person;
  notes: string = '';
  toast: any;
  constructor(private toastCtrl: ToastController, private navParams: NavParams, private viewCtrl: ViewController, private dataService: DataServiceProvider, private storage: LocalStorageServiceProvider) { }

  close() {
    this.viewCtrl.dismiss();
  }
  presentToast(message, status) {
    this.toast = this.toastCtrl.create({
      cssClass: status == 0 ? 'success' : 'error',
      message: message,
      duration: 30000,
      position: 'top'
    });

    this.toast.onDidDismiss(() => {
      this.viewCtrl.dismiss();
      console.log('Dismissed toast');
    });

    this.toast.present();
  }
  ionViewDidEnter() {
    this.storage.get('Profile').then(response => {
      debugger;
      this.person = response;
      this.dataService.getFiles(null, 'DOCT012', this.person.personId).subscribe(fileResponse => {
        debugger;
        this.files = fileResponse["entity"]
        this.contact = this.navParams.get('contact');
      })
    })
  }
  fileChange(checkBox, item) {
    debugger;
    if (checkBox.checked) {
      this.selectedFileIds.push(item.fileId);
    } else {
      var index = this.selectedFileIds.indexOf(item.fileId);
      if (index > -1) {
        this.selectedFileIds.splice(index, 1);
      }
    }
  }
  Send() {
    this.dataService.SendDocumentsToParticipants(this.person.personId, this.contact.personId, this.selectedFileIds).subscribe(resp => {
      this.presentToast('Sent Successfully', 0)
    },error=>{
      this.presentToast('Error Occured ', 1)
    });
  }
  // ionViewDidLoad() {
  //   debugger;

  //   console.log(this.navParams.get('contact'));
  // }

}
