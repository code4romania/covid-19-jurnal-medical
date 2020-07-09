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
    public class ProfileSaveCurrentProfileShould : ControllerBaseTest<ProfileController>
    {

        private readonly Mock<IUserService> _userServiceMock = new Mock<IUserService>();

        public ProfileSaveCurrentProfileShould()
        {
            _sut = new ProfileController(_userServiceMock.Object);
        }

        [Fact]
        public async Task Return_UnauthorizedResult_when_sub_is_not_in_claims()
        {
            var user = GetClaimsPrincipal();
            SetUserInControllerContext(user);

            var result = await _sut.SaveCurrentProfile(new UserProfileDTO());
            result.Should().BeOfType<UnauthorizedResult>();
        }

        [Fact]
        public async Task Return_UnauthorizedResult_when_sub_is_empty()
        {
            var user = GetClaimsPrincipal(new[] { new Claim("sub", string.Empty) });
            SetUserInControllerContext(user);

            var result = await _sut.SaveCurrentProfile(new UserProfileDTO());
            result.Should().BeOfType<UnauthorizedResult>();
        }

        [Fact]
        public async Task Save_profile_for_newly_created_user()
        {
            var user = GetClaimsPrincipal(new[] { new Claim("sub", "my-random-value") });
            SetUserInControllerContext(user);

            _userServiceMock
                .Setup(x => x.GetFamilyMembersIds("my-random-value"))
                .ReturnsAsync(new List<int>());

            _userServiceMock
                .Setup(x => x.GetUserInfoBySub("my-random-value"))
                .ReturnsAsync(null as UserInfo).Verifiable();

            var result = await _sut.SaveCurrentProfile(new UserProfileDTO());
            result.Should().BeOfType<OkObjectResult>();
        }

        [Fact]
        public async Task Update_profile_when_request_is_made_for_self()
        {
            var user = GetClaimsPrincipal(new[] { new Claim("sub", "my-random-value"), new Claim("email", "email@mail.com"), });
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
                .Setup(x => x.AddOrUpdateUserInfo(It.Is<UserProfileDTO>(dto => dto.Sub == "my-random-value" && dto.Email == "email@mail.com")))
                .ReturnsAsync(new UserInfo()
                {
                    Id = 1222
                })
                .Verifiable();


            var result = await _sut.SaveCurrentProfile(new UserProfileDTO());

            result.Should().BeOfType<OkObjectResult>();
            _userServiceMock.Verify();
        }

    }
}