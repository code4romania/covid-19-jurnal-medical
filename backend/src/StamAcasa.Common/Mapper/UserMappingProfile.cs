using AutoMapper;
using StamAcasa.Common.Models;

namespace StamAcasa.Common {
    public class UserMappingProfile : Profile{
        public UserMappingProfile()
        {
            CreateMap<UserModel, User>();
        }
    }
    public class UserInfoMappingProfile : Profile {
        public UserInfoMappingProfile() {
            CreateMap<User, UserInfo>();
        }
    }
}
