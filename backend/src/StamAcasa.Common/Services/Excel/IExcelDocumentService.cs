using System.Data;

namespace StamAcasa.Common.Services.Excel 
{
    public interface IExcelDocumentService 
    {
        byte[] DataTableToXlsxFile(DataTable dataTable, string sheetName);
    }
}
