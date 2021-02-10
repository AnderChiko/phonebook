﻿using Phonebook.Contracts.Models.PhoneBookEntries;
using Phonebook.Core.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Phonebook.Core.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace Phonebook.Core.ServiceLayer
{
    public class PhoneBookService : IPhoneBookService
    {
        private readonly IGenericRepository<Contracts.Models.PhoneBookEntries.Phonebook> _phoneBookRepository;
        private readonly IGenericRepository<PhonebookEntry> _phoneBookEntryRepository;

        public PhoneBookService(IGenericRepository<Contracts.Models.PhoneBookEntries.Phonebook> phoneBookRepository, IGenericRepository<PhonebookEntry> phoneBookEntryRepository)
        {
            _phoneBookRepository = phoneBookRepository;
            _phoneBookEntryRepository = phoneBookEntryRepository;
        }

        public async Task<Contracts.Models.PhoneBookEntries.Phonebook> AddPhoneBookAsync(string name)
        {
            await IsExisting(name);

            var phoneBook = new Contracts.Models.PhoneBookEntries.Phonebook { Name = name };

            await _phoneBookRepository.AddAsync(phoneBook);
            await _phoneBookRepository.SaveChangesAsync();
            return phoneBook;
        }

        public async Task DeletePhoneBookAsync(int id)
        {
            var phoneBook = await GetPhoneBookByIdAsync(id);

            if (phoneBook == null)
                throw new Exception("Phone book not found");

            //should consider setting up cascading deletes
            var entriesToDelete = phoneBook.PhoneBookEntries.Select(a => a);

            if (entriesToDelete != null)
                _phoneBookEntryRepository.DeleteMany(entriesToDelete);

            _phoneBookRepository.Delete(phoneBook);

            await _phoneBookRepository.SaveChangesAsync();
        }

        public async Task EditPhoneBookAsync(Contracts.Models.PhoneBookEntries.Phonebook phoneBook)
        {
            var book = await GetPhoneBookByIdAsync(phoneBook.Id);

            if (book == null)
                throw new Exception("Phone book does not exist");

            book.Name = phoneBook.Name;

            _phoneBookRepository.Update(book);
            await _phoneBookRepository.SaveChangesAsync();
        }

        public async Task<Contracts.Models.PhoneBookEntries.Phonebook> GetPhoneBookByIdAsync(int id)
        {
            var phoneBook = await _phoneBookRepository.FindByIdAsync(id);

            return phoneBook;
        }

        public async Task<IList<Contracts.Models.PhoneBookEntries.Phonebook>> GetPhoneBooksAsync()
        {
            return await _phoneBookRepository.Entities.Include(a => a.PhoneBookEntries).OrderBy(b => b.Name).ToListAsync();
        }

        private async Task IsExisting(string name)
        {
            var exists = await _phoneBookRepository.Entities.AnyAsync(p => p.Name.ToLower() == name.ToLower());

            if (exists)
                throw new Exception($"Phone book {name} already exists");
        }
    }
}