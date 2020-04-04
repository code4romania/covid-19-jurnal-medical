using AutoMapper;
using StamAcasa.Common.DTO;
using StamAcasa.Common.Models;

namespace StamAcasa.Common {
    public class UserMappingProfile : Profile {
        public UserMappingProfile() {
            CreateMap<UserProfileDTO, User>();
        }
    }
    public class UserInfoMappingProfile : Profile {
        public UserInfoMappingProfile() {
            CreateMap<User, UserInfo>();
        }
    }
}
