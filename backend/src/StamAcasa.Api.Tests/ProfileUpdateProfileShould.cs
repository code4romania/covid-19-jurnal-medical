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
    public class ProfileUpdateProfileShould : ControllerBaseTest<ProfileController>
    {
        private readonly Mock<IUserService> _userServiceMock = new Mock<IUserService>();

        public ProfileUpdateProfileShould()
        {
            _sut = new ProfileController(_userServiceMock.Object);
        }

        [Fact]
        public async Task Return_UnauthorizedResult_when_sub_is_not_in_claims()
        {
            var user = GetClaimsPrincipal();
            SetUserInControllerContext(user);

            var result = await _sut.UpdateProfile(1, new UserProfileDTO());
            result.Should().BeOfType<UnauthorizedResult>();
        }

        [Fact]
        public async Task Return_UnauthorizedResult_when_sub_is_empty()
        {
            var user = GetClaimsPrincipal(new[] { new Claim("sub", string.Empty) });
            SetUserInControllerContext(user);

            var result = await _sut.UpdateProfile(1, new UserProfileDTO());
            result.Should().BeOfType<UnauthorizedResult>();
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async Task Not_update_profile_when_request_is_made_for_family_member(int requestedId)
        {
            var user = GetClaimsPrincipal(new[] { new Claim("sub", "my-random-value") });
            SetUserInControllerContext(user);

            _userServiceMock
                .Setup(x => x.GetFamilyMembersIds("my-random-value"))
                .ReturnsAsync(new List<int>() { 1, 2, 3 });

            _userServiceMock
                .Setup(x => x.GetUserInfoBySub("my-random-value"))
                .ReturnsAsync(new UserInfo()
                {
                    Id = 1222
                });

            _userServiceMock
                .Setup(x => x.AddOrUpdateUserInfo(It.Is<UserProfileDTO>(dto =>
                    dto.Id == requestedId && dto.Sub == "my-random-value")))
                .ReturnsAsync(new UserInfo()
                {
                    Id = requestedId
                });


            var result = await _sut.UpdateProfile(requestedId, new UserProfileDTO());

            result.Should().BeOfType<StatusCodeResult>().Which.StatusCode.Should().Be(403);
        }

        [Fact]
        public async Task Update_profile_when_request_is_made_for_self()
        {
            var user = GetClaimsPrincipal(new[] { new Claim("sub", "my-random-value") });
            SetUserInControllerContext(user);

            _userServiceMock
                .Setup(x => x.GetFamilyMembersIds("my-random-value"))
                .ReturnsAsync(new List<int>() { 1, 2, 3 });

            _userServiceMock
                .Setup(x => x.GetUserInfoBySub("my-random-value"))
                .ReturnsAsync(new UserInfo()
                {
                    Id = 1222
                });

            _userServiceMock
                .Setup(x => x.AddOrUpdateUserInfo(It.Is<UserProfileDTO>(dto => dto.Id == 1222 && dto.Sub == "my-random-value")))
                .ReturnsAsync(new UserInfo()
                {
                    Id = 1222
                })
                .Verifiable();


            var result = await _sut.UpdateProfile(1222, new UserProfileDTO());

            result.Should().BeOfType<OkObjectResult>();
            _userServiceMock.Verify();
        }
    }
}

