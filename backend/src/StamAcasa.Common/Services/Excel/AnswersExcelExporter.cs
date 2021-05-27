using System;
using System.Collections.Generic;
using System.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using StamAcasa.Common.Models;
using StamAcasa.Common.Services.Assessment;

namespace StamAcasa.Common.Services.Excel
{
    public class AnswersExcelExporter : IAnswersExcelExporter
    {
        IExcelDocumentService ExcelDocumentService { get; }
        private readonly Dictionary<string, string> _singleChoiceOptionsMap = new Dictionary<string, string>();
        public AnswersExcelExporter(IExcelDocumentService excelDocumentService, IAssessmentFormProvider assessmentFormProvider)
        {
            ExcelDocumentService = excelDocumentService;
            var formNewUser = assessmentFormProvider.GetFormNewUser().GetAwaiter().GetResult();
            var formFollowUp = assessmentFormProvider.GetFormFollowUp().GetAwaiter().GetResult();
            FillSingleChoiceMapFromFormString(formNewUser);
            FillSingleChoiceMapFromFormString(formFollowUp);

        }

        private void FillSingleChoiceMapFromFormString(string form)
        {
            var jObject = JObject.FromObject(JsonConvert.DeserializeObject<dynamic>(form));

            var formId = jObject["formId"].ToString();
            var singleChoiceQuestions = jObject.SelectTokens("$.form[?(@.type == 'SINGLE_CHOICE')]");

            foreach (var question in singleChoiceQuestions)
            {
                var questionId = question["questionId"].ToString();
                foreach (var option in question["options"])
                {
                    var optionValue = option["value"].ToString();
                    var optionLabel = option["label"].ToString();

                    _singleChoiceOptionsMap.TryAdd($"{formId}_{questionId}_{optionValue}".ToLower(), optionLabel);
                }
            }
        }

        public byte[] AnswersToExcel(IList<JObject> jAnswerForms, AnswersExcelTemplateTypes template = AnswersExcelTemplateTypes.SingleRowPerForm)
        {

            DataTable dataTable = null;

            if (template == AnswersExcelTemplateTypes.MultipleRowsPerForm)
            {
                dataTable = AnswersToExcelMultipleRowsPerForm(jAnswerForms);
            }
            else
            {
                dataTable = AnswersToExcelSingleRowPerForm(jAnswerForms);
            }

            return ExcelDocumentService.DataTableToXlsxFile(dataTable, "Answers");
        }

        DataTable AnswersToExcelSingleRowPerForm(IList<JObject> jAnswerForms)
        {

            var dataTable = new DataTable();

            foreach (var jAnswerForm in jAnswerForms)
            {

                var jProperties = jAnswerForm.Properties();
                var formId = "";

                foreach (var jProperty in jProperties)
                {
                    if (jProperty.Name == "formId")
                    {
                        formId = jProperty.Value.ToString();
                    }
                    if (jProperty.Name == "answers")
                    {

                        var jAnswers = (JArray)jProperty.Value;

                        foreach (var answer in jAnswers)
                        {
                            var questionId = CastJToken(answer["id"]);
                            CreatePrimitiveColumn(dataTable, $"questionId{questionId}", JTokenType.String);
                            CreatePrimitiveColumn(dataTable, $"questionText{questionId}", JTokenType.String);
                            CreatePrimitiveColumn(dataTable, $"answer{questionId}", JTokenType.String);
                        }
                    }
                    else
                    {
                        CreatePrimitiveColumn(dataTable, jProperty);
                    }
                }

                var row = dataTable.NewRow();
                foreach (var jProperty in jProperties)
                {
                    if (jProperty.Name == "timestamp")
                        continue;
                    if (jProperty.Name == "answers")
                    {

                        var jAnswers = (JArray)jProperty.Value;

                        for (int questionIndex = 0; questionIndex < jAnswers.Count; questionIndex++)
                        {

                            var jAnswer = jAnswers[questionIndex];

                            var questionId = CastJToken(jAnswer["id"]);
                            row[$"questionId{questionId}"] = questionId ?? questionIndex;

                            var questionText = CastJToken(jAnswer["questionText"]);
                            row[$"questionText{questionId}"] = questionText ?? DBNull.Value;

                            var answer = CastJToken(jAnswer["answer"]);

                            var (isSingleOptionAnswer, newText) = MapAnswer(formId, questionId?.ToString(), answer);
                            if (isSingleOptionAnswer)
                            {
                                row[$"answer{questionId}"] = string.IsNullOrEmpty(newText.ToString()) ? DBNull.Value : newText;
                            }
                            else
                            {
                                row[$"answer{questionId}"] = answer ?? DBNull.Value;
                            }

                        }
                    }
                    else
                    {
                        var value = CastJToken(jProperty.Value);
                        row[jProperty.Name] = value ?? DBNull.Value;
                    }
                }

                dataTable.Rows.Add(row);
            }

            return dataTable;
        }

