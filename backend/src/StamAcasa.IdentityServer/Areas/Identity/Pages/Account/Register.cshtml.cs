using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using IdentityModel;
using IdentityServer.Data;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using StamAcasa.Common.Queue;
using StamAcasa.Common.Services.Emailing;
using StamAcasa.IdentityServer;

namespace IdentityServer.Pages.Account
{
    [AllowAnonymous]
    public class RegisterModel : PageModel
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<RegisterModel> _logger;
        private readonly IQueueService _queue;
        private readonly IConfiguration _configuration;
        private readonly PasswordValidationMessages _passwordValidationMessages;

        public RegisterModel(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ILogger<RegisterModel> logger,
            IQueueService queueService,
            IConfiguration configuration,
            PasswordValidationMessages passwordValidationMessages)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
            _queue = queueService;
            _configuration = configuration;
            _passwordValidationMessages = passwordValidationMessages;
        }

        [BindProperty]
        public InputModel Input { get; set; }

        [FromQuery]
        public string ReturnUrl { get; set; }

        public IList<AuthenticationScheme> ExternalLogins { get; set; }

        public class InputModel
        {
            [Required(ErrorMessage = "Te rugăm completează adresa de e-mail")]
            [EmailAddress(ErrorMessage = "Adresa de e-mail nu este validă.")]
            [Display(Name = "Adresa de e-mail")]
            public string Email { get; set; }

            [Required(ErrorMessage = "Te rugăm să completezi parola")]
            [StringLength(100, ErrorMessage = "Parola trebuie să aibă lungimea între minim {2} și maximum {1} caractere.", MinimumLength = 6)]
            [DataType(DataType.Password)]
            [Display(Name = "Setează parola")]
            public string Password { get; set; }

            [Required(ErrorMessage = "Te rugăm să completezi confirmarea parolei")]
            [DataType(DataType.Password)]
            [Display(Name = "Confirmă parola")]
            [Compare("Password", ErrorMessage = "Câmpurile de parolă și confirmare parolă nu sunt identice.")]
            public string ConfirmPassword { get; set; }
        }

        public async Task OnGetAsync(string returnUrl = null)
        {
            ReturnUrl = returnUrl;
            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();
        }

        private async Task SendRegistrationEmail(string userName, string callbackUrl) {
            EmailRequestModel email = new EmailRequestModel()
            {
                Address = Input.Email,
                PlaceholderContent = new Dictionary<string, string>(),
                TemplateType = EmailTemplate.AccountConfirmation,
                Type = "accountConfirmationTemplate",
                SenderName = "Admin Stăm Acasă",
                Subject = ""
            };
            email.PlaceholderContent.Add("name", userName);
            email.PlaceholderContent.Add("confirmationLink", HtmlEncoder.Default.Encode(callbackUrl));

            await _queue.PublishEmailRequest<EmailRequestModel>(email);
        }

        public async Task<IActionResult> OnPostAsync([FromQuery] string returnUrl = null)
        {
            returnUrl ??= Url.Content("~/");
            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = Input.Email, Email = Input.Email };
                var result = await _userManager.CreateAsync(user, Input.Password);
                if (result.Succeeded)
                {
                    await _userManager.AddClaimsAsync(user, new Claim[]
                    {
                        new Claim(JwtClaimTypes.Id, Input.Email),
                        new Claim(JwtClaimTypes.Email, Input.Email),
                        new Claim(JwtClaimTypes.EmailVerified,
                            (!_configuration.GetValue<bool>("EnableEmailConfirmation")).ToString().ToLower(),
                            ClaimValueTypes.Boolean
                        ),
                    });
                    _logger.LogInformation("User created a new account with password.");

                    if (_userManager.Options.SignIn.RequireConfirmedAccount)
                    {
                        var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                        code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                        var callbackUrl = Url.Page(
                            "/Account/ConfirmEmail",
                            pageHandler: null,
                            values: new {area = "Identity", userId = user.Id, code = code, returnUrl = returnUrl},
                            protocol: Request.Scheme);

                        await SendRegistrationEmail(user.UserName, callbackUrl);

                        return RedirectToPage("RegisterConfirmation", new {email = Input.Email});
                    }
                    else
                    {
                        await _signInManager.SignInAsync(user, isPersistent: false);
                        return Redirect(returnUrl);
                    }
                }
                foreach (var error in result.Errors)
                {
                    var errorDescription = _passwordValidationMessages.TryGetMessageByCode(error);
                    ModelState.AddModelError(string.Empty, errorDescription);
                }
            }

            // If we got this far, something failed, redisplay form
            return Page();
        }
    }
}
