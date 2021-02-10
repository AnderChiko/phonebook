using Phonebook.Contracts.Models.PhoneBookEntries;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Phonebook.Core.Interfaces.Services
{
    public interface IPhoneBookEntryService
    {
        Task<PhonebookEntry> AddPhoneBookEntryAsync(string name, string phoneNumber, int phoneBookId);
        Task EditPhoneBookEntryAsync(PhonebookEntry phoneBookEntry);
        Task<IList<PhonebookEntry>> GetPhoneBookEntriesAsync(int phoneBookId);
        Task<PhonebookEntry> GetPhoneBookEntryAsync(int id);
        Task DeletePhoneBookEntryAsync(int phoneBookId, int id);
        Task<PhonebookEntry> GetPhoneBookEntryByNumberAsync(string phoneNumber);
    }
}
