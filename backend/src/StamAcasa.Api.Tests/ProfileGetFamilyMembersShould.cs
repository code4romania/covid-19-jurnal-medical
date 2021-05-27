using System.Collections.Generic;
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
    public class ProfileGetFamilyMembersShould : ControllerBaseTest<ProfileController>
    {
        private readonly Mock<IUserService> _userServiceMock = new Mock<IUserService>();

        public ProfileGetFamilyMembersShould()
        {
            _sut = new ProfileController(_userServiceMock.Object);
        }


        [Fact]
        public async Task Return_UnauthorizedResult_when_sub_is_not_in_claims()
        {
            var user = GetClaimsPrincipal();
            SetUserInControllerContext(user);

            var result = await _sut.GetFamilyMembers();
            result.Should().BeOfType<UnauthorizedResult>();
        }

        [Fact]
        public async Task Return_UnauthorizedResult_when_sub_is_empty()
        {
            var user = GetClaimsPrincipal(new[] { new Claim("sub", string.Empty) });
            SetUserInControllerContext(user);

            var result = await _sut.GetFamilyMembers();
            result.Should().BeOfType<UnauthorizedResult>();
        }

        [Fact]
        public async Task Return_family_members_when_request_is_made_for_current_user()
        {
            var user = GetClaimsPrincipal(new[] { new Claim("sub", "my-random-value") });
            SetUserInControllerContext(user);

            _userServiceMock
                .Setup(x => x.GetFamilyMembersIds("my-random-value"))
                .ReturnsAsync(new List<int>());

            _userServiceMock
                .Setup(x => x.GetUserInfoBySub("my-random-value"))
                .ReturnsAsync(new UserInfo()
                {
                    Id = 23233
                });

            _userServiceMock
                .Setup(x => x.GetDependentInfo("my-random-value"))
                .ReturnsAsync(new List<UserInfo>())
                .Verifiable();


            var result = await _sut.GetFamilyMembers();

            result.Should().BeOfType<OkObjectResult>();
            _userServiceMock.Verify();
        }
    }
}