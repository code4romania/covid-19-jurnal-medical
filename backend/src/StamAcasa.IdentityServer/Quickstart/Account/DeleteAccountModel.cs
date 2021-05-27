
using System.ComponentModel.DataAnnotations;

namespace StamAcasa.IdentityServer.Quickstart.Account
{
    public class DeleteAccountModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
