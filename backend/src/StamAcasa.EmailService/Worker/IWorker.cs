namespace StamAcasa.EmailService.Worker
{
    public interface IWorker
    {
        void StartWork(int instanceId = 0);
    }
}
