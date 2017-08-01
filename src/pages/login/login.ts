import { Component } from '@angular/core';
import {
  NavController,
  ModalController,
  LoadingController,
  Loading,
  ToastController,
  ViewController,
} from 'ionic-angular';
import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
import { BehaviorSubject } from 'rxjs';
import { SignupPage } from '../../pages/signup/signup';
import { TabsPage } from '../../pages/tabs/tabs';
import { User } from "../../model/user";
import { AuthService } from "../../providers/auth-service";
import { AbstractBasePage } from '../abstract-base';
import { Oauth } from 'ng2-cordova-oauth/oauth';
import { OAuthProvider } from 'ng2-cordova-oauth/provider';
// import { HTTP } from '@ionic-native/http';
import get from 'lodash.get';


declare var window:any;
const GitHubInfo = {
  clientId: '206291f7e64e11f8c05e',
  clientSecret: '69d7c1b38d0472cbbb4757a0db70e7dd26ebf663',
  state: 'randomstring',
};
class GitHub extends OAuthProvider {
    protected authUrl: string = 'https://github.com/login/oauth/authorize';
    protected defaults: Object = {
      responseType: 'code'
    };
} 

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})

export class LoginPage extends AbstractBasePage {

    user: User = User.createBlank();
    githubProvider: GitHub = new GitHub({
        clientId: GitHubInfo.clientId,
        appScope: ['user:email'],
        state: GitHubInfo.state,
    });
    // user: BehaviorSubject<User>;

    constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public viewCtrl: ViewController,
              private authService: AuthService,
              private oauth: Oauth,
            //   private http: HTTP
                ) {
        super(navCtrl, loadingCtrl, toastCtrl);
        // this.user = new BehaviorSubject<User>(null);
        // this.af.auth.subscribe(authState => this.user.next(this.fromAuthState(authState)));
        // this.provider = new firebase.auth.GithubAuthProvider();
        // this.provider.addScope('user:email');
        
    }

    logIn(user): void {
        this.showLoading();
        this.authService.logIn(user).then(_ => {
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

    logInWithGithub() {
        this.showLoading();
        console.log('cl id', GitHubInfo.clientId)
        console.log('cl sct', GitHubInfo.clientSecret)
        console.log('state', GitHubInfo.state)
        console.log('gb prov', this.githubProvider)

        
        this.oauth.logInVia(this.githubProvider).then(response => {
            console.log('rs...', response)
            console.log('rs code...', get(response, 'code'))
        //     let url = "https://github.com/login/oauth/access_token"+ GitHubInfo.clientId + "&" + GitHubInfo.clientSecret +
        //     "&" + get(response, 'code');
        //     console.log('url...',url);
        //     // window.cordovaHTTP.post('https://github.com/login/oauth/access_token', { client_id: GitHubInfo.clientId,
        //     // client_secret: GitHubInfo.clientSecret,
        //     // code: get(response, 'code'),
        //     // state: GitHubInfo.state,
        //     this.http.post(url, {},{});

        // }, {
        //     Accept: 'application/json',
        // },
        //     response => {
        //     const data = JSON.parse(response.data);
        //     const credential = firebase.auth.GithubAuthProvider.
        //     credential(data.access_token);
        //     this.authService.logInWithCredential(credential, AuthProviders.
        //     Github)
        //         .then(_ => {
        //             this.hideLoading();
        //             this.dismiss();
        //         }).catch(error => {
        //             this.hideLoading();
        //             this.showError(error);
        //         }); 
        //     },
        //     response => {
        //         this.hideLoading();
        //         this.showError({
        //         message: response.error,
        //     });
        //     });
        }, error => {
            this.hideLoading();
            this.showError(error);
        }); 
    }


    // logInWithGithub() {
    //     this.showLoading();
    //     firebase.auth().signInWithRedirect(this.provider);
    //     firebase.auth().getRedirectResult().then(function(result) {
    //         console.log('result: ',result);
    //         if (result.credential) {
    //             var token = result.credential.accessToken;
    //         }
    //         var user = result.user;
    //         console.log('user'+user)

    //         firebase.database().ref('/userProfile').child(user.uid).set({
    //             firstName: user.displayName.split(' ')[0],
    //             lastName:  user.displayName.split(' ')[1],
    //             email: user.email,
    //             profilePic: user.photoURL,
    //         });

    //     }).catch(function(error) {
    //         var errorMessage = error.message;
    //         console.log('Error: ', errorMessage);
    //     });
    // }

    // fromAuthState(authState: FirebaseAuthState): User {
    //      if (authState) {
    //          if (authState.provider == AuthProviders.Password)  {
    //              console.log('password provider');
    //              const user = authState.auth;
    //              // return new User(authState.uid, user.displayName || user.email,
    //              // user.email, '');
    //          } else if (authState.provider in providers) {
    //              const user = authState[providers[authState.provider]] as
    //              firebase.UserInfo;
    //              console.log('a: '+authState.provider)
    //              console.log('b: '+providers[authState.provider])
    //              console.log('c: '+authState[providers[authState.provider]])
    //              console.log('d: '+user)
    //              // console.log(user.providerId + ' ' + user.photoURL + '' + authState.uid + ' ' + user.email)
    //              firebase.database().ref('/userProfile').child(authState.uid).set({
    //                  firstName: user.displayName.split(' ')[0],
    //                  lastName:  user.displayName.split(' ')[1],
    //                  email: user.email,
    //                  profilePic: user.photoURL,
    //              });
 
    //              return new User(authState.uid, user.displayName, user.email, '',
    //              user.photoURL);
    //          } 
    //      }
    //      return null;
    //  }

}