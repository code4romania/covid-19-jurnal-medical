using System;
using System.Collections.Generic;
using System.Text;

namespace StamAcasa.Common.Models {
    public class UserInfo {
        public int Id { get; set; }
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
    }
}
