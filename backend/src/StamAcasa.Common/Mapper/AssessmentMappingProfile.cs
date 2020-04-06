using System.Text.Json;
using AutoMapper;
using StamAcasa.Common.DTO;
using StamAcasa.Common.Models;

namespace StamAcasa.Common.Mapper
{
    public class AssessmentMappingProfile : Profile
    {
        public AssessmentMappingProfile()
        {
            CreateMap<Assessment, AssessmentDTO>()
                .ForMember(dest => dest.Content,
                    o => o.MapFrom(src => JsonSerializer.Serialize(src.Content, new JsonSerializerOptions())));
        }
    }
}