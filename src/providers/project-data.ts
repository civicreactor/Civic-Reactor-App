import { Injectable } from '@angular/core';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';

@Injectable()
export class ProjectData {
    projects: any;

    constructor(public af:AngularFire) {
        this.projects = af.database.list('/projects');
    }

    getProjects() {
        return this.projects;
    }
}