using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StamAcasa.Api.Services.Excel {
    public interface IAnswersExcelExporter {

        byte[] AnswersToExcel(JArray jAnswerForms, AnswersExcelTemplateTypes template = AnswersExcelTemplateTypes.SingleRowPerForm)
            => AnswersToExcel(jAnswerForms.Select(token => (JObject)token).ToList(), template);

        byte[] AnswersToExcel(IList<JObject> jAnswerForms, AnswersExcelTemplateTypes template = AnswersExcelTemplateTypes.SingleRowPerForm);

    }
}
