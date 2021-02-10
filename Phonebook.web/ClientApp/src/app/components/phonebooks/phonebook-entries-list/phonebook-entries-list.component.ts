import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';
import { AddEditViewMode, IPhonebookEntry } from 'src/app/models';
import { PhonebookEntriesService, PhonebookService } from 'src/app/services';

@Component({
  selector: 'phonebook-entries-list',
  templateUrl: './phonebook-entries-list.component.html'
})
export class PhonebookEntriesListComponent implements OnInit {

  public phonebookEntriesList: IPhonebookEntry[];
  public loading: boolean = false;
  public addEditViewMode = AddEditViewMode;

  public searchTerm: string;
  public phoneBookId: number;

  public phonebookEntry: IPhonebookEntry;

  constructor(public phonebookEntryService: PhonebookEntriesService
    //, private toastr: ToastrService
    , private route: ActivatedRoute
    , private phonebookService: PhonebookService
  ) {

    this.phonebookEntriesList = [];
    this.phoneBookId = +this.route.snapshot.params['phoneBookId'];
  }

  ngOnInit(): void {
    this.loadPhoneBooksEntries();
  }

  private loadPhoneBooksEntries() {
    // this.phonebook =  new IPhonebook();
    this.loading = true;
    this.phonebookEntryService.getPhoneBookEntries(this.phoneBookId).subscribe(
      (response: IPhonebookEntry[]) => {

        this.loading = false;
        this.phonebookEntriesList = response;

        //if (response == null)
        // this.toastr.info("Phonebook Entries list is empty", "Phonebook Entries");
      });



  }

  public getPhoneBookEntriesToShow() {
    if (!this.searchTerm)
      return this.phonebookEntriesList;

    return this.phonebookEntriesList.filter(a => a.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      || a.phoneNumber.toLowerCase().includes(this.searchTerm.toLowerCase()));
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
