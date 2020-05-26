using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using StamAcasa.Api.Controllers;
using StamAcasa.Common.DTO;
using StamAcasa.Common.Services;
using Xunit;

namespace StamAcasa.Api.Tests
{
    public class FormGetShould : ControllerBaseTest<FormController>
    {
        private readonly Mock<IFormService> _formServiceMock = new Mock<IFormService>();

        private readonly Mock<IUserService> _userServiceMock = new Mock<IUserService>();
        public FormGetShould()
        {
            _sut = new FormController(null, _formServiceMock.Object, _userServiceMock.Object, null);
        }

        [Fact]
        public async Task Return_UnauthorizedResult_when_sub_is_not_in_claims()
        {
            var user = GetClaimsPrincipal();
            SetUserInControllerContext(user);

            var result = await _sut.Get(null);
            result.Should().BeOfType<UnauthorizedResult>();
        }

        [Fact]
        public async Task Return_UnauthorizedResult_when_sub_is_empty()
        {
            var user = GetClaimsPrincipal(new[] { new Claim("sub", string.Empty) });
            SetUserInControllerContext(user);

            var result = await _sut.Get(null);
            result.Should().BeOfType<UnauthorizedResult>();
        }

        [Fact]
        public async Task Return_UnauthorizedResult_when_no_user_found()
        {
            var user = GetClaimsPrincipal(new[] { new Claim("sub", string.Empty) });
            SetUserInControllerContext(user);

            _userServiceMock
                .Setup(x => x.GetFamilyMembersIds("my-random-value"))
                .ReturnsAsync(new List<int>());

            _userServiceMock
                .Setup(x => x.GetUserInfo("my-random-value"))
                .ReturnsAsync(null as UserInfo);

            var result = await _sut.Get(null);
            result.Should().BeOfType<UnauthorizedResult>();
        }

        [Fact]
        public async Task Return_form_when_request_is_made_for_current_user()
        {
            var user = GetClaimsPrincipal(new[] { new Claim("sub", "my-random-value") });
            SetUserInControllerContext(user);

            _userServiceMock
                .Setup(x => x.GetFamilyMembersIds("my-random-value"))
                .ReturnsAsync(new List<int>());

            _userServiceMock
                .Setup(x => x.GetUserInfo("my-random-value"))
                .ReturnsAsync(new UserInfo()
                {
                    Id = 1222
                });

            _formServiceMock
                .Setup(x => x.GetForms("my-random-value"))
                .ReturnsAsync(new List<FormInfo>())
                .Verifiable();


            var result = await _sut.Get(null);

            _formServiceMock.Verify();
            result.Should().BeOfType<OkObjectResult>();
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        [InlineData(1222)]
        public async Task Return_form_when_request_is_made_for_family_member(int requestedId)
        {
            var user = GetClaimsPrincipal(new[] { new Claim("sub", "my-random-value") });
            SetUserInControllerContext(user);

            _userServiceMock
                .Setup(x => x.GetFamilyMembersIds("my-random-value"))
                .ReturnsAsync(new List<int>() { 1, 2, 3 });

            _userServiceMock
                .Setup(x => x.GetUserInfo("my-random-value"))
                .ReturnsAsync(new UserInfo()
                {
                    Id = 1222
                });

            _formServiceMock
                .Setup(x => x.GetForms(requestedId))
                .ReturnsAsync(new List<FormInfo>())
                .Verifiable();

            var result = await _sut.Get(requestedId);

            _formServiceMock.Verify();
            result.Should().BeOfType<OkObjectResult>();
        }

        [Theory]
        [InlineData(1, new int[] { })]
        [InlineData(1, new int[] { 2, 3 })]
        public async Task Not_allow_getting_assessment_for_non_family_users(int? requestedId, int[] familyIds)
        {
            var user = GetClaimsPrincipal(new[] { new Claim("sub", "my-random-value") });
            SetUserInControllerContext(user);

            _userServiceMock
                .Setup(x => x.GetFamilyMembersIds("my-random-value"))
                .ReturnsAsync(familyIds?.ToList());

            _userServiceMock
                .Setup(x => x.GetUserInfo("my-random-value"))
                .ReturnsAsync(new UserInfo() { Id = 666 });

            var result = await _sut.Get(requestedId);

            result.Should().BeOfType<UnauthorizedResult>();
        }
    }
}
