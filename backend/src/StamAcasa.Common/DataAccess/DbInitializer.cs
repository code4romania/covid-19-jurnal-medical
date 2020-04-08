using System;
using System.Linq;

namespace StamAcasa.Common
{
    public static class DbInitializer
    {
        public static void SeedCountiesCitiesData(CountiesDbContext context)
        {
            try
            {
                if (context.Counties.Any())
                {
                    return;
                }

                AddCounties(context);

                if (context.Cities.Any())
                {
                    return;
                }

                AddCities(context);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        private static void AddCounties(CountiesDbContext context)
        {
            var result = CountiesImporter.CountiesImporter.DeserializeCounties();
            var counties = result.Select(c => new Models.County
            {
                Id = c.County_Id,
                Slug = c.Slug,
                Name = c.Name
            }).ToList();

            context.Counties.AddRange(counties);
            context.SaveChanges();
        }

        private static void AddCities(CountiesDbContext context)
        {
            var result = CountiesImporter.CountiesImporter.DeserializeCities();
            var cities = result.Select(c => new Models.City
            {
                CountyId = c.County_Id,
                Slug = c.Slug,
                Name = c.Name
            }).ToList();

            context.Cities.AddRange(cities);
            context.SaveChanges();
        }
    }
}
