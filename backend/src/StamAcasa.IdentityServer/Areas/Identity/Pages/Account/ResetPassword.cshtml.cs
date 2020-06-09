using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IdentityServer.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.WebUtilities;
using StamAcasa.IdentityServer;

namespace IdentityServer.Pages.Account
{
    [AllowAnonymous]
    public class ResetPasswordModel : PageModel
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly PasswordValidationMessages _passwordValidationMessages;
        private readonly IPasswordHasher<ApplicationUser> _passwordHasher;

        public ResetPasswordModel(UserManager<ApplicationUser> userManager,
            PasswordValidationMessages passwordValidationMessages,
            IPasswordHasher<ApplicationUser> passwordHasher)
        {
            _userManager = userManager;
            _passwordValidationMessages = passwordValidationMessages;
            _passwordHasher = passwordHasher;
        }

        [BindProperty]
        public InputModel Input { get; set; }

        public class InputModel
        {
            [Required(ErrorMessage = "Te rugăm completează adresa de e-mail")]
            [EmailAddress(ErrorMessage = "Adresa de e-mail nu este validă.")]
            public string Email { get; set; }

            [Required(ErrorMessage = "Te rugăm să completezi parola")]
            [StringLength(100, ErrorMessage = "Câmpul {0} trebuie să aibă lungimea între minim {2} și maximum {1} caractere.", MinimumLength = 6)]
            [DataType(DataType.Password)]
            public string Password { get; set; }

            [DataType(DataType.Password)]
            [Display(Name = "Confirm password")]
            [Compare("Password", ErrorMessage = "Câmpurile de parolă și confirmare parolă nu sunt identice.")]
            public string ConfirmPassword { get; set; }

            public string Code { get; set; }
        }

        public IActionResult OnGet(string code = null)
        {
            if (code == null)
            {
                return BadRequest("A code must be supplied for password reset.");
            }
            else
            {
                Input = new InputModel
                {
                    Code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(code))
                };
                return Page();
            }
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            var user = await _userManager.FindByEmailAsync(Input.Email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return RedirectToPage("./ResetPasswordConfirmation");
            }

            var (isValid, errorMessage) = IsPasswordValid(user, Input.Password);
            if (!isValid)
            {
                ModelState.AddModelError(string.Empty, errorMessage);
                return Page();
            }

            var result = await _userManager.ResetPasswordAsync(user, Input.Code, Input.Password);
            if (result.Succeeded)
            {
                user.PreviousPasswords = ConcatUserPasswords(user.PreviousPasswords, user.PasswordHash);
                await _userManager.UpdateAsync(user);

                return RedirectToPage("./ResetPasswordConfirmation");
            }

            foreach (var error in result.Errors)
            {
                var errorDescription = _passwordValidationMessages.GetMessageByCode(error);
                ModelState.AddModelError(string.Empty, errorDescription);
            }
            return Page();
        }

        private string ConcatUserPasswords(string previousPasswords, string userPasswordHash)
        {
            if (string.IsNullOrEmpty(previousPasswords))
            {
                return $"{userPasswordHash};";
            }

            List<string> passwords = new List<string>();
            var passwordHashes = previousPasswords.Split(";", StringSplitOptions.RemoveEmptyEntries);

            passwords.AddRange(passwordHashes);
            passwords.Add(userPasswordHash);

            return string.Join(";", passwords.Select(x => x).Reverse().Take(5).Reverse());
        }

        private (bool isValid, string errorMessage) IsPasswordValid(ApplicationUser user, string inputPassword)
        {
            var previousPasswordsHashes = new List<string>()
            {
                user.PasswordHash
            };

            if (!string.IsNullOrEmpty(user.PreviousPasswords))
            {
                var passwordHashes = user.PreviousPasswords.Split(";", StringSplitOptions.RemoveEmptyEntries);
                previousPasswordsHashes.AddRange(passwordHashes);
            }

            foreach (var hashedPassword in previousPasswordsHashes)
            {
                var passwordVerificationResult = _passwordHasher.VerifyHashedPassword(user, hashedPassword, inputPassword);
                if (passwordVerificationResult == PasswordVerificationResult.Success)
                {
                    return (false, "Nu poti folosi o parola folosita in trecut");
                }
            }

            return (true, string.Empty);
        }
    }
}
