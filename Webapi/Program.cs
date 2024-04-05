using Microsoft.AspNetCore.Identity;
using Webapi;
using Webapi.Entities;
using Webapi.Repositories;
using Webapi.Services;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMemoryCache();
builder.Services.AddTransient<IUserService, UserService>(); // Custom user service

// JWT Authentication
builder.Services.AddAuthentication()
    .AddJwtBearer(options =>
    {
      
    });

builder.Services.AddSingleton<IBankRepository, BankRepository>();
builder.Services.AddSingleton<ICreditCardRepository, CreditCardRepository>();

// Keep this line for basic role management


// Remove this line if you have a JsonUserStore with custom user management
// builder.Services.AddTransient<JsonUserStore>();
// builder.Services.AddIdentity<AppUser, IdentityRole>(options => { /* ... */ })
//     .AddUserStore<JsonUserStore>();

var app = builder.Build();
app.MapControllers();

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();



app.Run();
