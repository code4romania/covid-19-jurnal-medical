using RabbitMQ.Client;

namespace StamAcasa.EmailService
{
    public interface IBusConnection
    {
        bool IsConnected { get; }

        IModel CreateChannel();
    }
}