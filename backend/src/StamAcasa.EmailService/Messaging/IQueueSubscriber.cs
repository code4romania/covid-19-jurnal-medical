using StamAcasa.Common.EmailService;
using System;
using System.Threading.Tasks;

namespace StamAcasa.EmailService.Messaging
{
    public interface IQueueSubscriber : IDisposable
    {
        void Subscribe(string queue, Func<EmailRequestModel, Task> handler);
    }
}