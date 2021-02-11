
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPhonebookEntry, PhonebookEntry } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PhonebookEntriesService {

  private url: string = "phoneBookEntries";
  private Url: string = "phoneBookEntries/";

  constructor(private apiService: ApiService
  ) {

  }

  public getPhoneBookEntries(phoneBookId: number): Observable<PhonebookEntry[]> {
    return this.apiService.GET<PhonebookEntry[]>(this.Url + phoneBookId);
  }

  public getPhoneBook(id: number): Observable<PhonebookEntry> {
    return this.apiService.GET<PhonebookEntry>(this.Url + id);
  }

  public savePhoneBookEntry(phoneBookEntry, phoneBookId): Observable<PhonebookEntry> {
    return this.apiService.POST<PhonebookEntry, PhonebookEntry>(this.Url + phoneBookId, phoneBookEntry);
  }

  public editPhoneBookEntry(phoneBookEntry): Observable<PhonebookEntry> {
    return this.apiService.PUT<PhonebookEntry, PhonebookEntry>(this.url, phoneBookEntry);
  }

  public deletePhoneBookEntry(id) {
    return this.apiService.DELETE(this.Url + id);
  }
}
