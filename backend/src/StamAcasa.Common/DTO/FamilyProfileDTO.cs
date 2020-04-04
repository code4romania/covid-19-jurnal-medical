using System.Text.Json.Serialization;
using StamAcasa.Common.Models;

namespace StamAcasa.Common.DTO {
    public class FamilyProfileDTO {
        [JsonIgnore]
        public int Id { get; set; }
        [JsonIgnore]
        public string Sub { get; set; }
        [JsonIgnore]
        public int? ParentId { get; set; }

        public string Name { get; set; }
        public string Surname { get; set; }
        public int Age { get; set; }
        public Gender Gender { get; set; }
        public string PreexistingMedicalCondition { get; set; }
        public QuarantineStatus QuarantineStatus { get; set; }
        public string Disability { get; set; }
        public RelationshipTypes RelationshipType { get; set; }
    }
}
