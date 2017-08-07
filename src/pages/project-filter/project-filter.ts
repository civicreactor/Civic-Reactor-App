import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
    selector: "page-project-filter",
    templateUrl: "project-filter.html"
})

export class ProjectFilterPage {
    techs: Array<{name: string, isChecked: boolean}> = [];

    constructor(public navParams: NavParams, public viewCtrl: ViewController){
        this.techs = [{name: 'JavaScript', isChecked: true}, {name: 'Python', isChecked: true},
                      {name: 'Java', isChecked: true}];
    }

    applyFilters() {
    // Pass back a new array of track names to exclude
        let includedTrackNames = this.techs.filter(c => c.isChecked).map(c => c.name);
        console.log('included: '+includedTrackNames)
        // this.dismiss(includedTrackNames);
        // this.projectList.getProjects('', includedTrackNames);
    }

    resetFilters() {
        this.techs.forEach(t => {
            t.isChecked = true;
        })
    }

    dismiss(data?: any) {
        this.viewCtrl.dismiss(data);
    }


}

