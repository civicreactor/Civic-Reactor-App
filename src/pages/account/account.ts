import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';

import { AngularFire } from 'angularfire2';
import * as firebase from 'firebase';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  public userProfile: any;

  constructor(public alertCtrl: AlertController, public nav: NavController, public authService: AuthService, 
              public userData: UserData, public af: AngularFire) {}

  ionViewDidEnter(){
    this.userData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
    });
  }

  updateFirstName() {
    let alert = this.alertCtrl.create({
      message: "Your first name",
      inputs: [
        {
          name: 'firstName',
          placeholder: 'Your first name',
          value: this.userProfile.firstName
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.userData.updateFirstName(data.firstName);
          }
        }
      ]
    });
    alert.present();
  }

  updateLastName() {
    let alert = this.alertCtrl.create({
      message: "Your last name",
      inputs: [
        {
          name: 'lastName',
          placeholder: 'Your last name',
          value: this.userProfile.lastName
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.userData.updateLastName(data.lastName);
          }
        }
      ]
    });
    alert.present();
  }

  updateEmail() {
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'newEmail',
          placeholder: 'Your new email',
        },
        {
          name: 'password',
          placeholder: 'Your password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.userData.updateEmail(data.newEmail, data.password);
          }
        }
      ]
    });
    alert.present();
  }

  updatePassword() {
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'newPassword',
          placeholder: 'Your new password',
          type: 'password'
        },
        {
          name: 'oldPassword',
          placeholder: 'Your old password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.userData.updatePassword(data.newPassword, data.oldPassword);
          }
        }
      ]
    });
    alert.present();
  }

  updateImageURL() {
    let alert = this.alertCtrl.create({
      message: "Your image URL",
      inputs: [
        {
          name: 'profilePic',
          placeholder: 'Your image URL',
          value: this.userProfile.profilePic
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.userData.updateImageURL(data.profilePic);
          }
        }
      ]
    });
    alert.present();
  }


  logoutUser() {
    this.authService.logOut();
    this.nav.push(TabsPage);
  }

}
