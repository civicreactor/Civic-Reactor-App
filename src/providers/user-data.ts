import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class UserData {
    public userProfile: firebase.database.Reference;
    public currentUser: firebase.User;

    constructor(public af: AngularFire) {
        this.currentUser = firebase.auth().currentUser;
        this.userProfile = firebase.database().ref('/userProfile');
    }

    getUsers() {
        return this.af.database.list('/userProfile');
    }

    getUserProfile(): firebase.database.Reference {
        return this.userProfile.child(this.currentUser.uid);
    }

    updateName(firstName: string, lastName: string): firebase.Promise<any> {
        return this.userProfile.child(this.currentUser.uid).update({
            firstName: firstName,
            lastName: lastName,
        });
    }

    updateEmail(newEmail: string, password: string): firebase.Promise<any> {
        const credential = firebase.auth.EmailAuthProvider.credential(this.currentUser.email, password);

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