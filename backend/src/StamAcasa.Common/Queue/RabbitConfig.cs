namespace StamAcasa.Common.Queue
{
    public class RabbitConfig
    {
        public string QueueName { get; }

        public string Exchange { get; }

        public string RoutingKey { get; }
    }
}
