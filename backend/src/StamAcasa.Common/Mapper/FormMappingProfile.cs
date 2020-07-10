using AutoMapper;
using StamAcasa.Common.DTO;
using StamAcasa.Common.Models;

namespace StamAcasa.Common.Mapper
{
    public class FormInfoMappingProfile : Profile
    {
        public FormInfoMappingProfile()
        {
            CreateMap<Form, FormInfo>()
                .ForMember(m => m.UserInfo, f => f.MapFrom(src => src.User));
        }
    }
}
