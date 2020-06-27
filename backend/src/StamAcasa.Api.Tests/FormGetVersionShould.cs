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
    public class FormGetVersionShould : ControllerBaseTest<FormController>
    {
        private readonly Mock<IAssessmentService> _assessmentServiceMock = new Mock<IAssessmentService>();
        private readonly Mock<IUserService> _userServiceMock = new Mock<IUserService>();
        public FormGetVersionShould()
        {
            _sut = new FormController(null, null, _userServiceMock.Object, _assessmentServiceMock.Object);
        }

        [Fact]
        public async Task Return_UnauthorizedResult_when_sub_is_not_in_claims()
        {
            var user = GetClaimsPrincipal();
            SetUserInControllerContext(user);

            var result = await _sut.GetVersion(null);
            result.Should().BeOfType<UnauthorizedResult>();
        }

        [Fact]
        public async Task Return_UnauthorizedResult_when_sub_is_empty()
        {
            var user = GetClaimsPrincipal(new[] { new Claim("sub", string.Empty) });
            SetUserInControllerContext(user);

            var result = await _sut.GetVersion(null);
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
                .Setup(x => x.GetUserInfoBySub("my-random-value"))
                .ReturnsAsync(null as UserInfo);

            var result = await _sut.GetVersion(null);
            result.Should().BeOfType<UnauthorizedResult>();
        }

        [Fact]
        public async Task Return_assessment_when_request_is_made_for_current_user()
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
                    Id = 1222
                });

            _assessmentServiceMock
                .Setup(x => x.GetAssessment("my-random-value", null))
                .ReturnsAsync(new AssessmentDTO()
                {
                    Content = "my assessment content"
                })
                .Verifiable();

            var result = await _sut.GetVersion(null);

            _assessmentServiceMock.Verify();
            result.Should().BeOfType<OkObjectResult>();
        }


        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        [InlineData(1222)]
        public async Task Allow_getting_assessment_for_non_family_users(int requestedId)
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

            _assessmentServiceMock
                .Setup(x => x.GetAssessment("my-random-value", requestedId))
                .ReturnsAsync(new AssessmentDTO()
                {
                    Content = "my assessment content"
                })
                .Verifiable();

            var result = await _sut.GetVersion(requestedId);

            _assessmentServiceMock.Verify();
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
                .Setup(x => x.GetUserInfoBySub("my-random-value"))
                .ReturnsAsync(new UserInfo() { Id = 666 });

            var result = await _sut.GetVersion(requestedId);

            result.Should().BeOfType<UnauthorizedResult>();
        }
    }
}
