import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LocalStorageService } from 'src/app/helpers/local-storage-service';
//import { ToastrService } from 'ngx-toastr';
import { AddEditViewMode, IPhonebook, Phonebook } from 'src/app/models';
import { PhonebookService } from 'src/app/services';

@Component({
  selector: 'add-edit-phonebook',
  templateUrl: './phonebook.component.html'
})
export class PhonebookComponent implements OnInit {

  public Item: IPhonebook;
  items: Phonebook[]

  public loading: boolean = false;
  public modalRef: BsModalRef;

  public pageForm: FormGroup;
  public Submitted: boolean = false;
  public addEditViewMode = AddEditViewMode;
  public isDuplicate: boolean = false;

  public selectedIndex: number = -1;

  @Input('id') Id: number;
  @Input('item') itemIn: Phonebook;
  @Input('mode') mode: string;
  @Input('text') text: string;

  @Output('reloadList') reloadList: EventEmitter<any> = new EventEmitter();

  constructor(private phonebookService: PhonebookService
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
    })
    //initialise
    this.Submitted = false;

  }
  public get P1() { return this.pageForm.controls; }


  public openModalWithClass(template: TemplateRef<any>, _itemId: number, _Item: Phonebook) {

    this.pageInitialise();
    this.getItem(template, _Item);
  }

  private getItem(template: TemplateRef<any>, _item: Phonebook) {

    this.loading = true;
    this.mapObjectToFormControls(_item);
    this.modalRef = this.modalService.show(template, Object.assign(_item, { class: 'gray modal-md modal-dialog' }));
    this.loading = false;

  }


  private mapObjectToFormControls(obj: Phonebook) {

    this.P1.id.setValue(obj.Id);
    if (obj.Id == 0)
      return;

    this.P1.name.setValue(obj.Name);
  }

  private mapFormControlsToObject() {
    return {
      Id: this.P1.id.value,
      Name: this.P1.name.value,
      EntriesCount: 0
    }
  }

  public submitForm() {

    this.Submitted = true;
    if (this.pageForm.invalid)
      return;

    let objPost = this.mapFormControlsToObject();

    this.loading = true;
    this.isDuplicate = false;

    this.items = this.localstorage.getPhonebooks()
    if (this.items == null)
      this.items = [];

    if (objPost.Id == 0) {

      objPost.Id = this.items.length + 1;
      this.items.push(objPost);
    }
    else {
      let selectedIndex = this.items.findIndex(x => x.Id === objPost.Id);
      this.items[selectedIndex] = objPost;
    }

    this.localstorage.setPhonebooks(this.items);
    this.reloadList.emit();
    this.loading = false;
    this.modalRef.hide();


    /*

    if (objPost.Id == 0) {
      this.phonebookService.savePhoneBook(objPost).subscribe(
        (response: IPhonebook) => {

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
      this.phonebookService.editPhoneBook(objPost).subscribe(
        (response: IPhonebook) => {

          if (response == null) {
            //this.toastr.error("Error occured while saving", "Error");
            this.loading = false;
            return;
          }
          this.Item = response;
          this.reloadList.emit();
          this.loading = false;
          this.modalRef.hide();
        });
    }*/
  }
}
