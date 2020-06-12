using System.Threading.Tasks;
using AutoFixture;
using AutoFixture.AutoMoq;
using AutoFixture.Xunit2;
using FluentAssertions;
using IdentityServer.Data;
using IdentityServer.Pages.Account;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Routing;
using Moq;
using Xunit;

namespace StamAcasa.IdentityServer.Tests
{
    public class ResetPasswordShould
    {
        [Theory, AutoMoqData]
        public async Task Return_Page_when_modelstate_is_invalid(
            [Frozen] Mock<UserManager<ApplicationUser>> userManager,
            Mock<IPasswordHasher<ApplicationUser>> passwordHasher,
            PasswordValidationMessages messages)
        {
            var httpContext = new DefaultHttpContext();
            var modelState = new ModelStateDictionary();
            var actionContext = new ActionContext(httpContext, new RouteData(), new PageActionDescriptor(), modelState);
            var modelMetadataProvider = new EmptyModelMetadataProvider();
            var viewData = new ViewDataDictionary(modelMetadataProvider, modelState);
            var pageContext = new PageContext(actionContext)
            {
                ViewData = viewData
            };


            ResetPasswordModel sut = new ResetPasswordModel(userManager.Object, messages, passwordHasher.Object)
            {
                PageContext = pageContext
            };

            sut.ModelState.AddModelError("Message.Text", "The Text field is required.");

            var result = await sut.OnPostAsync();
            result.Should().BeOfType<PageResult>();

        }

        [Theory, AutoMoqData]
        public async Task Redirect_to_confirmation_page_when_no_user_found(
            ResetPasswordModel.InputModel model,
            [Frozen]Mock<UserManager<ApplicationUser>> userManager,
            Mock<IPasswordHasher<ApplicationUser>> passwordHasher,
            PasswordValidationMessages messages)
        {
            ResetPasswordModel sut = new ResetPasswordModel(userManager.Object, messages, passwordHasher.Object);
            sut.Input = model;
            userManager.Setup(x => x.FindByEmailAsync(model.Email)).ReturnsAsync(() => null);
            var result = await sut.OnPostAsync();

            result.Should().BeOfType<RedirectToPageResult>().Which.PageName.Should().Be("./ResetPasswordConfirmation");
        }

        [Theory, AutoMoqData]
        public async Task Invalidate_password_when_using_same_password_as_current_one(
            ResetPasswordModel.InputModel model,
            [Frozen]Mock<UserManager<ApplicationUser>> userManager,
            [Frozen]Mock<IPasswordHasher<ApplicationUser>> passwordHasher,
            PasswordValidationMessages messages)
        {
            ResetPasswordModel sut = new ResetPasswordModel(userManager.Object, messages, passwordHasher.Object);
            sut.Input = model;
            var currentUser = new ApplicationUser
            {
                PasswordHash = "myBase64PasswordHash=="
            };
            userManager.Setup(x => x.FindByEmailAsync(model.Email)).ReturnsAsync(currentUser);

            passwordHasher.Setup(x => x.VerifyHashedPassword(currentUser, "myBase64PasswordHash==", model.Password))
                .Returns(PasswordVerificationResult.Success);

            var result = await sut.OnPostAsync();

            result.Should().BeOfType<PageResult>();

            sut.ModelState.Count.Should().Be(1);
            sut.ModelState.IsValid.Should().Be(false);
            sut.ModelState[""].Errors[0].ErrorMessage.Should().Be("Nu poti folosi o parola folosita in trecut");
            userManager.Verify(x => x.ResetPasswordAsync(currentUser, model.Code, model.Password), Times.Never);
        }


        [Theory]
        [InlineAutoMoqData("password1", PasswordVerificationResult.SuccessRehashNeeded)]
        [InlineAutoMoqData("password2", PasswordVerificationResult.SuccessRehashNeeded)]
        [InlineAutoMoqData("password3", PasswordVerificationResult.SuccessRehashNeeded)]
        [InlineAutoMoqData("password4", PasswordVerificationResult.SuccessRehashNeeded)]
        [InlineAutoMoqData("password5", PasswordVerificationResult.SuccessRehashNeeded)]

        [InlineAutoMoqData("password1", PasswordVerificationResult.Success)]
        [InlineAutoMoqData("password2", PasswordVerificationResult.Success)]
        [InlineAutoMoqData("password3", PasswordVerificationResult.Success)]
        [InlineAutoMoqData("password4", PasswordVerificationResult.Success)]
        [InlineAutoMoqData("password5", PasswordVerificationResult.Success)]
        public async Task Invalidate_password_when_using_same_password_as_5_previous(
            string inputPassword,
            PasswordVerificationResult hasherResponse,
            ResetPasswordModel.InputModel model,
            [Frozen]Mock<UserManager<ApplicationUser>> userManager,
            [Frozen]Mock<IPasswordHasher<ApplicationUser>> passwordHasher,
            PasswordValidationMessages messages)
        {
            ResetPasswordModel sut = new ResetPasswordModel(userManager.Object, messages, passwordHasher.Object);
            model.Password = inputPassword;

            sut.Input = model;
            var currentUser = new ApplicationUser
            {
                PasswordHash = "password5Hash==",
                PreviousPasswords = "password1Hash==;password2Hash==;password3Hash==;password4Hash==;"
            };
            userManager.Setup(x => x.FindByEmailAsync(model.Email)).ReturnsAsync(currentUser);

            passwordHasher.Setup(x => x.VerifyHashedPassword(currentUser, It.IsAny<string>(), model.Password))
                .Returns((ApplicationUser user, string hashedPassword, string password) => hashedPassword.StartsWith(password) ? hasherResponse : PasswordVerificationResult.Failed);

            var result = await sut.OnPostAsync();

            result.Should().BeOfType<PageResult>();

            sut.ModelState.Count.Should().Be(1);
            sut.ModelState.IsValid.Should().Be(false);
            sut.ModelState[""].Errors[0].ErrorMessage.Should().Be("Nu poti folosi o parola folosita in trecut");
            userManager.Verify(x => x.ResetPasswordAsync(currentUser, model.Code, model.Password), Times.Never);
        }


