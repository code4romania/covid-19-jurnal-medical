using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace StamAcasa.Common.Models
{
    public class AssessmentHistory
    {     
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Sub { get; set; }
        public User User { get; set; }
        public long AssessmentDate { get; set; }
        public string FileName { get; set; }
    }
}
