import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {
    let x = "Hello"
    let y = "world"

    let z = x + " : " + y
    console.log("message = " + z)

  }

}
