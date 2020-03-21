using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StamAcasa.Api.Services
{
    public interface IFileService
    {
        string GetRawData(string path);
        Task SaveRawData(string fileContent, string path);
        Task<IEnumerable<object>> GetForms(string sub);
    }
}
