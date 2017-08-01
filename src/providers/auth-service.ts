import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
import { User } from '../model/user';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/startWith';
import * as find from 'lodash.find';
import * as gravatar from 'gravatar';
import * as firebase from 'firebase';

export const providers = {
  [AuthProviders.Google]: 'google',
  [AuthProviders.Twitter]: 'twitter',
  [AuthProviders.Facebook]: 'facebook',
  [AuthProviders.Github]: 'github',
};


@Injectable()
export class AuthService {
    user: BehaviorSubject<User>;
    defaultPic: any;
    provider: any;

    constructor(private af: AngularFire) {
        this.user = new BehaviorSubject<User>(null);
        // this.af.auth.subscribe(authState => this.user.next(this.fromAuthState(authState)));
        this.defaultPic = "http://wearesmile.com/assets/themes/s5/img/logo.png";
        this.provider = new firebase.auth.GithubAuthProvider();
        this.provider.addScope('user:email');
    }

    create(user: User): firebase.Promise<any> {
        return firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then((newUser) => {
            firebase.database().ref('/userProfile').child(newUser.uid).set({
                firstName: user.fName,
                lastName: user.lName,
                email: user.email
            });
        });
    }

    logIn(user: User) {
        return this.af.auth.login(user, {
            provider: AuthProviders.Password,
            method: AuthMethods.Password,
        })
    }

    logInWithCredential(credential: firebase.auth.AuthCredential,
                      provider: AuthProviders) {
        return this.af.auth.login(credential, {
        provider,
        method: AuthMethods.OAuthToken,
        });
    }


    // logInWithGithub() {
    //     firebase.auth().signInWithRedirect(this.provider);
    //     return firebase.auth().getRedirectResult().then(function (result) {
    //         console.log(result);
    //         if (result.credential) {
    //             var token = result.credential.accessToken;
    //         }
    //         var user = result.user;
    //     }).catch(function(error) {
    //         console.log(error);
    //     })
    // }

    logOut() {
        this.af.auth.logout();
    }

    resetPassword(email: string): firebase.Promise<any> {
        return firebase.auth().sendPasswordResetEmail(email);
    }

     

}


