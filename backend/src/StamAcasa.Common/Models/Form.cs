using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace StamAcasa.Common.Models
{
    public class Form
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int UserId { get; set; }

        [Column(TypeName = "jsonb")]
        public string Content { get; set; }
        public string FormTypeId { get; set; }
        public DateTime Timestamp { get; set; }
        public virtual User User { get; set; }

    }
}