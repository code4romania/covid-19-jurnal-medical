using System.ComponentModel.DataAnnotations;
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

        public ResetPasswordModel(UserManager<ApplicationUser> userManager,
            PasswordValidationMessages passwordValidationMessages)
        {
            _userManager = userManager;
            _passwordValidationMessages = passwordValidationMessages;
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

            var result = await _userManager.ResetPasswordAsync(user, Input.Code, Input.Password);
            if (result.Succeeded)
            {
                return RedirectToPage("./ResetPasswordConfirmation");
            }

            foreach (var error in result.Errors)
            {
                var errorDescription = _passwordValidationMessages.GetMessageByCode(error);
                ModelState.AddModelError(string.Empty, errorDescription);
            }
            return Page();
        }
    }
}
