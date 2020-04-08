using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StamAcasa.Common.Models
{
    public class City
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Slug { get; set; }
        public string Name { get; set; }
        public int CountyId { get; set; }

        public virtual County County { get; set; }
    }
}