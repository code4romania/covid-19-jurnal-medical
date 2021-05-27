using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json.Linq;
using StamAcasa.Common.Models;

namespace StamAcasa.Common.Services.Excel {
    public interface IAnswersExcelExporter {

        byte[] AnswersToExcel(JArray jAnswerForms, AnswersExcelTemplateTypes template = AnswersExcelTemplateTypes.SingleRowPerForm)
            => AnswersToExcel(jAnswerForms.Select(token => (JObject)token).ToList(), template);

        byte[] AnswersToExcel(IList<JObject> jAnswerForms, AnswersExcelTemplateTypes template = AnswersExcelTemplateTypes.SingleRowPerForm);

    }
}
