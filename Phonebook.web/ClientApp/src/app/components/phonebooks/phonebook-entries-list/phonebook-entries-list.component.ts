import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/helpers/local-storage-service';
//import { ToastrService } from 'ngx-toastr';
import { AddEditViewMode, IPhonebookEntry, PhonebookEntry } from 'src/app/models';
import { PhonebookEntriesService, PhonebookService } from 'src/app/services';

@Component({
  selector: 'phonebook-entries-list',
  templateUrl: './phonebook-entries-list.component.html'
})
export class PhonebookEntriesListComponent implements OnInit {

  public phonebookEntriesList: PhonebookEntry[];
  public loading: boolean = false;
  public addEditViewMode = AddEditViewMode;

  public searchTerm: string;
  public phoneBookId: number;

  public phonebookEntry: PhonebookEntry;

  constructor(public phonebookEntryService: PhonebookEntriesService
    //, private toastr: ToastrService
    , private route: ActivatedRoute
    , private phonebookService: PhonebookService
    , private localstorage: LocalStorageService
  ) {

    this.phonebookEntriesList = [];
    this.phoneBookId = +this.route.snapshot.params['phoneBookId'];
    this.phonebookEntry = new PhonebookEntry();
  }

  ngOnInit(): void {
    this.loadPhoneBooksEntries();
  }

  private loadPhoneBooksEntries() {

    this.loading = true;
    this.phonebookEntryService.getPhoneBookEntries(this.phoneBookId).subscribe(
      (response: PhonebookEntry[]) => {

        this.loading = false;
        this.phonebookEntriesList = response;
        this.localstorage.setPhonebookEntries(response);
        //if (response == null)
        // this.toastr.info("Phonebook Entries list is empty", "Phonebook Entries");
      });
  }

  public getPhoneBookEntriesToShow() {
    if (!this.searchTerm)
      return this.phonebookEntriesList;

    return this.phonebookEntriesList.filter(a => a.Name.toLowerCase().includes(this.searchTerm.toLowerCase())
      || a.PhoneNumber.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  public deletePhoneBookEntry(phonebookEntry) {
    this.loading = true;
    this.phonebookEntryService.deletePhoneBookEntry(phonebookEntry).subscribe(
      (response) => {
        this.loading = false;
        // this.toastr.info("Entry Successfully deleted.", "Phonebook Entry");
      });
  }

  public reloadList() {
    console.log('parent component function.');
    this.loadPhoneBooksEntries();
  }
}
