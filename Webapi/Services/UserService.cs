using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using Webapi.Entities;

namespace Webapi.Services
{
    public class UserService : IUserService
{
    private readonly IUserRepository _userRepository; 
    private readonly IConfiguration _configuration;

    public UserService(IUserRepository userRepository, IConfiguration configuration)
    {
        _userRepository = userRepository;
        _configuration = configuration;
    }

    public async Task<AppUser?> AuthenticateAsync(string username, string password)
    {
        var user = await _userRepository.GetUserByUsernameAsync(username);
        if (user == null || !VerifyPassword(password, user.PasswordHash))
        {
            return null;
        }
        return user;
    }

    public async Task<string> GenerateJwtToken(AppUser user)
    {
        var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
        var credentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

       

        var tokenOptions = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            expires: DateTime.Now.AddMinutes(Convert.ToInt32(_configuration["Jwt:ExpireMinutes"])),
            signingCredentials: credentials
        );

        var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        return tokenString;
    }

    
    private bool VerifyPassword(string password, string hashedPassword)
    {
        
        return password == hashedPassword; 
}

}
}