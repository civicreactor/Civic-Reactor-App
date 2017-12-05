import {Injectable} from "@angular/core";
import { Http } from '@angular/http';


@Injectable()
export class GithubService {
  constructor(private http:Http) {
    this.http.get("https://api.github.com/repos/civicreactor/Civic-Reactor-App/contributors").subscribe(response => this.contributors = response.json());
    this.http.get("https://api.github.com/users/civicreactor/repos").subscribe(response => {
        this.doProced(response.json());
      }
    );
    this.resultado = this.result;
  }

  contributors;
  shownGroup = null;
  result = {
    data: [],
  };

  resultado ={};


  getData(){
    return this.resultado;
  }

  // fill array with repositories name
  doProced(obj) {

    let counter = 0;
    let repositories = [];

    for (let prop in obj) {
      // console.log( obj[prop] );
      if (obj[prop].hasOwnProperty("name")) {
        let name = obj[counter]["name"];
      }
      repositories.push(name);
      counter++;
    }
    this.doContribuitors(repositories)
  };

  // calling github endpoint to get for each repository list of contributors
  doContribuitors(array) {

    let colaboradores;

    for (let i = 0; i < array.length; i++) {
      this.http.get("https://api.github.com/repos/civicreactor/" + array [i] + "/contributors").subscribe(response => {
          this.mostrar(response.json(), array[i]);
        }
      );
    }
  };

  // create an object with the data
  mostrar(colaboradores, repositorio) {


    if (colaboradores != undefined ) {
      var colnumber = colaboradores.length;
      this.result.data.push({
        "name": repositorio,
        "colnumber":colnumber,
        "colaboradores": colaboradores
      });

    }
  }

}
