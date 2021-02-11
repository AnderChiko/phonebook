import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IPhonebook, Phonebook } from "../models";


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  constructor() { }


  public setPhonebooks(value) {
    let key = 'Phonebooks';
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getPhonebooks() {
    return JSON.parse(localStorage.getItem('Phonebooks'));
  }

  public setPhonebookEntries(value) {
    let key = 'PhonebookEntries';
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getPhonebookEntries() {
    return JSON.parse(localStorage.getItem('PhonebookEntries'));
  }

}
