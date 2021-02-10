using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Phonebook.Core.DataAccess;
using Phonebook.Core.Interfaces.Services;
using Phonebook.Core.ServiceLayer;
using Phonebook.DataAccess.Modules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Phonebook.Web.IoC
{
    public static  class RegisterServices
    {
		public static IServiceCollection AddRegisterServices(this IServiceCollection services)
		{
			// register all services
			services.AddScoped(typeof(DbContext), typeof(PhoneBookDbContext));
			services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
			services.AddScoped(typeof(IPhoneBookService), typeof(PhoneBookService));
			services.AddScoped(typeof(IPhoneBookEntryService), typeof(PhoneBookEntryService));

			return services;
		}
	}
}
