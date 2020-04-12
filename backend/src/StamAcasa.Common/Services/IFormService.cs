using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using StamAcasa.Common.DTO;

namespace StamAcasa.Common.Services {
    public interface IFormService
    {
        Task<IEnumerable<FormInfo>> GetForms(int userId);
        Task<IEnumerable<FormInfo>> GetForms(string userSub);
        Task<bool> AddForm(FormInfo formModel);
        Task<IEnumerable<FormInfo>> GetFormsByTime(TimeSpan timeSpan);
    }
}
