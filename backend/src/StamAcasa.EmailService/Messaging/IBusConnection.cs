using RabbitMQ.Client;

namespace StamAcasa.EmailService.Messaging
{
    public interface IBusConnection
    {
        bool IsConnected { get; }

        IModel CreateChannel();
    }
}