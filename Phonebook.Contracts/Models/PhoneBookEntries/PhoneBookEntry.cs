using System;
using System.Collections.Generic;
using System.Text;

namespace Phonebook.Contracts.Models.PhoneBookEntries
{
    public class PhonebookEntry
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public int PhoneBookId { get; set; }
        public virtual Phonebooks PhoneBook { get; set; }


    }
}
