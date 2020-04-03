﻿using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StamAcasa.Api.Services.Excel {
    public class AnswersExcelExporter : IAnswersExcelExporter {

        IExcelDocumentService ExcelDocumentService { get; }

        public AnswersExcelExporter(IExcelDocumentService excelDocumentService) {
            ExcelDocumentService = excelDocumentService;
        }

        public byte[] AnswersToExcel(IList<JObject> jAnswerForms, AnswersExcelTemplateTypes template = AnswersExcelTemplateTypes.SingleRowPerForm) {

            DataTable dataTable = null;

            if (template == AnswersExcelTemplateTypes.MultipleRowsPerForm) {
                dataTable = AnswersToExcelMultipleRowsPerForm(jAnswerForms);
            } else {
                dataTable = AnswersToExcelSingleRowPerForm(jAnswerForms);
            }

            return ExcelDocumentService.DataTableToXlsxFile(dataTable, "Answers");
        }

        DataTable AnswersToExcelSingleRowPerForm(IList<JObject> jAnswerForms) {

            var dataTable = new DataTable();

            foreach (var jAnswerForm in jAnswerForms) {

                var jProperties = jAnswerForm.Properties();

                foreach (var jProperty in jProperties) {
                    if (jProperty.Name == "answers") {

                        var jAnswers = (JArray)jProperty.Value;

                        for(int questionIndex = 0; questionIndex < jAnswers.Count; questionIndex++) {
                            CreatePrimitiveColumn(dataTable, $"answerId{questionIndex + 1}", JTokenType.String);
                            CreatePrimitiveColumn(dataTable, $"questionText{questionIndex + 1}", JTokenType.String);
                            CreatePrimitiveColumn(dataTable, $"answer{questionIndex + 1}", JTokenType.String);
                        }
                    } else {
                        CreatePrimitiveColumn(dataTable, jProperty);
                    }
                }

                var row = dataTable.NewRow();

                foreach (var jProperty in jProperties) {

                    if (jProperty.Name == "answers") {

                        var jAnswers = (JArray)jProperty.Value;

                        for (int questionIndex = 0; questionIndex < jAnswers.Count; questionIndex++) {

                            var jAnswer = jAnswers[questionIndex];

                            var answerId = CastJToken(jAnswer["id"]);
                            row[$"answerId{questionIndex + 1}"] = answerId ?? DBNull.Value;

                            var questionText = CastJToken(jAnswer["questionText"]);
                            row[$"questionText{questionIndex + 1}"] = questionText ?? DBNull.Value;

                            var answer = CastJToken(jAnswer["answer"]);
                            row[$"answer{questionIndex + 1}"] = answer ?? DBNull.Value;
                        }
                    } else {
                        var value = CastJToken(jProperty.Value);
                        row[jProperty.Name] = value ?? DBNull.Value;
                    }
                }

                dataTable.Rows.Add(row);
            }

            return dataTable;
        }

        DataTable AnswersToExcelMultipleRowsPerForm(IList<JObject> jAnswerForms) {
            var dataTable = new DataTable();

            foreach (var jAnswerForm in jAnswerForms) {

                var jProperties = jAnswerForm.Properties();

                foreach (var jProperty in jProperties) {
                    CreatePrimitiveColumn(dataTable, jProperty);
                }

                CreatePrimitiveColumn(dataTable, $"answerId", JTokenType.String);
                CreatePrimitiveColumn(dataTable, $"questionText", JTokenType.String);
                CreatePrimitiveColumn(dataTable, $"answer", JTokenType.String);

                var jAnswers = (JArray)jAnswerForm["answers"];

                for (int questionIndex = 0; questionIndex < jAnswers.Count; questionIndex++) {

                    var row = dataTable.NewRow();

                    foreach (var jProperty in jProperties) {
                        if (jProperty.Name != "answers") {
                            var value = CastJToken(jProperty.Value);
                            row[jProperty.Name] = value ?? DBNull.Value;
                        }
                    }

                    var jAnswer = jAnswers[questionIndex];

                    var answerId = CastJToken(jAnswer["id"]);
                    row[$"answerId"] = answerId ?? DBNull.Value;

                    var questionText = CastJToken(jAnswer["questionText"]);
                    row[$"questionText"] = questionText ?? DBNull.Value;

                    var answer = CastJToken(jAnswer["answer"]);
                    row[$"answer"] = answer ?? DBNull.Value;

                    dataTable.Rows.Add(row);
                }
            }

            return dataTable;
        }


        object CastJToken(JToken value) {

            var jType = value.Type;

            if (jType == JTokenType.Boolean) {
                return (bool?)value;
            } else if (jType == JTokenType.Date) {
                return (DateTime?)value;
            } else if (jType == JTokenType.Float) {
                return (double?)value;
            } else if (jType == JTokenType.Integer) {
                return (long?)value;
            } else {
                return (string)value;
            }
        }

        void CreatePrimitiveColumn(DataTable dataTable, JProperty jProperty) {

            if (dataTable.Columns.Contains(jProperty.Name))
                return;

            var jType = jProperty.Value.Type;

            CreatePrimitiveColumn(dataTable, jProperty.Name, jType);
        }

        void CreatePrimitiveColumn(DataTable dataTable, string name, JTokenType jType) {

            if (dataTable.Columns.Contains(name))
                return;

            Type dataType;

            if (jType == JTokenType.Array || jType == JTokenType.Object) {
                return;
            } else if (jType == JTokenType.Boolean) {
                dataType = typeof(bool);
            } else if (jType == JTokenType.Date) {
                dataType = typeof(DateTime);
            } else if (jType == JTokenType.Float) {
                dataType = typeof(double);
            } else if (jType == JTokenType.Integer) {
                dataType = typeof(long);
            } else {
                dataType = typeof(string);
            }

            dataTable.Columns.Add(new DataColumn() {
                ColumnName = name,
                DataType = dataType,
                AllowDBNull = true
            });
        }

    }
}
