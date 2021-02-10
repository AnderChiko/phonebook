using Phonebook.Contracts.Models.PhoneBookEntries;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Phonebook.Core.Interfaces.Services
{
    public interface IPhoneBookService
    {
        Task<Contracts.Models.PhoneBookEntries.Phonebook> AddPhoneBookAsync(string name);
        Task EditPhoneBookAsync(Contracts.Models.PhoneBookEntries.Phonebook phoneBook);
        Task<IList<Contracts.Models.PhoneBookEntries.Phonebook>> GetPhoneBooksAsync();
        Task<Contracts.Models.PhoneBookEntries.Phonebook> GetPhoneBookByIdAsync(int id);
        Task DeletePhoneBookAsync(int id);
    }
}
