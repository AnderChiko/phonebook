import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPhonebook } from '../models';
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

  public getPhoneBooks(): Observable<IPhonebook[]> {
    return this.apiService.GET<IPhonebook[]>(this.url);
  }

  public getPhoneBook(id: number): Observable<IPhonebook> {
    return this.apiService.GET<IPhonebook>(this.Url + id);
  }

  public savePhoneBook(phoneBook): Observable<IPhonebook> {
    return this.apiService.POST<IPhonebook, IPhonebook>(this.url, phoneBook);
  }

  public editPhoneBook(phoneBook): Observable<IPhonebook> {
    return this.apiService.PUT<IPhonebook, IPhonebook>(this.url, phoneBook);
  }

  public deletePhoneBook(id) {
    return this.apiService.DELETE(this.Url + id);
  }

}
