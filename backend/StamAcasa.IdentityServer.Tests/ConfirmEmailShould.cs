using System.Collections.Generic;
using System.Threading.Tasks;
using AutoFixture.Xunit2;
using FluentAssertions;
using IdentityServer.Data;
using IdentityServer.Pages.Account;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using StamAcasa.IdentityServer.Options;
using Xunit;

namespace StamAcasa.IdentityServer.Tests
{
    public class FakeSignInManager : SignInManager<ApplicationUser>
    {
        public FakeSignInManager(Mock<UserManager<ApplicationUser>> userManager)
            : base(userManager.Object,
                new Mock<IHttpContextAccessor>().Object,
                new Mock<IUserClaimsPrincipalFactory<ApplicationUser>>().Object,
                new Mock<IOptions<IdentityOptions>>().Object,
                new Mock<ILogger<SignInManager<ApplicationUser>>>().Object,
                new Mock<IAuthenticationSchemeProvider>().Object,
                new Mock<IUserConfirmation<ApplicationUser>>().Object)
        { }

    }

    public class ConfirmEmailShould
    {

        [Theory]
        [InlineAutoMoqData("", "")]
        [InlineAutoMoqData("", null)]
        [InlineAutoMoqData(null, "")]
        [InlineAutoMoqData(null, null)]
        [InlineAutoMoqData("userId", "")]
        [InlineAutoMoqData("userId", null)]
        [InlineAutoMoqData("", "code")]
        [InlineAutoMoqData(null, "code")]
        public async Task Return_to_index_page_when_code_or_userId_are_empty(
            string userId,
            string userCode,
            [Frozen]Mock<UserManager<ApplicationUser>> userManager,
            FakeSignInManager signInManager
        )
        {
            ConfirmEmailModel sut = new ConfirmEmailModel(userManager.Object, signInManager, null);

            var result = await sut.OnGetAsync(userId, userCode, string.Empty);

            result.Should().BeOfType<RedirectToPageResult>().Which.PageName.Should().Be("/Index");
        }


        [Theory, AutoMoqData]
        public async Task Return_not_found_when_userId_is_not_in_db(
            [Frozen]Mock<UserManager<ApplicationUser>> userManager,
            FakeSignInManager signInManager
        )
        {
            userManager.Setup(x => x.FindByIdAsync("my-user-id"))
                .ReturnsAsync(null as ApplicationUser);

            ConfirmEmailModel sut = new ConfirmEmailModel(userManager.Object, signInManager, null);

            var result = await sut.OnGetAsync("my-user-id", "my-user-code", string.Empty);

            result.Should().BeOfType<NotFoundObjectResult>().Which.Value.Should().Be("Eroare identificare user 'my-user-id'.");
        }

        [Theory]
        [InlineData(true, "Mulțumim pentru confirmarea adresei de e-mail. Vei fi redirecționat(ă) către aplicație.")]
        [InlineData(false, "Eroare la confirmarea adresei de email.")]
        public async Task Return_correct_message_after_confirming_user_email(
            bool isSuccess,
            string expectedMessage)
        {
            var store = new Mock<IUserStore<ApplicationUser>>();
            var userManager = new Mock<UserManager<ApplicationUser>>(store.Object, null, null, null, null, null, null, null, null);

            FakeSignInManager signInManager = new FakeSignInManager(userManager);
            var currentUser = new ApplicationUser();

            userManager.Setup(x => x.FindByIdAsync("my-user-id"))
                .ReturnsAsync(currentUser);

            var confirmEmailResult = isSuccess ? IdentityResult.Success : IdentityResult.Failed(new[] { new IdentityError(), });

            userManager.Setup(x => x.ConfirmEmailAsync(currentUser, "my-user-code"))
                .ReturnsAsync(confirmEmailResult);

            ConfirmEmailModel sut = new ConfirmEmailModel(userManager.Object, signInManager, null);

            Mock<IUrlHelper> urlHelper = new Mock<IUrlHelper>();
            sut.Url = urlHelper.Object;

            var result = await sut.OnGetAsync("my-user-id", "bXktdXNlci1jb2Rl", string.Empty);

            sut.StatusMessage.Should().Be(expectedMessage);
            result.Should().BeOfType<PageResult>();
        }

        [Theory, AutoMoqData]
        public async Task SignIn_user_if_redirect_url_is_not_empty(
            [Frozen]Mock<UserManager<ApplicationUser>> userManager,
            Mock<FakeSignInManager> signInManager,
            Mock<IUrlHelper> urlHelper)
        {
            var currentUser = new ApplicationUser();

            userManager.Setup(x => x.FindByIdAsync("my-user-id"))
                .ReturnsAsync(currentUser);

            userManager.Setup(x => x.ConfirmEmailAsync(currentUser, "my-user-code"))
                .ReturnsAsync(IdentityResult.Success);

            signInManager.Setup(x => x.SignInAsync(currentUser, false, null))
                .Returns(Task.CompletedTask)
                .Verifiable();

            ConfirmEmailModel sut = new ConfirmEmailModel(userManager.Object, signInManager.Object, null);
            urlHelper.Setup(x => x.Content("~/")).Returns("https://example.com/");
            sut.Url = urlHelper.Object;

            var result = await sut.OnGetAsync("my-user-id", "bXktdXNlci1jb2Rl", "https://www.youtube.com/watch?v=dQw4w9WgXcQ");

            result.Should().BeOfType<PageResult>();
        }

