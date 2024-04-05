using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Webapi.Entities;

namespace Webapi.Services
{
    public interface IUserService
    {
        Task<AppUser?> AuthenticateAsync(string username, string password);
        Task<string> GenerateJwtToken(AppUser user);
    }
}