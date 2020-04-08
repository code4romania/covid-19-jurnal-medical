using System;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using StamAcasa.JobScheduler.Jobs;

namespace StamAcasa.JobScheduler.Extensions
{
    internal static class ServiceCollectionExtensions
    {
        public static IServiceCollection TryAddScheduledJob<TScheduledJob>(
            this IServiceCollection services,
            Action<IServiceCollection> configureJobDependencies = default)
        where TScheduledJob : class, IScheduledJob
        {
            if (services is null)
            {
                throw new ArgumentNullException(nameof(services));
            }
            
            services.TryAddTransient<TScheduledJob>();
            configureJobDependencies?.Invoke(services);

            return services;
        }
    }
}
