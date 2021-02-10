using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Phonebook.Web.PolicyHandlers
{
    public static class ApplicationHeaders
    {
        public static string ApiVersion = "ApiVersion";

        public static string ConfigKey(string headerName)
        {
            return $"headers:{headerName}"; // TODO: To be tested.
        }
    }
}
