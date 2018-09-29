import { Component } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';
import { person } from '../../models/person';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { loginRequest } from '../../models/loginRequest';
import { LocalStorageServiceProvider } from '../../providers/local-storage-service/local-storage-service';

@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {
  profile: person = {
    photoURL: '',
    fName: '',
    email: '',
    lName: '',
    personId: ''
  };
  loader: any;
  constructor(private alertCtrl: AlertController, private dataService: DataServiceProvider, private storage: LocalStorageServiceProvider, private loadingCtrl: LoadingController) {
    this.presentLoading();
    const req: loginRequest = { portalId: '2', oldPassword: 'browns', newPassword: 'new', username: 'jim.brown@browns.com' };
    this.dataService.AuthenticateUser(req).subscribe(response => {
      const myProfile = response["entity"];
      this.profile.email = myProfile.email;
      this.profile.fName = myProfile.fName;
      this.profile.lName = myProfile.lName;
      this.profile.personId = myProfile.personId;
      this.storage.set('Profile', this.profile);
      this.loader.dismiss();
    });

  }

  changePassword() {
    this.presentAlert('', 'Navigate to change password', 'OK')
  }
  logout() {
    this.presentConfirm('', 'Navigate to logout')
  }
  presentAlert(title, subTitle, buttonname) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [buttonname]
    });
    alert.present();
  }
  presentConfirm(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Logout',
          handler: () => {
            console.log('Logout clicked');
          }
        }
      ]
    });
    alert.present();
  }
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    this.loader.present();
  }
}
