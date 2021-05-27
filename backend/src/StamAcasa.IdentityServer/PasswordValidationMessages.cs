using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace StamAcasa.IdentityServer
{
    public class PasswordValidationMessages
    {
        private Dictionary<string, string> passwordValidationDictionary = new Dictionary<string, string>
        {
            { "PasswordRequiresNonAlphanumeric", "Parola trebuie să conțină cel puțin un caracter non-alfanumeric"},
            { "PasswordRequiresDigit", "Parola trebuie să conțină cel puțin o cifră('0'-'9')" },
            { "PasswordRequiresUpper", "Parola trebuie să conțină cel puțin o literă mare('A'-'Z')" },
            { "PasswordRequiresLower", "Parola trebuie să conțină cel puțin o literă mică('a'-'z')"}
        };

        public virtual string GetMessageByCode(IdentityError error)
        {
            if (passwordValidationDictionary.ContainsKey(error.Code))
            {
                return passwordValidationDictionary[error.Code];
            }
            else
            {
                return error.Description;
            }
        }
    }
}
