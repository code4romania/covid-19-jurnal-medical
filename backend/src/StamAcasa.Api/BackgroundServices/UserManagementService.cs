using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using StamAcasa.Common.Queue;
using StamAcasa.Common.Services;
using StamAcasa.Common.Services.UserManagement;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace StamAcasa.Api.BackgroundServices
{
    using Microsoft.Extensions.DependencyInjection;

    public class UserManagementService : BackgroundService
    {
        private readonly ILogger<UserManagementService> _logger;
        private readonly IQueueService _queueService;
        private readonly IServiceProvider _serviceProvider;

        public UserManagementService(IQueueService queueService, IServiceProvider serviceProvider, ILogger<UserManagementService> logger)
        {
            _queueService = queueService;
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        public override Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("User management service is starting...");


            _queueService.SubscribeConsumerToUserRequestsQueue<DeleteUserModel>(async (request) =>
            {
                try
                {
                    var userService = _serviceProvider.GetService<IUserService>();
                    _logger.LogInformation($"Will soft delete user with sub= {request.Sub}");

                    await userService.MarkUserAsDeleted(request.Sub);

                    _logger.LogInformation($"Done soft delete of user with sub= {request.Sub}");
                }

                catch (Exception ex)
                {
                    _logger.LogError(ex, ex.Message);
                    throw;
                }
            });
            return base.StartAsync(cancellationToken);
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await Task.CompletedTask;
        }

        public override Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Email service is stopping...");

            return base.StopAsync(cancellationToken);
        }

        public override void Dispose()
        {
            _queueService.Dispose();
            base.Dispose();
        }
    }
}
