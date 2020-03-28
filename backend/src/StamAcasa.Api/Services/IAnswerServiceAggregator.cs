using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StamAcasa.Api.Services
{
    public interface IAnswerServiceAggregator
    {
        string GetRawData(string path);
        Task SaveRawData(dynamic form);
        Task<IEnumerable<object>> GetForms(string sub);
    }
}
