using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using IdentityServer.Data;
using IdentityServer4.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.WebUtilities;
using StamAcasa.IdentityServer;
using StamAcasa.IdentityServer.Helpers;
using StamAcasa.IdentityServer.Options;

namespace IdentityServer.Pages.Account
{
    [AllowAnonymous]
    public class ConfirmEmailModel : PageModel
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly List<Uri> _allowedRedirectUrls;

        public ConfirmEmailModel(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, AllowedRedirects allowedRedirects)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _allowedRedirectUrls = BuildAllowedRedirectUrls(allowedRedirects);
        }

        private static List<Uri> BuildAllowedRedirectUrls(AllowedRedirects allowedRedirects)
        {
            if (allowedRedirects?.Urls == null)
            {
                throw new ArgumentNullException(nameof(allowedRedirects));
            }
            if (!allowedRedirects.Urls.Any())
            {
                throw new ArgumentException("Please provide at least 1 allowed redirect");
            }

            return allowedRedirects.Urls.Select(x => new Uri(UrlHelpers.NormalizeUrl(x))).ToList();
        }

        [TempData]
        public string StatusMessage { get; set; }
        [ViewData]
        public bool Success { get; set; }
        [ViewData]
        public string RedirectUrl { get; set; }

        public async Task<IActionResult> OnGetAsync(string userId, string code, string returnUrl)
        {
            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(code))
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
            RedirectUrl = GetRedirectUrl(returnUrl);
            StatusMessage = result.Succeeded ?
                "Mulțumim pentru confirmarea adresei de e-mail. Vei fi redirecționat(ă) către aplicație." :
                "Eroare la confirmarea adresei de email.";

            if (!string.IsNullOrEmpty(returnUrl))
                await _signInManager.SignInAsync(user, isPersistent: false);

            return Page();
        }

        private string GetRedirectUrl(string returnUrl)
        {
            var defaultRedirectUrl = Url.Content("~/");

            if (returnUrl.IsNullOrEmpty())
            {
                return defaultRedirectUrl;
            }

            Uri returnUrlUri = new Uri(UrlHelpers.NormalizeUrl(returnUrl));

            if (_allowedRedirectUrls.Any(x => x == returnUrlUri))
            {
                return returnUrl;
            }


            return defaultRedirectUrl;
        }
    }
}
