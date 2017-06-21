import { Injectable, NgZone } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class UserData {
    public userProfile: firebase.database.Reference;
    public currentUser: firebase.User;
    public user: any;
    zone: NgZone;

    constructor(public af: AngularFire) {
        this.userProfile = firebase.database().ref('/userProfile');
        this.zone = new NgZone({});
        af.auth.subscribe((user) => {
            this.zone.run(() => {
                if (user) {
                    this.user = user;
                    this.currentUser = user.auth;   
                }
            })
        })
    }

    getUsers() {
        return this.af.database.list('/userProfile');
    }

    getUserProfile(): firebase.database.Reference {
        return this.userProfile.child(this.user.uid);
    }

    updateFirstName(firstName: string): firebase.Promise<any> {
        return this.userProfile.child(this.user.uid).update({
            firstName: firstName,
        });
    }

    updateLastName(lastName: string): firebase.Promise<any> {
        return this.userProfile.child(this.user.uid).update({
            lastName: lastName,
        });
    }

    updateEmail(newEmail: string, password: string): firebase.Promise<any> {
        const credential = firebase.auth.EmailAuthProvider.credential( this.currentUser.email, password);

        return this.currentUser.reauthenticate(credential).then(user => {
            this.currentUser.updateEmail(newEmail).then(user => {
                this.userProfile.child(this.currentUser.uid).update({
                    email: newEmail
                });
            });
        });
    }

    updatePasword(newPassword: string, oldPassword: string): firebase.Promise<any> {
        const credential = firebase.auth.EmailAuthProvider.credential(this.currentUser.email, oldPassword);

        return this.currentUser.reauthenticate(credential).then(user => {
            this.currentUser.updatePassword(newPassword).then(user => {
                    console.log('Password Changed');
                }, error => {
                    console.log(error);  
                }
            );
        });
    }

}