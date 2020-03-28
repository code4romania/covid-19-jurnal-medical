using System;
using System.Threading.Tasks;
using RabbitMQ.Client;
using StamAcasa.Common.Notifications;
using StamAcasa.Common.Services;

namespace StamAcasa.Common.Queue
{
    public class NotificationQueue : IQueue
    {
        private readonly INotification _notification;

        public NotificationQueue(INotification notification)
        {
            _notification = notification;
        }

        public Task<INotification> Dequeue()
        {
            throw new NotImplementedException();
        }

        public Task Queue(INotification notification)
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                //i took the parameters from rabbitmq web ui. a queue have been already defined
                channel.QueueDeclare(queue: "q1",
                     durable: true,
                     exclusive: false,
                     autoDelete: false,
                     arguments: null);

                var body = notification.GetBytes();

                channel.BasicPublish(exchange: "",
                                 routingKey: "covhub.direct",
                                 basicProperties: null,
                                 body: body);
            }

            return Task.CompletedTask;
        }
    }
}
