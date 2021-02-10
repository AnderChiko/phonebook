using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Phonebook.DataAccess.Modules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Phonebook.Web.IoC
{
	public static class Core
	{
		/// <summary>
		/// Method to register the Core dependencies.
		/// 
		/// Transient: A new instance of the type is used every time the type is requested.
		/// 
		/// Scoped: A new instance of the type is created the first time it’s requested within
		///			a given HTTP request, and then re - used for all subsequent types resolved
		///			during that HTTP request.
		///			
		/// Singleton: A single instance of the type is created once, and used by all subsequent
		///			requests for that type.
		///			
		/// </summary>
		/// <param name="services"></param>
		/// <returns></returns>
		public static IServiceCollection AddCore(this IServiceCollection services)
		{
			// to do
			return services;
		}
	}
}
