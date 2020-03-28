using StamAcasa.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StamAcasa.Common.Services
{
    public interface IAssessmentHistoryService
    {
        Task<bool> AddAssessmentHistoryEntry(AssessmentHistory entry);                
    }
}
