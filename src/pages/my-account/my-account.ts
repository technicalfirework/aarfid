import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {
  profile: any;
  constructor(private alertCtrl:AlertController) { }

  ngOnInit() {
    this.profile ={
      photoURL:'',
      displayName:'Navneet',
      email:'test@gmail.com',

    };
  }
  changePassword(){
    this.presentAlert('','Navigate to change password','OK')
  }
  logout(){
    this.presentConfirm('','Navigate to logout')
  }
  presentAlert(title,subTitle,buttonname) {
    let alert = this.alertCtrl.create({
      title:title,
      subTitle: subTitle,
      buttons: [buttonname]
    });
    alert.present();
  }
  presentConfirm(title,message) {
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
