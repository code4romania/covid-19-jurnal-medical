using AutoMapper;
using Newtonsoft.Json;
using StamAcasa.Common.DTO;
using StamAcasa.Common.Models;

namespace StamAcasa.Common {
    public class UserMappingProfile : Profile {
        public UserMappingProfile() {
            CreateMap<UserProfileDTO, User>()
                .ForMember(u => u.PreexistingMedicalCondition, cfg => cfg.MapFrom(jo => JsonConvert.SerializeObject(jo.PreexistingMedicalCondition)));

        }
    }
    public class UserInfoMappingProfile : Profile {
        public UserInfoMappingProfile() {
            CreateMap<User, UserInfo>()
                .ForMember(u => u.PreexistingMedicalCondition, cfg => cfg.MapFrom(jo => JsonConvert.DeserializeObject<string[]>(jo.PreexistingMedicalCondition)));
        }
    }
}
