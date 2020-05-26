using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StamAcasa.Common.Services;

namespace StamAcasa.Api.Controllers
{
    public class BaseApiController : ControllerBase
    {
        protected readonly IUserService UserService;

        public BaseApiController(IUserService userService)
        {
            UserService = userService;
        }

        public async Task<bool> IsRequestInvalid(string subClaimValue, int? requestedId = null)
        {
            var user = await UserService.GetUserInfo(subClaimValue);
            if (user == null)
            {
                return true;
            }

            var familyMembersIds = await UserService.GetFamilyMembersIds(subClaimValue);
            var allowedRequestIds = new List<int>(familyMembersIds) { user.Id };

            if (requestedId.HasValue && !allowedRequestIds.Contains(requestedId.Value))
            {
                return true;
            }

            return false;
        }
    }
}
