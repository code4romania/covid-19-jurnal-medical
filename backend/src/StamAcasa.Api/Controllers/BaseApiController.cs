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

        protected async Task<bool> IsRequestInvalid(string subClaimValue, int? requestedId = null)
        {
            var user = await UserService.GetUserInfoBySub(subClaimValue);
            var familyMembersIds = await UserService.GetFamilyMembersIds(subClaimValue);
            var allowedRequestIds = new List<int>(familyMembersIds ?? new List<int>());

            if (user != null)
            {
                allowedRequestIds.Add(user.Id);
            }

            if (requestedId.HasValue && !allowedRequestIds.Contains(requestedId.Value))
            {
                return true;
            }

            return false;
        }
    }
}