        [Theory]
        [InlineAutoMoqData(null)]
        [InlineAutoMoqData("")]
        public async Task Set_redirect_url_to_default_when_return_url_is_empty(
            string returnUrl,
            [Frozen]Mock<UserManager<ApplicationUser>> userManager,
            Mock<FakeSignInManager> signInManager,
            Mock<IUrlHelper> urlHelper)
        {
            var currentUser = new ApplicationUser();

            userManager.Setup(x => x.FindByIdAsync("my-user-id"))
                .ReturnsAsync(currentUser);

            userManager.Setup(x => x.ConfirmEmailAsync(currentUser, "my-user-code"))
                .ReturnsAsync(IdentityResult.Success);

            signInManager.Setup(x => x.SignInAsync(currentUser, false, null))
                .Returns(Task.CompletedTask)
                .Verifiable();

            ConfirmEmailModel sut = new ConfirmEmailModel(userManager.Object, signInManager.Object, null);
            urlHelper.Setup(x => x.Content("~/")).Returns("https://example.com/");
            sut.Url = urlHelper.Object;

            var result = await sut.OnGetAsync("my-user-id", "bXktdXNlci1jb2Rl", returnUrl);

            result.Should().BeOfType<PageResult>();
            sut.RedirectUrl.Should().Be("https://example.com/");
        }

        [Theory]
        [InlineAutoMoqData(null)]
        [InlineAutoMoqData("")]
        public async Task Set_redirect_url_to_default_when_return_url_is_not_empty(
            string returnUrl,
            [Frozen]Mock<UserManager<ApplicationUser>> userManager,
            Mock<FakeSignInManager> signInManager,
            Mock<IUrlHelper> urlHelper)
        {
            var currentUser = new ApplicationUser();

            userManager.Setup(x => x.FindByIdAsync("my-user-id"))
                .ReturnsAsync(currentUser);

            userManager.Setup(x => x.ConfirmEmailAsync(currentUser, "my-user-code"))
                .ReturnsAsync(IdentityResult.Success);

            signInManager.Setup(x => x.SignInAsync(currentUser, false, null))
                .Returns(Task.CompletedTask)
                .Verifiable();

            ConfirmEmailModel sut = new ConfirmEmailModel(userManager.Object, signInManager.Object, null);
            urlHelper.Setup(x => x.Content("~/")).Returns("https://example.com/");
            sut.Url = urlHelper.Object;

            var result = await sut.OnGetAsync("my-user-id", "bXktdXNlci1jb2Rl", returnUrl);

            result.Should().BeOfType<PageResult>();
            sut.RedirectUrl.Should().Be("https://example.com/");
        }

        [Theory, AutoMoqData]
        public async Task Set_redirect_url_to_default_when_return_url_is_not_in_allowed_list(
            [Frozen]Mock<UserManager<ApplicationUser>> userManager,
            Mock<FakeSignInManager> signInManager,
            Mock<IUrlHelper> urlHelper)
        {
            var currentUser = new ApplicationUser();

            userManager.Setup(x => x.FindByIdAsync("my-user-id"))
                .ReturnsAsync(currentUser);

            userManager.Setup(x => x.ConfirmEmailAsync(currentUser, "my-user-code"))
                .ReturnsAsync(IdentityResult.Success);

            signInManager.Setup(x => x.SignInAsync(currentUser, false, null))
                .Returns(Task.CompletedTask)
                .Verifiable();

            var allowedRedirects = new AllowedRedirects()
            {
                Urls = new List<string>
                {
                    "https://goolge.com/my-page",
                    "https://bing.com",
                    "https://www.youtube.com"
                }
            };

            ConfirmEmailModel sut = new ConfirmEmailModel(userManager.Object, signInManager.Object, allowedRedirects);
            urlHelper.Setup(x => x.Content("~/")).Returns("https://example.com/");
            sut.Url = urlHelper.Object;

            var result = await sut.OnGetAsync("my-user-id", "bXktdXNlci1jb2Rl", "https://www.youtube.com/watch?v=dQw4w9WgXcQ");

            result.Should().BeOfType<PageResult>();
            sut.RedirectUrl.Should().Be("https://example.com/");
        }


        [Theory]
        [InlineAutoMoqData("https://www.stamacasa.ro/redirect-me")]
        [InlineAutoMoqData("https://www.stamacasa.ro/redirect-me/")]
        [InlineAutoMoqData("https://stamacasa.ro/redirect-me")]
        [InlineAutoMoqData("https://stamacasa.ro/redirect-me/")]
        public async Task Set_redirect_url_to_return_url_when_it_is_in_allow_list(
            string returnUrl,
            [Frozen]Mock<UserManager<ApplicationUser>> userManager,
            Mock<FakeSignInManager> signInManager,
            Mock<IUrlHelper> urlHelper)
        {
            var currentUser = new ApplicationUser();

            userManager.Setup(x => x.FindByIdAsync("my-user-id"))
                .ReturnsAsync(currentUser);

            userManager.Setup(x => x.ConfirmEmailAsync(currentUser, "my-user-code"))
                .ReturnsAsync(IdentityResult.Success);

            signInManager.Setup(x => x.SignInAsync(currentUser, false, null))
                .Returns(Task.CompletedTask)
                .Verifiable();

            var allowedRedirects = new AllowedRedirects()
            {
                Urls = new List<string>
                {
                    "https://stamacasa.ro/redirect-me",
                    "https://bing.com",
                    "https://www.youtube.com"
                }
            };

            ConfirmEmailModel sut = new ConfirmEmailModel(userManager.Object, signInManager.Object, allowedRedirects);
            urlHelper.Setup(x => x.Content("~/")).Returns("https://example.com/");
            sut.Url = urlHelper.Object;

            var result = await sut.OnGetAsync("my-user-id", "bXktdXNlci1jb2Rl", returnUrl);

            result.Should().BeOfType<PageResult>();
            sut.RedirectUrl.Should().Be(returnUrl);
        }



    }
}
