using AutoMapper;
using StamAcasa.Common.Models;

namespace StamAcasa.Common {
    public class UserMappingProfile : Profile{
        public UserMappingProfile()
        {
            CreateMap<UserModel, User>();
        }
    }
}
