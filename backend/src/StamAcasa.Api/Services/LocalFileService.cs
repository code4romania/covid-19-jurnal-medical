using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace StamAcasa.Api.Services {
    public class LocalFileService : IFileService {
        private readonly IConfiguration _configuration;
        private readonly string _directory;

        public LocalFileService(IConfiguration configuration) {
            _configuration = configuration;
            var targetDirectory = _configuration.GetValue<string>("TargetFolder") ?? "formAnswers";
            _directory = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), targetDirectory);
            if (!Directory.Exists(_directory))
                Directory.CreateDirectory(_directory);
        }

        public async Task<string> GetRawData(string path) {
            return await File.ReadAllTextAsync(path);
        }

        public async Task SaveRawData(string fileContent, string fileName) {
            var path = Path.Combine(_directory, fileName);
            using (var sw = new StreamWriter(path))
            {
                await sw.WriteAsync(fileContent);
            }
        }

        public async Task<IEnumerable<object>> GetForms(string sub) {
            var result = new List<object>();
            foreach (var file in Directory.GetFiles(_directory).Where(f => f.Contains(sub))) {
                var content = await File.ReadAllTextAsync(file);
                result.Add(content);
            }

            return result;
        }
    }
}
