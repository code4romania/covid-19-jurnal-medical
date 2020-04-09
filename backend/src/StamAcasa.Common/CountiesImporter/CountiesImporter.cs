using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using Newtonsoft.Json;

namespace StamAcasa.Common.CountiesImporter
{
    public static class CountiesImporter
    {

        private const string CountiesFilename = "data/counties.json";
        private const string CitiesFilename = "data/cities.json";

        public static List<County> DeserializeCounties()
        {
            string countiesPath = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), CountiesFilename);

            using(var streamReader = File.OpenText(countiesPath))
            {
                var jsonSerializer = new JsonSerializer();
                return (List<County>)jsonSerializer.Deserialize(streamReader, typeof(List<County>));
            }
        }

        public static List<City> DeserializeCities()
        {
            string citiesPath = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), CitiesFilename);

            using (var streamReader = File.OpenText(citiesPath))
            {
                var jsonSerializer = new JsonSerializer();
                return (List<City>)jsonSerializer.Deserialize(streamReader, typeof(List<City>));
            }
        }
    }
}
