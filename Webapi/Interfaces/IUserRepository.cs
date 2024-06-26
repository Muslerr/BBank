using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Webapi.Entities;

namespace Webapi.Interfaces
{
    public interface IUserRepository
{
    Task<AppUser?> GetUserByUsernameAsync(string username);
    Task SaveUserAsync(AppUser user);
}

}