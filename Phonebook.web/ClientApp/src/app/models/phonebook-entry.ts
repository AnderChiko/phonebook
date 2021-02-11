export class PhonebookEntry {
  Id: number;
  Name: string;
  PhoneNumber: string;

  constructor() {
    this.Id = 0;
    this.Name = '';
    this.PhoneNumber = '';

  }
}


export interface IPhonebookEntry {
  id: number;
  name: string;
  phoneNumber: string;
}


