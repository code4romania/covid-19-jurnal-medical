
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using StamAcasa.Api.Controllers;
using StamAcasa.Api.Services;
using StamAcasa.Common.DTO;
using StamAcasa.Common.Services;
using Xunit;

namespace StamAcasa.Api.Tests
{
    public class FormPostAnswerShould : ControllerBaseTest<FormController>
    {
        private readonly Mock<IFileService> _fileServiceMock = new Mock<IFileService>();
        private readonly Mock<IFormService> _formServiceMock = new Mock<IFormService>();
        private readonly Mock<IUserService> _userServiceMock = new Mock<IUserService>();

        private string form = @"
        {
	        ""formId"":1,
	        ""timestamp"":1590514591645,
	        ""answers"":[
		        {
			        ""id"":1,
			        ""questionText"":""Ai avut febră 38 grade celsius sau mai mare?"",
			        ""answer"":""false""
		        },
		        {
			        ""id"":2,
			        ""questionText"":""Din ce dată ai avut prima dată febră?""
		        },
		        {
			        ""id"":3,
			        ""questionText"":""Ai avut durere în gât și/sau dificultate în a înghiți?"",
			        ""answer"":""false""
		        },
		        {
			        ""id"":4,
			        ""questionText"":""Din ce dată ai avut durere în gât și/sau dificultate în a înghiți?""
		        },
		        {
			        ""id"":5,
			        ""questionText"":""Ai avut tuse intensă?"",
			        ""answer"":""false""
		        },
		        {
			        ""id"":6,
			        ""questionText"":""Din ce data ai avut tuse?""
		        },
		        {
			        ""id"":7,
			        ""questionText"":""Ai avut dificultate în a respira?"",
			        ""answer"":""false""
		        },
		        {
			        ""id"":8,
			        ""questionText"":""Din ce dată ai avut dificultate în a respira?""
		        },
		        {
			        ""id"":9,
			        ""questionText"":""Ți-a curs nasul?"",
			        ""answer"":""false""
		        },
		        {
			        ""id"":10,
			        ""questionText"":""Din ce dată ţi-a curs nasul?""
		        },
		        {
			        ""id"":11,
			        ""questionText"":""Alte simptome:"",
			        ""answer"":""false""
		        },
		        {
			        ""id"":12,
			        ""questionText"":""Te rugăm să le descrii""
		        },
		        {
			        ""id"":13,
			        ""questionText"":""În momentul de față, te afli în izolare la domiciliu?"",
			        ""answer"":""1""
		        },
		        {
			        ""id"":14,
			        ""questionText"":""În momentul de față, împarți locuința și cu alte persoane?"",
			        ""answer"":""false""
		        },
		        {
			        ""id"":15,
			        ""questionText"":""Celelalte persoane din locuință se află în izolare la domiciliu?"",
			        ""answer"":""undefined""
		        },
		        {
			        ""id"":16,
			        ""questionText"":""Ai ieșit din casă de la ultima completare a formularului?"",
			        ""answer"":""false""
		        },
		        {
			        ""id"":17,
			        ""questionText"":""Care a fost motivul deplasării?""
		        },
		        {
			        ""id"":18,
			        ""questionText"":""Data și ora plecării:""
		        },
		        {
			        ""id"":19,
			        ""questionText"":""Data și ora sosirii:""
		        },
		        {
			        ""id"":20,
			        ""questionText"":""Ai fost în contact direct cu o persoană diagnosticată/confirmată cu noul coronavirus?"",
			        ""answer"":""false""
		        }
	        ]
        }
        ";
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
        public async Task Return_UnauthorizedResult_when_no_user_found()
        {
            var user = GetClaimsPrincipal(new[] { new Claim("sub", string.Empty) });
            SetUserInControllerContext(user);

            _userServiceMock
                .Setup(x => x.GetFamilyMembersIds("836486E9-9A55-4513-A525-5FE0A84D3DA5"))
                .ReturnsAsync(new List<int>());

            _userServiceMock
                .Setup(x => x.GetUserInfo("836486E9-9A55-4513-A525-5FE0A84D3DA5"))
                .ReturnsAsync(null as UserInfo);

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
                .Setup(x => x.GetUserInfo("836486E9-9A55-4513-A525-5FE0A84D3DA5"))
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

            var result = await _sut.PostAnswer(form, null);

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
                .Setup(x => x.GetUserInfo("836486E9-9A55-4513-A525-5FE0A84D3DA5"))
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

            var result = await _sut.PostAnswer(form, requestedId);

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
                .Setup(x => x.GetUserInfo("836486E9-9A55-4513-A525-5FE0A84D3DA5"))
                .ReturnsAsync(new UserInfo() { Id = 666 });

            var result = await _sut.PostAnswer(form, requestedId);

            result.Should().BeOfType<UnauthorizedResult>();
        }
    }
}
