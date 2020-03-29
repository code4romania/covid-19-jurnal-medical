using System;
using System.Threading.Tasks;
using RabbitMQ.Client.Events;
using StamAcasa.EmailService.EmailBuilder;

namespace StamAcasa.EmailService.Subscriber
{
    public interface ISubscriber : IDisposable
    {
        void Subscribe(string queue, Func<EmailRequestModel, Task> handler);
    }
}