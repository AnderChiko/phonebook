import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Phonebook } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PhonebookService {

  private url: string = "phonebooks";
  private Url: string = "phonebooks/";

  constructor(private apiService: ApiService
  ) {
  }

  public getPhoneBooks(): Observable<Phonebook[]> {
    return this.apiService.GET<Phonebook[]>(this.url);
  }

  public getPhoneBook(id: number): Observable<Phonebook> {
    return this.apiService.GET<Phonebook>(this.Url + id);
  }

  public savePhoneBook(phoneBook): Observable<Phonebook> {
    return this.apiService.POST<Phonebook, Phonebook>(this.url, phoneBook);
  }

  public editPhoneBook(phoneBook): Observable<Phonebook> {
    return this.apiService.PUT<Phonebook, Phonebook>(this.url, phoneBook);
  }

  public deletePhoneBook(id) {
    return this.apiService.DELETE(this.Url + id);
  }

}
