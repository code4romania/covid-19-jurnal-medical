using System;
using System.Threading.Tasks;
using RabbitMQ.Client.Events;
using StamAcasa.EmailService.EmailBuilder;

namespace StamAcasa.EmailService.Messaging
{
    public interface IQueueSubscriber : IDisposable
    {
        void Subscribe(string queue, Func<EmailRequestModel, Task> handler);
    }
}