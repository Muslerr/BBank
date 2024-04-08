using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Webapi.Entities;
using Webapi.Repositories;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Webapi.Interfaces;

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

        public async Task<string> AuthenticateAsync(string username, string password)
        {
            try
            {
                var user = await _userRepository.GetUserByUsernameAsync(username);
                if (user == null || !VerifyPasswordHash(password, user.Password))
                {
                    return null;
                }
                return await GenerateJwtToken(user);
            }
            catch(Exception ex)
            {
                Console.WriteLine("Error Authenticating the user.");
                throw new Exception($"Error Authenticating the user :{ex.Message}");      
            }
        }

        public async Task<string> GenerateJwtToken(AppUser user)
        {
            try
            {
                var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
                var credentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

                var claims = new List<Claim>
            {
            new Claim(ClaimTypes.NameIdentifier, user.UserName),
            };

                var tokenOptions = new JwtSecurityToken(
                    issuer: _configuration["Jwt:Issuer"],
                    audience: _configuration["Jwt:Audience"],
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(Convert.ToInt32(_configuration["Jwt:ExpireMinutes"])),
                    signingCredentials: credentials
                );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                return tokenString;
            }
            catch(Exception ex)
            {
                Console.WriteLine("Error creating the jwt token.");
                throw new Exception($"Error creating jwt :{ex.Message}");      
            }
        }


        public async Task<string> CreateHashedPassword(string password)
        {
            var salt = new byte[16]; 
            var iterations = 10000; 
            var derivedBytes = KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: iterations,
                numBytesRequested: 32

            );
            return  $"{iterations}:{Convert.ToBase64String(salt)}:{Convert.ToBase64String(derivedBytes)}";
        }

        public bool VerifyPasswordHash(string password, string hashedPassword)
        {
            var parts = hashedPassword.Split(':');
            if (parts.Length != 3)
            {
                return false; // Invalid format
            }

            var iterations = Convert.ToInt32(parts[0]);
            var salt = Convert.FromBase64String(parts[1]);
            var storedHash = Convert.FromBase64String(parts[2]);

            var derivedBytes = KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: iterations,
                numBytesRequested: 32

            );

            return derivedBytes.SequenceEqual(storedHash);
        }
    }
}
