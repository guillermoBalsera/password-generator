import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  constructor(private http: HttpClient) {
  }

  getRandomVerse(): any {
    let url: string = 'https://bible-api.com/?random=verse';
    return this.http.get<any>(url);
  }

  getSpells(): any {
    let url: string = 'https://wizard-world-api.herokuapp.com/Spells';
    return this.http.get<any>(url);
  }

  getCat(): any {
    let url: string = 'https://meowfacts.herokuapp.com/';
    return this.http.get<any>(url);
  }

  getCat2(): any {
    let url: string = 'https://cat-fact.herokuapp.com/facts';
    return this.http.get<any>(url);
  }

}
