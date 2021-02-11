using Phonebook.Contracts.Models.PhoneBookEntries;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Phonebook.Core.Interfaces.Services
{
    public interface IPhoneBookService
    {
        Task<Phonebooks> AddPhoneBookAsync(string name);
        Task EditPhoneBookAsync(Phonebooks phoneBook);
        Task<IList<Phonebooks>> GetPhoneBooksAsync();
        Task<Phonebooks> GetPhoneBookByIdAsync(int id);
        Task DeletePhoneBookAsync(int id);
    }
}