        DataTable AnswersToExcelMultipleRowsPerForm(IList<JObject> jAnswerForms)
        {
            var dataTable = new DataTable();

            foreach (var jAnswerForm in jAnswerForms)
            {

                var jProperties = jAnswerForm.Properties();

                foreach (var jProperty in jProperties)
                {
                    CreatePrimitiveColumn(dataTable, jProperty);
                }

                CreatePrimitiveColumn(dataTable, "questionId", JTokenType.String);
                CreatePrimitiveColumn(dataTable, "questionText", JTokenType.String);
                CreatePrimitiveColumn(dataTable, "answer", JTokenType.String);

                var jAnswers = (JArray)jAnswerForm["answers"];
                var formId = jAnswerForm["formId"].ToString();
                for (int questionIndex = 0; questionIndex < jAnswers.Count; questionIndex++)
                {

                    var row = dataTable.NewRow();

                    foreach (var jProperty in jProperties)
                    {
                        if (jProperty.Name == "timestamp")
                            continue;

                        if (jProperty.Name != "answers")
                        {
                            var value = CastJToken(jProperty.Value);
                            row[jProperty.Name] = value ?? DBNull.Value;
                        }
                    }

                    var jAnswer = jAnswers[questionIndex];

                    var questionId = CastJToken(jAnswer["id"]);
                    row["questionId"] = questionId ?? DBNull.Value;

                    var questionText = CastJToken(jAnswer["questionText"]);
                    row["questionText"] = questionText ?? DBNull.Value;

                    var answer = CastJToken(jAnswer["answer"]);

                    var (isSingleOptionAnswer, newText) = MapAnswer(formId, questionId?.ToString(), answer);

                    if (isSingleOptionAnswer)
                    {
                        row["answer"] = string.IsNullOrEmpty(newText.ToString()) ? DBNull.Value : newText;
                    }
                    else
                    {
                        row["answer"] = answer ?? DBNull.Value;
                    }

                    dataTable.Rows.Add(row);
                }
            }

            return dataTable;
        }

        private (bool isSingleOptionAnswer, object newText) MapAnswer(string formId, string questionId, object answer)
        {
            var key = $"{formId}_{questionId}_{answer}".ToLower();
            if (_singleChoiceOptionsMap.ContainsKey(key))
            {
                return (true, _singleChoiceOptionsMap[key]);
            }

            return (false, answer);
        }
        object CastJToken(JToken value)
        {
            if (value == null)
                return DBNull.Value;
            var jType = value.Type;

            if (jType == JTokenType.Boolean)
            {
                return (bool?)value;
            }
            else if (jType == JTokenType.Date)
            {
                return (DateTime?)value;
            }
            else if (jType == JTokenType.Float)
            {
                return (double?)value;
            }
            else if (jType == JTokenType.Integer)
            {
                return (long?)value;
            }
            else
            {
                return (string)value;
            }
        }

        void CreatePrimitiveColumn(DataTable dataTable, JProperty jProperty)
        {

            if (dataTable.Columns.Contains(jProperty.Name))
                return;

            var jType = jProperty.Value.Type;

            CreatePrimitiveColumn(dataTable, jProperty.Name, jType);
        }

        void CreatePrimitiveColumn(DataTable dataTable, string name, JTokenType jType)
        {

            if (dataTable.Columns.Contains(name))
                return;

            Type dataType;

            if (jType == JTokenType.Array || jType == JTokenType.Object)
            {
                return;
            }
            else if (jType == JTokenType.Boolean)
            {
                dataType = typeof(bool);
            }
            else if (jType == JTokenType.Date)
            {
                dataType = typeof(DateTime);
            }
            else if (jType == JTokenType.Float)
            {
                dataType = typeof(double);
            }
            else if (jType == JTokenType.Integer)
            {
                dataType = typeof(long);
            }
            else
            {
                dataType = typeof(string);
            }

            dataTable.Columns.Add(new DataColumn()
            {
                ColumnName = name,
                DataType = dataType,
                AllowDBNull = true
            });
        }

    }
}
