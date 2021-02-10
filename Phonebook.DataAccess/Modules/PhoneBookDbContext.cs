using Microsoft.EntityFrameworkCore;
using Phonebook.Contracts.Models.PhoneBookEntries;
using System;
using System.Collections.Generic;
using System.Text;

namespace Phonebook.DataAccess.Modules
{
    public class PhoneBookDbContext : DbContext
    {
        public DbSet<Contracts.Models.PhoneBookEntries.Phonebook> PhoneBooks { get; set; }
        public DbSet<PhonebookEntry> PhoneBookEntries { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //TODO: Move to config
            optionsBuilder.UseSqlite("Data Source=bin\\Phonebook.db");
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}
