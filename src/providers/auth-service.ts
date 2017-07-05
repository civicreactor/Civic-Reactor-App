import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
import { User } from '../model/user';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/startWith';
import * as find from 'lodash.find';
import * as gravatar from 'gravatar';
import firebase from 'firebase';

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
        this.af.auth.subscribe(authState => this.user.next(this.fromAuthState(authState)));
        this.defaultPic = "http://wearesmile.com/assets/themes/s5/img/logo.png";
        this.provider = new firebase.auth.GithubAuthProvider();
        this.provider.addScope('user:email');
    }

    create(user: User): firebase.Promise<any> {
        return firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then((newUser) => {
            firebase.database().ref('/userProfile').child(newUser.uid).set({
                firstName: user.fName,
                lastName: user.lName,
                email: user.email,
                profilePic: gravatar.url(user.email, {d: this.defaultPic}, true),
            });
        });
    }

    logIn(user: User) {
        return this.af.auth.login(user, {
            provider: AuthProviders.Password,
            method: AuthMethods.Password,
        })
    }

    logInWithGithub() {
        firebase.auth().signInWithRedirect(this.provider);
        return firebase.auth().getRedirectResult().then(function (result) {
            console.log(result);
            if (result.credential) {
                var token = result.credential.accessToken;
            }
            var user = result.user;
        }).catch(function(error) {
            console.log(error);
            // var errorCode = error.code;
        })
    }

    logOut() {
        this.af.auth.logout();
    }

    resetPassword(email: string): firebase.Promise<any> {
        return firebase.auth().sendPasswordResetEmail(email);
    }

    fromAuthState(authState: FirebaseAuthState): User {
        if (authState) {
            if (authState.provider == AuthProviders.Password)  {
                console.log('password provider');
                const user = authState.auth;
                return new User(authState.uid, user.displayName || user.email,
                user.email, '', gravatar.url(user.email));
            } else if (authState.provider in providers) {
                console.log('github provider');
                const user = authState[providers[authState.provider]] as
                firebase.UserInfo;
                console.log(user.providerId + ' ' + user.photoURL + '' + authState.uid + ' ' + user.email)
                return new User(authState.uid, user.displayName, user.email, '',
                user.photoURL || gravatar.url(user.email));
            } 
        }
        return null;
    }

    //fromAuthState(authState: FirebaseAuthState): User {
    //     if (authState) {
    //         if (authState.provider == AuthProviders.Password) {
    //             const user = authState.auth;
    //             return new User(authState.uid, user.displayName || user.email, 
    //             user.email, '', gravatar.url(user.email));
    //         }
    //     }
    //     return null;
    // }

}


