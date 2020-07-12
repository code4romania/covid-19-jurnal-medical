using System;
using StamAcasa.Common.Models;

namespace StamAcasa.Common.DTO
{
    public class FormInfo
    {
        public UserForm SubmitedForm { get; set; }
        public string FormTypeId { get; set; }
        public DateTime Timestamp { get; set; }
        public int UserId { get; set; }
        public UserInfo UserInfo { get; set; }
    }
}