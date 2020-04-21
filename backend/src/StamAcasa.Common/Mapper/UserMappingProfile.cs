using AutoMapper;
using Newtonsoft.Json;
using StamAcasa.Common.DTO;
using StamAcasa.Common.Models;
using System;
using System.Linq;
using System.Text.RegularExpressions;

namespace StamAcasa.Common
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            CreateMap<UserProfileDTO, User>()
                .ForMember(u => u.PreexistingMedicalCondition, cfg => cfg.MapFrom(jo => JsonConvert.SerializeObject(jo.PreexistingMedicalCondition)));

        }
    }
    public class UserInfoMappingProfile : Profile
    {
        public UserInfoMappingProfile()
        {
            CreateMap<User, UserInfo>()
                .ForMember(u => u.PreexistingMedicalCondition, cfg => cfg.MapFrom(jo => DeserializeArray(jo.PreexistingMedicalCondition)));
        }

        private string[] DeserializeArray(string preexistingMedicalCondition)
        {
            string[] result;
            if (IsValidArray(preexistingMedicalCondition))
            {
                result = JsonConvert.DeserializeObject<string[]>(preexistingMedicalCondition);
            }
            else
            {
                result = Regex.Split(preexistingMedicalCondition, @", (?<!^)(?=[A-Z])");
            }

            return result;
        }

        private bool IsValidArray(string input)
        {
            var trimedInput = input.Trim();
            return trimedInput.StartsWith("[") && trimedInput.EndsWith("]");
        }
    }
}
