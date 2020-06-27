using System;
using Microsoft.AspNetCore.Identity;

namespace IdentityServer.Data
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser
    {
        public string PreviousPasswords { get; set; }

        public DateTimeOffset? NextAllowedReset { get; set; }

        public int ResetCounter { get; set; }
    }
}
