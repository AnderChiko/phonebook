using Phonebook.Contracts.Models.PhoneBookEntries;
using Phonebook.Core.DataAccess;
using Phonebook.Core.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Phonebook.Core.ServiceLayer
{

    public class PhoneBookEntryService : IPhoneBookEntryService
    {
        private readonly IGenericRepository<PhonebookEntry> _phoneBookEntryRepository;
        IPhoneBookService phoneBookService;

        public PhoneBookEntryService(IPhoneBookService phoneBookService, IGenericRepository<Contracts.Models.PhoneBookEntries.Phonebook> phoneBookRepository, IGenericRepository<PhonebookEntry> phoneBookEntryRepository)
        {
            this.phoneBookService = phoneBookService;
            _phoneBookEntryRepository = phoneBookEntryRepository;
        }

        public async Task<PhonebookEntry> AddPhoneBookEntryAsync(string name, string phoneNumber, int phoneBookId)
        {
            var phoneBook = await phoneBookService.GetPhoneBookByIdAsync(phoneBookId);

            //should define custom exceptions               
            if (phoneBook == null) 
                throw new Exception("Phone book not found");

            var phoneBookEntry = await GetPhoneBookEntryByNumberAsync(phoneNumber);
            //check if number already exists
            if (phoneBookEntry == null)
            {
                phoneBookEntry = new PhonebookEntry
                {
                    Name = name,
                    PhoneNumber = phoneNumber,
                    PhoneBookId = phoneBookId
                };

                await _phoneBookEntryRepository.AddAsync(phoneBookEntry);
            }

            await _phoneBookEntryRepository.SaveChangesAsync();
            // Logic on what to do if number already exists.
            //add custom response
            return phoneBookEntry;
        }

        public async Task DeletePhoneBookEntryAsync(int phoneBookId, int id)
        {
            var phoneBookEntry = await GetPhoneBookEntryAsync(id);

            if (phoneBookEntry == null)
                throw new Exception("Phone entry not found");

            _phoneBookEntryRepository.Delete(phoneBookEntry);

            await _phoneBookEntryRepository.SaveChangesAsync();
        }

        public async Task EditPhoneBookEntryAsync(PhonebookEntry phoneBookEntry)
        {
            var phoneBook = await GetPhoneBookEntryAsync(phoneBookEntry.Id);

            if (phoneBook == null)
                throw new Exception("Phone entry not found");


            phoneBook.Name = phoneBookEntry.Name;
            phoneBook.PhoneNumber = phoneBookEntry.PhoneNumber;

            _phoneBookEntryRepository.Update(phoneBook);
            await _phoneBookEntryRepository.SaveChangesAsync();
        }

        public async Task<IList<PhonebookEntry>> GetPhoneBookEntriesAsync(int phoneBookId)
        {
            var phoneBook = await phoneBookService.GetPhoneBookByIdAsync(phoneBookId);
            return phoneBook.PhoneBookEntries.Select(a => a).ToList();
        }

        public async Task<PhonebookEntry> GetPhoneBookEntryAsync(int id)
        {
            var phoneBookEntry = await _phoneBookEntryRepository.FindByIdAsync(id);
            return phoneBookEntry;
        }

        public async Task<PhonebookEntry> GetPhoneBookEntryByNumberAsync(string phoneNumber)
        {
            var phoneBookEntry = _phoneBookEntryRepository.Entities.FirstOrDefault(a => a.PhoneNumber == phoneNumber);

            return phoneBookEntry;
        }
    }
}
