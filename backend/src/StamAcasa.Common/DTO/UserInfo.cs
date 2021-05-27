using System.Text.Json.Serialization;
using StamAcasa.Common.Models;

namespace StamAcasa.Common.DTO {
    public class UserInfo {
        public int Id { get; set; }
        [JsonIgnore]
        public int? ParentId { get; set; }
        public string Name { get; set; }
        [JsonIgnore]
        public string Email { get; set; }
        public string Surname { get; set; }
        public string PhoneNumber { get; set; }
        public string County { get; set; }
        public string City { get; set; }
        public int Age { get; set; }
        public Gender Gender { get; set; }
        public string[] PreexistingMedicalCondition { get; set; }
        public QuarantineStatus QuarantineStatus { get; set; }
        public bool Smoker { get; set; }
        public bool LivesWithOthers { get; set; }
        public QuarantineStatus? QuarantineStatusOthers { get; set; }
        public RelationshipTypes? RelationshipType { get; set; }
    }
}
