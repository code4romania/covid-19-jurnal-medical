using Newtonsoft.Json.Linq;
using NPOI.SS.UserModel;
using NPOI.SS.Util;
using NPOI.XSSF.UserModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StamAcasa.Api.Services.Excel {
    public partial class ExcelDocumentService : IExcelDocumentService {

        public class ExcelDocumentServiceOptions {
            public string DateFormat { get; set; } = "dd.mm.yyyy";
            public string NumberFormat { get; set; } = "#,##0.0000";
            public string TrueDisplayValue { get; set; } = "Da";
            public string FalseDisplayValue { get; set; } = "Nu";
        }

        class CellSchema {
            public CellDataType CellDataType { get; set; }
            public ICellStyle CellStyle { get; set; }
        }

        enum CellDataType {
            String,
            Boolean,
            Decimal,
            Integer,
            Date
        }

        ExcelDocumentServiceOptions Options { get; }

        public ExcelDocumentService() : this(new ExcelDocumentServiceOptions()) { }

        public ExcelDocumentService(ExcelDocumentServiceOptions options) {
            Options = options;
        }

        public byte[] DataTableToXlsxFile(DataTable dataTable, string sheetName) {

            IWorkbook wb = new XSSFWorkbook();
            ISheet sheet = wb.CreateSheet(WorkbookUtil.CreateSafeSheetName(sheetName));

            var sheetRowIndex = 0;
            var headerRow = sheet.CreateRow(sheetRowIndex);

            var headerStyle = CreateHeaderCellStye(wb);
            var cellsSchemas = new List<CellSchema>();

            var tableWidth = dataTable.Columns.Count;

            //Create the header and initiallize the styles for each column
            for (int columnIndex = 0; columnIndex < tableWidth; columnIndex++) {

                var column = dataTable.Columns[columnIndex];
                var cell = headerRow.CreateCell(columnIndex);

                cell.SetCellValue(column.ColumnName);
                cell.CellStyle = headerStyle;

                var cellDataType = GetCellDataType(column.DataType);
                var cellStyle = CreateCellStyle(wb, cellDataType);

                cellsSchemas.Add(new CellSchema() {
                    CellDataType = cellDataType,
                    CellStyle = cellStyle
                });
            }

            sheetRowIndex++;

            for (int rowIndex = 0; rowIndex < dataTable.Rows.Count; rowIndex++, sheetRowIndex++) {

                var row = sheet.CreateRow(sheetRowIndex);

                for (int columnIndex = 0; columnIndex < tableWidth; columnIndex++) {

                    var cell = row.CreateCell(columnIndex);
                    var cellSchema = cellsSchemas[columnIndex];
                    var cellDataType = cellSchema.CellDataType;

                    cell.CellStyle = cellSchema.CellStyle;

                    var value = dataTable.Rows[rowIndex][columnIndex];
                    
                    if (value == DBNull.Value) {
                        cell.SetCellValue(null as string);
                    } else if (cellDataType == CellDataType.Boolean) {
                        if (value is bool isTrue) {
                            cell.SetCellValue(isTrue ? Options.TrueDisplayValue : Options.FalseDisplayValue);
                        }
                    } else if (cellDataType == CellDataType.Date) {
                        cell.SetCellValue((DateTime)value);
                    } else if (cellDataType == CellDataType.Decimal || cellDataType == CellDataType.Integer) {
                        cell.SetCellValue(Convert.ToDouble(value));
                    } else {
                        cell.SetCellValue(value?.ToString());
                    }
                }
            }

            for (int i = 0; i < tableWidth; i++) {
                sheet.AutoSizeColumn(i);
            }

            byte[] fileBinary = null;

            using (var stream = new MemoryStream()) {
                wb.Write(stream);
                fileBinary = stream.ToArray();
            }

            return fileBinary;
        }


        CellDataType GetCellDataType(Type type) {

            var underlyingType = Nullable.GetUnderlyingType(type);
            if (underlyingType != null)
                type = underlyingType;

            if (type == typeof(bool)) {
                return CellDataType.Boolean;
            } else if (type == typeof(DateTime)) {
                return CellDataType.Date;
            } else if (IsDecimalType(type)) {
                return CellDataType.Decimal;
            } else if (IsIntegerType(type)) {
                return CellDataType.Integer;
            } else {
                return CellDataType.String;
            }
        }

        bool IsDecimalType(Type type) {

            var types = new HashSet<Type>() {
                typeof(decimal),
                typeof(float),
                typeof(double)
            };

            return types.Contains(type);
        }

        bool IsIntegerType(Type type) {

            var types = new HashSet<Type>() {
                typeof(int),
                typeof(long),
                typeof(byte)
            };

            return types.Contains(type);
        }

        IFont CreateArialFont(IWorkbook wb) {

            IFont font = wb.CreateFont();
            font.FontHeightInPoints = 10;
            font.FontName = "Arial";

            return font;
        }

        ICellStyle CreateCellStyle(IWorkbook wb, CellDataType cellType) {
            switch (cellType) {
                case CellDataType.Boolean:
                    return CreateCellStyleBoolean(wb);
                case CellDataType.Date:
                    return CreateCellStyleDate(wb);
                case CellDataType.Integer:
                    return CreateCellStyleInteger(wb);
                case CellDataType.Decimal:
                    return CreateCellStyleDecimal(wb);
                default:
                    return CreateCellStyleDate(wb);
            }
        }

        ICellStyle CreateCellStyle(IWorkbook wb) {
            var cellStyle = wb.CreateCellStyle();
            cellStyle.SetFont(CreateArialFont(wb));
            return cellStyle;
        }

        ICellStyle CreateCellStyleRightAligned(IWorkbook wb) {
            var cellStyle = wb.CreateCellStyle();
            cellStyle.SetFont(CreateArialFont(wb));
            cellStyle.Alignment = HorizontalAlignment.Right;
            return cellStyle;
        }

        ICellStyle CreateCellStyleBoolean(IWorkbook wb)
            => CreateCellStyleRightAligned(wb);

        ICellStyle CreateCellStyleDate(IWorkbook wb) {

            var cellStyleDate = (XSSFCellStyle)CreateCellStyleRightAligned(wb);
            var dateDataFormat = wb.CreateDataFormat().GetFormat(Options.DateFormat);
            cellStyleDate.SetDataFormat(dateDataFormat);

            return cellStyleDate;
        }

        ICellStyle CreateCellStyleDecimal(IWorkbook wb) {

            var cellStyleDate = (XSSFCellStyle)CreateCellStyleRightAligned(wb);
            var decimalDataFormat = wb.CreateDataFormat().GetFormat(Options.NumberFormat);
            cellStyleDate.SetDataFormat(decimalDataFormat);

            return cellStyleDate;
        }

        ICellStyle CreateCellStyleInteger(IWorkbook wb) {

            var cellStyleDate = (XSSFCellStyle)CreateCellStyleRightAligned(wb);
            var integerDataFormat = wb.CreateDataFormat().GetFormat("0");
            cellStyleDate.SetDataFormat(integerDataFormat);

            return cellStyleDate;
        }

        ICellStyle CreateHeaderCellStye(IWorkbook wb) {

            var headerStyle = (XSSFCellStyle)CreateCellStyle(wb);

            headerStyle.GetFont().Boldweight = (short)FontBoldWeight.Bold;
            headerStyle.Alignment = HorizontalAlignment.Center;
            headerStyle.WrapText = true;

            return headerStyle;
        }

    }
}
