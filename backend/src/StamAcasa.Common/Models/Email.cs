namespace StamAcasa.Common.Models
{
    public class Email
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public string FromName { get; set; }
        public string FromEmail { get; set; }
        public string SenderName { get; set; }
        public EmailAttachment Attachment { get; set; }
    }

    public class EmailAttachment
    {
        public EmailAttachment(string fileName, byte[] content)
        {
            FileName = fileName;
            Content = content;
        }

        public string FileName { get; set; }

        public byte[] Content { get; set; }
    }
}
