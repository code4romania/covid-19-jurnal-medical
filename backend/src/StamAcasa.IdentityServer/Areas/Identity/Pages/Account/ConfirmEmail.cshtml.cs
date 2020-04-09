using System.Text;
using System.Threading.Tasks;
using IdentityServer.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.WebUtilities;

namespace IdentityServer.Pages.Account
{
    [AllowAnonymous]
    public class ConfirmEmailModel : PageModel
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public ConfirmEmailModel(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [TempData]
        public string StatusMessage { get; set; }
        [ViewData]
        public bool Success { get; set; }
        [ViewData]
        public string RedirectUrl { get; set; }

        public async Task<IActionResult> OnGetAsync(string userId, string code, string returnUrl)
        {
            if (userId == null || code == null)
            {
                return RedirectToPage("/Index");
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound($"Eroare identificare user '{userId}'.");
            }

            code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(code));
            var result = await _userManager.ConfirmEmailAsync(user, code);
            Success = result.Succeeded;
            RedirectUrl = returnUrl;
            StatusMessage = result.Succeeded ? 
                "Mulțumim pentru confirmarea adresei de e-mail. Veți fi redirecționat către aplicație." : 
                "Eroare la confirmarea adresei de email.";
            if (!string.IsNullOrEmpty(returnUrl))
                await _signInManager.SignInAsync(user, isPersistent: false);

            return Page();
        }
    }
}
