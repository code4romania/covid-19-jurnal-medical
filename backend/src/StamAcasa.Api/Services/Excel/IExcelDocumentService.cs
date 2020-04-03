using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StamAcasa.Api.Services.Excel {
    public interface IExcelDocumentService {

        byte[] DataTableToXlsxFile(DataTable dataTable, string sheetName);

    }
}
