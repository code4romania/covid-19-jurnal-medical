namespace StamAcasa.Common.Models
{
    public class CountyEmailDistribution
    {
        public string Sender { get; set; }
        public string TemplateFile { get; set; }
        public CountyDistribution[] CountyDistributions { get; set; }
        public string[] AllEmailAddresses { get; set; }
        public string SenderName { get; set; }
    }
}
