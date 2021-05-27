namespace StamAcasa.IdentityServer.Helpers
{
    public static class UrlHelpers
    {
        public static string NormalizeUrl(string url)
        {
            return url
                .TrimEnd(new[] { '?' })
                .TrimEnd(new[] { '/' })
                .Replace("://www.", "://")
                .Trim()
                .ToLower();
        }
    }
}