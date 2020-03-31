using System;
using System.Threading.Tasks;
using RabbitMQ.Client;
using StamAcasa.Common.Notifications;
using StamAcasa.Common.Services;

namespace StamAcasa.Common.Queue
{
    public class NotificationQueueRabbit : IQueue
    {
        private string HostName { get; }

        private RabbitConfig Config { get; }

        private IConnection Connection { get; }

        public NotificationQueueRabbit(string hostName, RabbitConfig config)
        {
            HostName = hostName;
            Config = config;
        }

        public NotificationQueueRabbit(IConnection connection, RabbitConfig config)
        {
            Connection = connection;
            Config = config;
        }

        public Task<INotification> Dequeue()
        {
            throw new NotImplementedException();
        }

        public Task Queue(INotification notification)
        {
            if (null != Connection)
            {
                return QueueInternal(notification, Connection);
            }

            using (var connection = new ConnectionFactory() { HostName = HostName }.CreateConnection())
            {
                return QueueInternal(notification, connection);
            }
        }

        private Task QueueInternal(INotification notification, IConnection connection)
        {
            using (var channel = connection.CreateModel())
            {
                channel.QueueDeclare(queue: Config.QueueName,
                     durable: true,
                     exclusive: false,
                     autoDelete: false,
                     arguments: null);

                var body = notification.GetBytes();

                channel.BasicPublish(exchange: Config.Exchange,
                                 routingKey: Config.RoutingKey,
                                 basicProperties: null,
                                 body: body);
            }

            return Task.CompletedTask;
        }
    }
}
