import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { person } from '../../models/person';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { loginRequest } from '../../models/loginRequest';

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
  constructor(private alertCtrl: AlertController, private dataService: DataServiceProvider) {
    debugger;
    const req: loginRequest = { portalId: '2', oldPassword: 'browns', newPassword: 'new', username: 'jim.brown@browns.com' };
    this.dataService.AuthenticateUser(req).subscribe(response => {
      debugger
      const myProfile = response["entity"];
      this.profile.email = myProfile.email;
      this.profile.fName = myProfile.fName;
      this.profile.lName = myProfile.lName;
      this.profile.personId = myProfile.personId;
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
}
