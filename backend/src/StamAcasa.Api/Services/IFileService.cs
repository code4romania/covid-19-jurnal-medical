using System.Collections.Generic;
using System.Threading.Tasks;

namespace StamAcasa.Api.Services
{
    public interface IFileService
    {
        Task<string> GetRawData(string path);
        Task SaveRawData(string fileContent, string path);
        Task<IEnumerable<object>> GetForms(string sub);
    }
}
