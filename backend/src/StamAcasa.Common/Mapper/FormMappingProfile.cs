using AutoMapper;
using Newtonsoft.Json;
using StamAcasa.Common.DTO;
using StamAcasa.Common.Models;

namespace StamAcasa.Common.Mapper
{
    public class FormInfoMappingProfile : Profile
    {
        public FormInfoMappingProfile()
        {
            CreateMap<Form, FormInfo>()
                .ForMember(m => m.UserInfo, f => f.MapFrom(src => src.User))
                .ForMember(m => m.Content,
                    f => f.MapFrom(src => JsonConvert.DeserializeObject<UserForm>(src.Content)));

        }
    }
}
