using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StamAcasa.Common.Models
{
    public class County
    {
        public County()
        {
            Cities = new HashSet<City>();
        }

        [Key]
        public int Id { get; set; }
        public string Slug { get; set; }
        public string Name { get; set; }

        public virtual HashSet<City> Cities { get; set; } 
    }
}