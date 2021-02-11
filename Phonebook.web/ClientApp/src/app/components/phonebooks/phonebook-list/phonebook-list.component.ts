import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/helpers/local-storage-service';
//import { ToastrService } from 'ngx-toastr';
import { AddEditViewMode, IPhonebook, Phonebook } from 'src/app/models';
import { PhonebookService } from 'src/app/services';

@Component({
  selector: 'app-phonebook-list',
  templateUrl: './phonebook-list.component.html'
})
export class PhonebookListComponent implements OnInit {


  public phonebookList: Phonebook[];
  public loading: boolean = false;
  public addEditViewMode = AddEditViewMode;

  public phonebook: Phonebook;

  constructor(public phonebookService: PhonebookService
    // , private toastr: ToastrService
    , private localstorage: LocalStorageService
  ) {

    this.phonebookList = [];
    this.phonebook = new Phonebook();
  }

  ngOnInit(): void {
    this.loadPhoneBooks();
  }

  private loadPhoneBooks() {
    this.loading = true;

    //this.phonebookList = this.localstorage.getPhonebooks();

    this.phonebookService.getPhoneBooks().subscribe(
      (response: Phonebook[]) => {

        this.loading = false;
        this.phonebookList = response;
        this.localstorage.setPhonebooks(response);
        //if (response == null)
        //this.toastr.info("Phonebook list is empty", "Phonebook");
      });
  }

  public deletePhoneBook(phonebook) {
    this.loading = true;
    this.phonebookService.deletePhoneBook(phonebook).subscribe(
      (response) => {
        this.loading = false;
        // this.toastr.info("Entry Successfully deleted.", "Phonebook");
      });
  }

  public reloadList() {
    console.log('parent component function.');
    this.loadPhoneBooks();
  }
}
