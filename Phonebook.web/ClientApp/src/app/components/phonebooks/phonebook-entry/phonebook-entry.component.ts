import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LocalStorageService } from 'src/app/helpers/local-storage-service';
//import { ToastrService } from 'ngx-toastr';
import { AddEditViewMode, IPhonebookEntry, PhonebookEntry } from 'src/app/models';
import { PhonebookEntriesService } from 'src/app/services';

@Component({
  selector: 'add-edit-phonebook-entry',
  templateUrl: './phonebook-entry.component.html'
})
export class PhonebookEntryComponent implements OnInit {

  public Item: PhonebookEntry;
  items: PhonebookEntry[]

  public loading: boolean = false;
  public modalRef: BsModalRef;

  public pageForm: FormGroup;
  public Submitted: boolean = false;
  public addEditViewMode = AddEditViewMode;
  public isDuplicate: boolean = false;

  public selectedIndex: number = -1;

  @Input('id') Id: number;
  @Input('item') itemIn: PhonebookEntry;
  @Input('mode') mode: string;
  @Input('text') text: string;
  @Input('phoneBookId') phoneBookId: number;

  @Output('reloadList') reloadList: EventEmitter<any> = new EventEmitter();

  constructor(private phonebookEntryService: PhonebookEntriesService
    //, private toastr: ToastrService
    , private localstorage: LocalStorageService
    , private modalService: BsModalService
    , private _formBuilder: FormBuilder) { }

  ngOnInit() {
  }
  public pageInitialise() {

    //build form
    this.pageForm = this._formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    })
    //initialise
    this.Submitted = false;

  }
  public get P1() { return this.pageForm.controls; }


  public openModalWithClass(template: TemplateRef<any>, _itemId: number, _Item: PhonebookEntry) {

    this.pageInitialise();
    this.getItem(template, _Item);
  }

  private getItem(template: TemplateRef<any>, _item: PhonebookEntry) {

    this.loading = true;
    this.mapObjectToFormControls(_item);
    this.modalRef = this.modalService.show(template, Object.assign(_item, { class: 'gray modal-md modal-dialog' }));
    this.loading = false;

  }

  private mapObjectToFormControls(obj: PhonebookEntry) {

    this.P1.id.setValue(obj.Id);
    if (obj.Id == 0)
      return;

    this.P1.name.setValue(obj.Name);
    this.P1.phoneNumber.setValue(obj.PhoneNumber);
  }

  private mapFormControlsToObject() {
    return {
      PhoneBookId: this.phoneBookId,
      Id: this.P1.id.value,
      Name: this.P1.name.value,
      PhoneNumber: this.P1.phoneNumber.value
    }
  }

  public submitForm() {

    this.Submitted = true;
    if (this.pageForm.invalid)
      return;

    let objPost = this.mapFormControlsToObject();

    this.loading = true;
    this.isDuplicate = false;


    if (objPost.Id == 0) {
      this.phonebookEntryService.savePhoneBookEntry(this.phoneBookId, objPost).subscribe(
        (response: PhonebookEntry) => {

          if (response == null) {
            // this.toastr.error("Error occured while saving", "Error");
            this.loading = false;
            return;
          }
          this.Item = response;
          this.reloadList.emit();
          this.loading = false;
          this.modalRef.hide();
        });
    }
    else {
      this.phonebookEntryService.editPhoneBookEntry(objPost).subscribe(
        (response: PhonebookEntry) => {

          if (response == null) {
            // this.toastr.error("Error occured while saving", "Error");
            this.loading = false;
            return;
          }
          this.Item = response;
          this.reloadList.emit();
          this.loading = false;
          this.modalRef.hide();
        });
    }
  }


}
