namespace Sample
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddDataContext(
            this IServiceCollection services, IConfiguration configuration)
        {
            _ = services.AddDbContext<DbContext, DataContext>(options =>
            {
                _ = options.UseSqlite(configuration.GetConnectionString("DataContext"));
            });

            return services;
        }

        public static IServiceProvider TryMigrateDatabase(this IServiceProvider provider)
        {
            using var serviceScope = provider.CreateScope();

            var serviceProvider = serviceScope.ServiceProvider;

            using var context = serviceProvider.GetRequiredService<DbContext>();

            context.Database.EnsureCreated();

            DataSendInitializer.Initialize(context);

            return provider;
        }
    }
}