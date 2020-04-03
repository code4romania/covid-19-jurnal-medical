namespace StamAcasa.EmailService.Mailing
{
    public class MailOptions
    {
        public string Host { get; set; }

        public int Port { get; set; }

        /// <summary>
        /// Should the connection use SSL for encryption. 
        /// Based on the protocol and default ports, the options are:
        /// 
        /// Default Ports:  |   Server:         |   Authentication:     |	Port:
        /// SMTP Server 	    Non-Encrypted	    AUTH	                25 (or 587)
        ///                     Secure(TLS)         StartTLS	            587
        ///                     Secure(SSL)         SSL	                    465
        /// POP3 Server         Non-Encrypted       AUTH	                110
        ///                     Secure(SSL)         SSL	                    995
        /// </summary>
        public bool UseSsl { get; set; }
        public string User { get; set; }
        public string Password { get; set; }
    }
}