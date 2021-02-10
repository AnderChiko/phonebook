import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';
import { AddEditViewMode, IPhonebook } from 'src/app/models';
import { PhonebookService } from 'src/app/services';

@Component({
  selector: 'app-phonebook-list',
  templateUrl: './phonebook-list.component.html'
})
export class PhonebookListComponent implements OnInit {


  public phonebookList: IPhonebook[];
  public loading: boolean = false;
  public addEditViewMode = AddEditViewMode;

  public phonebook: IPhonebook;

  constructor(public phonebookService: PhonebookService
    // , private toastr: ToastrService
  ) {

    this.phonebookList = [];
  }

  ngOnInit(): void {
    this.loadPhoneBooks();
  }

  private loadPhoneBooks() {
    // this.phonebook =  new IPhonebook();
    this.loading = true;
    this.phonebookService.getPhoneBooks().subscribe(
      (response: IPhonebook[]) => {

        this.loading = false;
        this.phonebookList = response;

        //if (response == null)
        //  this.toastr.info("Phonebook list is empty", "Phonebook");
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
