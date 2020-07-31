
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using StamAcasa.Api.Controllers;
using StamAcasa.Api.Models;
using StamAcasa.Api.Services;
using StamAcasa.Common.DTO;
using StamAcasa.Common.Models;
using StamAcasa.Common.Services;
using Xunit;

namespace StamAcasa.Api.Tests
{
    public class FormPostAnswerShould : ControllerBaseTest<FormController>
    {
        private readonly Mock<IFileService> _fileServiceMock = new Mock<IFileService>();
        private readonly Mock<IFormService> _formServiceMock = new Mock<IFormService>();
        private readonly Mock<IUserService> _userServiceMock = new Mock<IUserService>();

        private readonly UserForm _form = new UserForm();

        public FormPostAnswerShould()
        {
            _sut = new FormController(_fileServiceMock.Object, _formServiceMock.Object, _userServiceMock.Object, null);
        }

        [Fact]
        public async Task Return_UnauthorizedResult_when_sub_is_not_in_claims()
        {
            var user = GetClaimsPrincipal();
            SetUserInControllerContext(user);

            var result = await _sut.PostAnswer(null);
            result.Should().BeOfType<UnauthorizedResult>();
        }

        [Fact]
        public async Task Return_UnauthorizedResult_when_sub_is_empty()
        {
            var user = GetClaimsPrincipal(new[] { new Claim("sub", string.Empty) });
            SetUserInControllerContext(user);

            var result = await _sut.PostAnswer(null);
            result.Should().BeOfType<UnauthorizedResult>();
        }

        [Fact]
        public async Task Post_form_when_request_is_made_for_current_user()
        {
            var user = GetClaimsPrincipal(new[] { new Claim("sub", "836486E9-9A55-4513-A525-5FE0A84D3DA5") });
            SetUserInControllerContext(user);

            _userServiceMock
                .Setup(x => x.GetFamilyMembersIds("836486E9-9A55-4513-A525-5FE0A84D3DA5"))
                .ReturnsAsync(new List<int>());

            _userServiceMock
                .Setup(x => x.GetUserInfoBySub("836486E9-9A55-4513-A525-5FE0A84D3DA5"))
                .ReturnsAsync(new UserInfo()
                {
                    Id = 1222
                });

            _formServiceMock
                .Setup(x => x.AddForm(It.IsAny<FormInfo>()))
                .ReturnsAsync(true)
                .Verifiable();
            _fileServiceMock.Setup(x => x.SaveRawData(It.IsAny<string>(), It.IsAny<string>()))
                .Returns(Task.CompletedTask)
                .Verifiable();

            var result = await _sut.PostAnswer(_form, null);

            _fileServiceMock.Verify();
            _formServiceMock.Verify();
            result.Should().BeOfType<OkObjectResult>();
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        [InlineData(1222)]
        public async Task Allow_posting_forms_for_non_family_users(int requestedId)
        {
            var user = GetClaimsPrincipal(new[] { new Claim("sub", "836486E9-9A55-4513-A525-5FE0A84D3DA5") });
            SetUserInControllerContext(user);

            _userServiceMock
                .Setup(x => x.GetFamilyMembersIds("836486E9-9A55-4513-A525-5FE0A84D3DA5"))
                .ReturnsAsync(new List<int>() { 1, 2, 3 });

            _userServiceMock
                .Setup(x => x.GetUserInfoBySub("836486E9-9A55-4513-A525-5FE0A84D3DA5"))
                .ReturnsAsync(new UserInfo()
                {
                    Id = 1222
                });

            _formServiceMock
                .Setup(x => x.AddForm(It.IsAny<FormInfo>()))
                .ReturnsAsync(true)
                .Verifiable();
            _fileServiceMock.Setup(x => x.SaveRawData(It.IsAny<string>(), It.IsAny<string>()))
                .Returns(Task.CompletedTask)
                .Verifiable();

            var result = await _sut.PostAnswer(_form, requestedId);

            _fileServiceMock.Verify();
            _formServiceMock.Verify();
            result.Should().BeOfType<OkObjectResult>();
        }

        [Theory]
        [InlineData(1, new int[] { })]
        [InlineData(1, new int[] { 2, 3 })]
        public async Task Not_allow_posting_forms_for_non_family_users(int? requestedId, int[] familyIds)
        {
            var user = GetClaimsPrincipal(new[] { new Claim("sub", "836486E9-9A55-4513-A525-5FE0A84D3DA5") });
            SetUserInControllerContext(user);

            _userServiceMock
                .Setup(x => x.GetFamilyMembersIds("836486E9-9A55-4513-A525-5FE0A84D3DA5"))
                .ReturnsAsync(familyIds?.ToList());

            _userServiceMock
                .Setup(x => x.GetUserInfoBySub("836486E9-9A55-4513-A525-5FE0A84D3DA5"))
                .ReturnsAsync(new UserInfo() { Id = 666 });

            var result = await _sut.PostAnswer(_form, requestedId);

            result.Should().BeOfType<UnauthorizedResult>();
        }
    }
}
