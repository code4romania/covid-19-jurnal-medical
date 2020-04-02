using System.Text.Json;
using AutoMapper;
using StamAcasa.Common.DTO;

namespace StamAcasa.Common.Mapper {
    public class FormMappingProfile : Profile {
        public FormMappingProfile() {
            CreateMap<FormInfo, Form>()
                .ForMember(dest => dest.Content,
                    o => o.MapFrom(src =>
                      JsonDocument.Parse(src.Content, new JsonDocumentOptions())
                        ));
        }
    }

    public class FormInfoMappingProfile : Profile {
        public FormInfoMappingProfile()
        {
            CreateMap<Form, FormInfo>()
            .ForMember(dest => dest.Content,
                o => o.MapFrom(src => JsonSerializer.Serialize(src.Content, new JsonSerializerOptions())));
        }
    }
}
