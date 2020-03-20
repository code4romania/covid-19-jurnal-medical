
using System.Collections.Generic;

namespace StamAcasa.IdentityServer.Models
{
    public class ApiConfiguration {
        public string Name { get; set; }
        public List<string> ClaimList { get; set; }
        public string Secret { get; set; }
    }
}