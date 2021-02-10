using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Phonebook.DataAccess.Modules;
using System;
using System.Collections.Generic;
using System.Text;

namespace Phonebook.DataAccess.Migrations
{
    [DbContext(typeof(PhoneBookDbContext))]
    partial class PhonebookDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity("Phonebook.Contracts.Phonebook", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd();

                b.Property<string>("Name");

                b.HasKey("Id");

                b.ToTable("Phonebooks");
            });

            modelBuilder.Entity("Phonebook.Contracts.Models.PhonebookEntries.PhonebookEntry", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd();

                b.Property<string>("Name");

                b.Property<int>("PhonebookId");

                b.Property<string>("PhoneNumber");

                b.HasKey("Id");

                b.HasIndex("PhonebookId");

                b.ToTable("PhonebookEntries");
            });

            modelBuilder.Entity("Phonebook.Contracts.Models.PhonebookEntries.PhonebookEntry", b =>
            {
                b.HasOne("Phonebook.Contracts.Models.PhonebookEntries.Phonebook", "Phonebook")
                    .WithMany("PhonebookEntries")
                    .HasForeignKey("PhonebookId")
                    .OnDelete(DeleteBehavior.Cascade);
            });
#pragma warning restore 612, 618
        }
    }
}
