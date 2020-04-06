using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace StamAcasa.Common.Models
{
    public class Assessment
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        [Key]
        [Column(Order = 0)]
        public int Version { get; set; }
        
        [Key]
        [Column(Order = 1)]
        [EnumDataType(typeof(AssessmentType))]
        public AssessmentType AssessmentType { get; set; }
        
        [Column(TypeName = "jsonb")]
        public JsonDocument Content { get; set; }
    } 

    public enum AssessmentType
    {
        NewUser, UserWithProfileFilledIn
    }
}