using System;

namespace StamAcasa.Common.DTO
{
    public class FormInfo
    {
        public string Content { get; set; }
        public string FormTypeId { get; set; }
        public DateTime Timestamp { get; set; }
        public int UserId { get; set; }
    }
}