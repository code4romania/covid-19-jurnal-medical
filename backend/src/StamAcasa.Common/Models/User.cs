﻿using System.Collections.Generic;
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
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public int Age { get; set; }
        public Gender Gender { get; set; }
        public string PreexistingMedicalCondition { get; set; }
        public QuarantineStatus QuarantineStatus { get; set; }
        public string Address { get; set; }
        public string County { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Email { get; set; }
        public string Disability { get; set; }

        public virtual User ParentUser { get; set; }
        public virtual HashSet<User> DependentUsers { get; set; }
        public virtual HashSet<Form> Forms { get; set; }
    }

}
