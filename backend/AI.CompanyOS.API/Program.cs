using System.Data;
using System.Text.Json;
using AI.CompanyOS.API.Data;
using AI.CompanyOS.API.Hubs;
using AI.CompanyOS.API.Services;
using Dapper;
using Microsoft.EntityFrameworkCore;

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
SqlMapper.AddTypeHandler(new JsonListTypeHandler<string>());

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c => c.SwaggerDoc("v1", new() { Title = "AI Company OS API", Version = "v1" }));

builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
       .UseSnakeCaseNamingConvention());

builder.Services.AddSignalR();

builder.Services.AddHttpClient("github", c =>
{
    c.DefaultRequestHeaders.UserAgent.ParseAdd("AI-CompanyOS/1.0");
    c.Timeout = TimeSpan.FromSeconds(30);
});

builder.Services.AddSingleton<AIClientService>();
builder.Services.AddScoped<AgentService>();
builder.Services.AddHostedService<OrchestratorService>();

builder.Services.AddCors(opt =>
    opt.AddPolicy("AllowAngular", p =>
        p.WithOrigins("http://localhost:4200")
         .AllowAnyHeader()
         .AllowAnyMethod()
         .AllowCredentials()));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAngular");
app.UseAuthorization();
app.MapControllers();
app.MapHub<AgentHub>("/hubs/agent");

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    SchemaInitializer.CreateTables(db);
    DatabaseInitializer.Seed(db);
}

app.Run();

class JsonListTypeHandler<T> : SqlMapper.TypeHandler<List<T>>
{
    public override List<T> Parse(object value)
        => JsonSerializer.Deserialize<List<T>>(value?.ToString() ?? "[]") ?? [];
    public override void SetValue(IDbDataParameter parameter, List<T>? value)
        => parameter.Value = JsonSerializer.Serialize(value);
}
