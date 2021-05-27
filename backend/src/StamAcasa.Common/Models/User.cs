using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StamAcasa.Common.Models {
    public class User {
        public User()
        {
            DependentUsers = new HashSet<User>();
            Forms = new HashSet<Form>();
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Sub { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string PhoneNumber { get; set; }
        public int Age { get; set; }
        public Gender Gender { get; set; }
        public string County { get; set; }
        public string City { get; set; }
        public string PreexistingMedicalCondition { get; set; }
        public QuarantineStatus QuarantineStatus { get; set; }
        public bool Smoker { get; set; }
        public bool LivesWithOthers { get; set; }
        public QuarantineStatus? QuarantineStatusOthers { get; set; }
        public RelationshipTypes? RelationshipType { get; set; }
        public bool IsDeleted { get; set; }

        public virtual User ParentUser { get; set; }
        public virtual HashSet<User> DependentUsers { get; set; }
        public virtual HashSet<Form> Forms { get; set; }
    }
}
