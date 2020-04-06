using System.IO;
using System.Text.Json;

namespace StamAcasa.Common.JsonFIles
{
    internal static class JsonFilesLibrary
    {
        internal static JsonDocument GetAssessmentQ1()
        { 
            var q1 = File.ReadAllText(@"../StamAcasa.Common/JsonFiles/Assessment/q1.json");
            return JsonDocument.Parse(q1);
        }
        
        internal static JsonDocument GetAssessmentQ1A()
        {
            var q1a = File.ReadAllText(@"../StamAcasa.Common/JsonFiles/Assessment/q1a.json");
            return JsonDocument.Parse(q1a);
        }
    }
}