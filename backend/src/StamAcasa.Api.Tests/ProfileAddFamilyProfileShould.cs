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
    public class ProfileAddFamilyProfileShould : ControllerBaseTest<ProfileController>
    {
        private readonly Mock<IUserService> _userServiceMock = new Mock<IUserService>();

        public ProfileAddFamilyProfileShould()
        {
            _sut = new ProfileController(_userServiceMock.Object);
        }

        [Fact]
        public async Task Return_UnauthorizedResult_when_sub_is_not_in_claims()
        {
            var user = GetClaimsPrincipal();
            SetUserInControllerContext(user);

            var result = await _sut.AddFamilyProfile(new UserProfileDTO());
            result.Should().BeOfType<UnauthorizedResult>();
        }

        [Fact]
        public async Task Return_UnauthorizedResult_when_sub_is_empty()
        {
            var user = GetClaimsPrincipal(new[] { new Claim("sub", string.Empty) });
            SetUserInControllerContext(user);

            var result = await _sut.AddFamilyProfile(new UserProfileDTO());
            result.Should().BeOfType<UnauthorizedResult>();
        }

        [Fact]
        public async Task Return_bad_request_when_model_is_empty()
        {
            var user = GetClaimsPrincipal(new[] { new Claim("sub", "my-sub") });
            SetUserInControllerContext(user);

            var result = await _sut.AddFamilyProfile(null);
            result.Should().BeOfType<BadRequestObjectResult>();
        }

        [Fact]
        public async Task Return_not_found_when_adding_family_member_for_non_saved_user()
        {
            var user = GetClaimsPrincipal(new[] { new Claim("sub", "my-random-value") });
            SetUserInControllerContext(user);

            _userServiceMock
                .Setup(x => x.GetFamilyMembersIds("my-random-value"))
                .ReturnsAsync(new List<int>());

            _userServiceMock
                .Setup(x => x.GetUserInfoBySub("my-random-value"))
                .ReturnsAsync(null as UserInfo);

            var result = await _sut.AddFamilyProfile(new UserProfileDTO());
            result.Should().BeOfType<NotFoundObjectResult>().Which.Value.Should().Be("Could not find parent user");
        }

        [Fact]
        public async Task Add_a_family_member_when_request_is_valid()
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
                .Setup(x => x.AddOrUpdateDependentInfo(It.Is<UserProfileDTO>(x => x.Name == "New family member"), "my-random-value"))
                .ReturnsAsync(new UserInfo())
                .Verifiable();


            var result = await _sut.AddFamilyProfile(new UserProfileDTO()
            {
                Name = "New family member"
            });

            result.Should().BeOfType<OkObjectResult>();
            _userServiceMock.Verify();
        }


    }
}