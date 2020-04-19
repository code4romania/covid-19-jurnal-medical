using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using IdentityServer.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;
using StamAcasa.Common.Queue;
using StamAcasa.Common.Services.Emailing;

namespace IdentityServer.Pages.Account
{
    [AllowAnonymous]
    public class ForgotPasswordModel : PageModel
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IQueueService _queue;

        public ForgotPasswordModel(
            UserManager<ApplicationUser> userManager,
            IQueueService queueService)
        {
            _userManager = userManager;
            _queue = queueService;
        }

        [BindProperty]
        public InputModel Input { get; set; }

        public class InputModel
        {
            [Required]
            [EmailAddress]
            public string Email { get; set; }
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(Input.Email);
                if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    return RedirectToPage("./ForgotPasswordConfirmation");
                }

                // For more information on how to enable account confirmation and password reset please 
                // visit https://go.microsoft.com/fwlink/?LinkID=532713
                var code = await _userManager.GeneratePasswordResetTokenAsync(user);
                code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                var callbackUrl = Url.Page(
                    "/Account/ResetPassword",
                    pageHandler: null,
                    values: new { area = "Identity", code },
                    protocol: Request.Scheme);

                await SendPasswordResetEmail(user.UserName, callbackUrl);

                return RedirectToPage("./ForgotPasswordConfirmation");
            }

            return Page();
        }

        private async Task SendPasswordResetEmail(string userName, string callbackUrl)
        {
            EmailRequestModel email = new EmailRequestModel()
            {
                Address = Input.Email,
                PlaceholderContent = new Dictionary<string, string>(),
                TemplateType = EmailTemplate.ResetPassword,
                Type = "resetPasswordTemplate",
                SenderName = "Reset Password",
                Subject = ""
            };
            email.PlaceholderContent.Add("name", userName);
            email.PlaceholderContent.Add("resetPasswordLink", HtmlEncoder.Default.Encode(callbackUrl));

            await _queue.PublishEmailRequest<EmailRequestModel>(email);
        }
    }
}
