using System;
using System.Collections.Generic;
using System.Text;

namespace Phonebook.Contracts.Models.PhoneBookEntries
{
    public class Phonebook
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int EntriesCount => PhoneBookEntries.Count;
        public virtual IList<PhonebookEntry> PhoneBookEntries { get; set; } = new List<PhonebookEntry>();

    }
}
