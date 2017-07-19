import { Component } from '@angular/core';
import {
  NavController,
  ModalController,
  LoadingController,
  Loading,
  ToastController,
  ViewController,
} from 'ionic-angular';
import { SignupPage } from '../../pages/signup/signup';
import { TabsPage } from '../../pages/tabs/tabs';
import { User } from "../../model/user";
import { AuthService } from "../../providers/auth-service";
import { AbstractBasePage } from '../abstract-base';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})

export class LoginPage extends AbstractBasePage {
    user: User = User.createBlank();

    constructor(public navCtrl: NavController,
                public loadingCtrl: LoadingController,
                public modalCtrl: ModalController,
                public toastCtrl: ToastController,
                public viewCtrl: ViewController,
                private authService: AuthService
                ) {
        super(navCtrl, loadingCtrl, toastCtrl);
    }

    logIn(user): void {
        this.showLoading();
        this.authService.logIn(this.user).then(_ => {
            this.hideLoading();
            this.navCtrl.setRoot(TabsPage);
            // this.dismiss();
        }).catch(error => {
            this.hideLoading();
            this.showError(error);
        });
    }

    logInWithGithub() {
        // this.authService.logInWithGithub();
        this.showLoading();
        this.authService.logInWithGithub().then(_ => {
            this.hideLoading();
            this.navCtrl.setRoot(TabsPage);
            // this.dismiss();
        }).catch(error => {
            this.hideLoading();
            this.showError(error);
        });

        firebase.auth().signInWithRedirect(new firebase.auth.GithubAuthProvider());
        firebase.auth().getRedirectResult().then(function (result) {
            console.log(result);
            if (result.credential) {
                var token = result.credential.accessToken;
            }
            var user = result.user;
            console.log('user'+user)


            firebase.database().ref('/userProfile').child(user.uid).set({
                firstName: user.displayName.split(' ')[0],
                lastName:  user.displayName.split(' ')[1],
                email: user.email,
                profilePic: user.photoURL,
            });


        }).catch(function(error) {
            console.log(error);
        })
    }

    signUp(): void {
        const modal = this.modalCtrl.create(SignupPage);
        modal.onDidDismiss(signedUp => {
            if (signedUp) {
                this.dismiss();
            }
        });
        modal.present();
    }

    dismiss(): void {
        this.viewCtrl.dismiss();
    }

    protected getLoadingMessage(): string {
        return 'Log in...';
    }

    protected getErrorMessage(error: any): string {
        return 'Failed to log in. Please check your email and password';
    }

}