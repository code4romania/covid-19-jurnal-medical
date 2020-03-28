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

        private string QueueName { get; }

        private string Exchange { get; }

        private string RoutingKey { get; }

        public NotificationQueueRabbit(string hostName, string queueName, string exchange, string routingKey)
        {
            HostName = hostName;
            QueueName = queueName;
            Exchange = exchange;
            RoutingKey = routingKey;
        }

        public Task<INotification> Dequeue()
        {
            throw new NotImplementedException();
        }

        public Task Queue(INotification notification)
        {
            var factory = new ConnectionFactory() { HostName = HostName };
            using (var connection = factory.CreateConnection())
            {
                using (var channel = connection.CreateModel())
                {
                    channel.QueueDeclare(queue: QueueName,
                         durable: true,
                         exclusive: false,
                         autoDelete: false,
                         arguments: null);

                    var body = notification.GetBytes();

                    channel.BasicPublish(exchange: Exchange,
                                     routingKey: RoutingKey,
                                     basicProperties: null,
                                     body: body);
                }
            }

            return Task.CompletedTask;
        }
    }
}