        [Theory, AutoMoqData]
        public async Task Return_errors_received_when_changing_password(
            ResetPasswordModel.InputModel model,
            [Frozen]Mock<UserManager<ApplicationUser>> userManager,
            [Frozen]Mock<IPasswordHasher<ApplicationUser>> passwordHasher,
            [Frozen]Mock<PasswordValidationMessages> messages)
        {
            ResetPasswordModel sut = new ResetPasswordModel(userManager.Object, messages.Object, passwordHasher.Object);
            sut.Input = model;
            var currentUser = new ApplicationUser
            {
                PasswordHash = "myBase64PasswordHash=="
            };
            userManager.Setup(x => x.FindByEmailAsync(model.Email)).ReturnsAsync(currentUser);
            var identityError1 = new IdentityError() { Code = "code1", Description = "description1" };
            var identityError2 = new IdentityError() { Code = "code2", Description = "description2" };

            userManager.Setup(x => x.ResetPasswordAsync(currentUser, model.Code, model.Password))
                .ReturnsAsync(IdentityResult.Failed(identityError1, identityError2));

            passwordHasher.Setup(x => x.VerifyHashedPassword(currentUser, "myBase64PasswordHash==", model.Password))
                .Returns(PasswordVerificationResult.Failed);

            messages.Setup(x => x.GetMessageByCode(identityError1)).Returns("message 1").Verifiable();
            messages.Setup(x => x.GetMessageByCode(identityError2)).Returns("message 2").Verifiable();
            var result = await sut.OnPostAsync();

            result.Should().BeOfType<PageResult>();

            sut.ModelState.Count.Should().Be(1);
            sut.ModelState.IsValid.Should().Be(false);
            sut.ModelState[""].Errors.Count.Should().Be(2);
            sut.ModelState[""].Errors[0].ErrorMessage.Should().Be("message 1");
            sut.ModelState[""].Errors[1].ErrorMessage.Should().Be("message 2");
            messages.Verify();
        }


        [Theory]
        [InlineAutoMoqData(null, "currentPasswordHash==")]
        [InlineAutoMoqData("", "currentPasswordHash==")]
        [InlineAutoMoqData("password1Hash==", "password1Hash==;currentPasswordHash==")]
        [InlineAutoMoqData("password1Hash==;password2Hash==;", "password1Hash==;password2Hash==;currentPasswordHash==")]
        [InlineAutoMoqData("password1Hash==;password2Hash==;password3Hash==;", "password1Hash==;password2Hash==;password3Hash==;currentPasswordHash==")]
        [InlineAutoMoqData("password1Hash==;password2Hash==;password3Hash==;password4Hash==;", "password1Hash==;password2Hash==;password3Hash==;password4Hash==;currentPasswordHash==")]
        [InlineAutoMoqData("password1Hash==;password2Hash==;password3Hash==;password4Hash==;password5Hash==;", "password2Hash==;password3Hash==;password4Hash==;password5Hash==;currentPasswordHash==")]
        public async Task After_updating_password_should_keep_previous_5_passwords(
          string previousPasswords,
          string expectedPreviousPasswords,
          ResetPasswordModel.InputModel model,
          [Frozen]Mock<UserManager<ApplicationUser>> userManager,
          [Frozen]Mock<IPasswordHasher<ApplicationUser>> passwordHasher,
          PasswordValidationMessages messages)
        {
            ResetPasswordModel sut = new ResetPasswordModel(userManager.Object, messages, passwordHasher.Object);

            sut.Input = model;
            var currentUser = new ApplicationUser
            {
                PasswordHash = "currentPasswordHash==",
                PreviousPasswords = previousPasswords
            };

            var userWithUpdatedPassword = new ApplicationUser
            {
                PasswordHash = "newPasswordHash==",
                PreviousPasswords = previousPasswords
            };

            userManager.SetupSequence(x => x.FindByEmailAsync(model.Email))
                .ReturnsAsync(currentUser)
                .ReturnsAsync(userWithUpdatedPassword);

            userManager.Setup(x => x.ResetPasswordAsync(currentUser, model.Code, model.Password))
                .ReturnsAsync(IdentityResult.Success);

            userManager.Setup(x => x.UpdateAsync(It.Is<ApplicationUser>(x =>
                    x.PasswordHash == "newPasswordHash==" && x.PreviousPasswords == expectedPreviousPasswords)))
                .ReturnsAsync(IdentityResult.Success)
                .Verifiable();

            passwordHasher.Setup(x => x.VerifyHashedPassword(currentUser, It.IsAny<string>(), model.Password))
                .Returns(PasswordVerificationResult.Failed);
            var result = await sut.OnPostAsync();

            userManager.Verify();
            result.Should().BeOfType<RedirectToPageResult>().Which.PageName.Should().Be("./ResetPasswordConfirmation");

        }
    }
}
