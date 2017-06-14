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

    logIn(): void {
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