using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace StamAcasa.Api.Services
{
   public class LocalFileService : IFileService
   {
       private readonly IConfiguration _configuration;
       private string _directory;

       public LocalFileService(IConfiguration configuration)
       {
           _configuration = configuration;
           var targetDirectory = _configuration.GetValue<string>("TargetFolder") ?? "formAnswers";
           _directory = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), targetDirectory);
           if (!Directory.Exists(_directory))
               Directory.CreateDirectory(_directory);
        }
       public string GetRawData(string path)
       {
           return File.ReadAllText(path);
       }


       public async Task SaveRawData(string fileContent, string fileName)
       {
           string path = Path.Combine(_directory, fileName);
           File.WriteAllText(path, fileContent);
       }

       public async Task<IEnumerable<object>> GetForms(string sub)
       {
           var result = new List<object>();
           foreach (var file in Directory.GetFiles(_directory).Where(f => f.Contains(sub)))
           {
               var content = await File.ReadAllTextAsync(file);
               result.Add(content);
           }

           return result;
       }
   }
}
