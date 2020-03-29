using System;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using StamAcasa.EmailService.EmailBuilder;

namespace StamAcasa.EmailService.Subscriber
{
    public class EmailQueueSubscriber : ISubscriber, IDisposable
    {
        private readonly IBusConnection _connection;
        private IModel _channel;

        public EmailQueueSubscriber(IBusConnection connection)
        {
            this._connection = connection ?? throw new ArgumentNullException(nameof(connection));
        }

        public void Dispose()
        {
            _channel?.Dispose();
        }

        public void Subscribe(string queueName, Func<EmailRequestModel, Task> handler)
        {
            Initialize(queueName, handler);
        }
        private void Initialize(string queueName, Func<EmailRequestModel, Task> handler)
        {
            _channel?.Dispose();

            _channel = _connection.CreateChannel();

            _channel.QueueDeclare(queue: queueName,
                         durable: true,
                         exclusive: false,
                         autoDelete: false,
                         arguments: null);

            _channel.CallbackException += (sender, args) =>
            {
                Initialize(queueName, handler);
            };

            var consumer = new AsyncEventingBasicConsumer(_channel);

            consumer.Received += async (model, args) =>
            {
                var body = args.Body;
                var message = Encoding.UTF8.GetString(body);
                var request = JsonConvert.DeserializeObject<EmailRequestModel>(message);

                await handler(request);
            };

            _channel.BasicConsume(queueName, true, consumer);

        }
    }
}