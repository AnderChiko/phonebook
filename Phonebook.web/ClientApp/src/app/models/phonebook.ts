export interface IPhonebook {
  id: number;
  name: string;
  entriesCount: number;
}

export class Phonebook {
  Id: number;
  Name: string;
  EntriesCount: number;

  constructor() {
    this.Id = 0;
    this.Name = '';
    this.EntriesCount = 0;

  }
}
