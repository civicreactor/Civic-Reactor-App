import { Injectable, NgZone } from '@angular/core';
import { UserData } from './user-data';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';

@Injectable()
export class ProjectData {
    projects: any;
    zone: NgZone;
    currentUser: string;
    favorites: any = [];

    constructor(public af:AngularFire, public userData:UserData) {
        this.zone = new NgZone({});
        af.auth.subscribe((user) => {
            this.zone.run(() => {
                if (user) {
                    this.currentUser = user.uid;
                }
            });     
        });
    }

    getProjects() {
        return this.af.database.list('/projects');
    }

     addFavoriteProject(projectKey: string) {
        return firebase.database().ref('/projects').child(projectKey + '/users/' + this.currentUser).set(true);
    }

    removeProjectFromFavorites(projectKey: string) {
        return firebase.database().ref('/projects').child(projectKey + '/users/' + this.currentUser).set(false);
    }

    getFavorites() {
        let uid = this.currentUser;
        return this.af.database.list('/projects', {query: {orderByChild: `/users/${uid}`, equalTo: true}});
    }   
}