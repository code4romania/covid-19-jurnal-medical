using IdentityModel;
using Newtonsoft.Json;
using StamAcasa.Common.Models;
using StamAcasa.Common.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StamAcasa.Api.Services
{
    public class AnswerServiceAggregator : IAnswerServiceAggregator
    {
        private readonly IFileService _fileService;
        private readonly IAssessmentHistoryService _assessmentHistory;

        public AnswerServiceAggregator(IFileService fileService, IAssessmentHistoryService assessmentHistoryService)
        {
            _assessmentHistory = assessmentHistoryService;
            _fileService = fileService;
        }

        public async Task<IEnumerable<object>> GetForms(string sub)
        {
            return await _fileService.GetForms(sub);
        }

        public string GetRawData(string path)
        {
            return _fileService.GetRawData(path);
        }

        public async Task SaveRawData(dynamic form)
        {
            var contentToSave = JsonConvert.SerializeObject(form).ToString();
            var fileName = $"{form.sub.ToString("N")}_{form.doc_id}_{form.Timestamp}.json";

            await _fileService.SaveRawData(contentToSave,
                fileName);
            var entry = new AssessmentHistory
            {
                AssessmentDate = form.Timestamp,
                FileName = fileName,
                Sub = form.sub,
            };

            await _assessmentHistory.AddAssessmentHistoryEntry(entry);
        }
    }
}
