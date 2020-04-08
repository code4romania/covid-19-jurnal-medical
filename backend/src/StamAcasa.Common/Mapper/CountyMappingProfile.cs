using AutoMapper;

namespace StamAcasa.Common.Mapper
{
    public class CountyMappingProfile : Profile
    {
        public CountyMappingProfile()
        {
            CreateMap<Models.County, DTO.County>();
        }
    }

    public class CityMappingProfile : Profile
    {
        public CityMappingProfile()
        {
            CreateMap<Models.City, DTO.City>();
        }
    }
}
