
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPhonebookEntry } from '../models';
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

  public getPhoneBookEntries(phoneBookId: number): Observable<IPhonebookEntry[]> {
    return this.apiService.GET<IPhonebookEntry[]>(this.Url + phoneBookId);
  }

  public getPhoneBook(id: number): Observable<IPhonebookEntry> {
    return this.apiService.GET<IPhonebookEntry>(this.Url + id);
  }

  public savePhoneBookEntry(phoneBookEntry, phoneBookId): Observable<IPhonebookEntry> {
    return this.apiService.POST<IPhonebookEntry, IPhonebookEntry>(this.Url + phoneBookId, phoneBookEntry);
  }

  public editPhoneBookEntry(phoneBookEntry): Observable<IPhonebookEntry> {
    return this.apiService.PUT<IPhonebookEntry, IPhonebookEntry>(this.url, phoneBookEntry);
  }

  public deletePhoneBookEntry(id) {
    return this.apiService.DELETE(this.Url + id);
  }
}
