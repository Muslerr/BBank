using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Webapi.Entities;
using Webapi.Interfaces;

namespace Webapi.Repositories
{
    public class UserRepository : IUserRepository
    {
        private ICollection<AppUser> _users;
        private readonly string _dataFilePath = "Data/UsersDb.json";

        public UserRepository()
        {

        }

        public async Task<AppUser?> GetUserByUsernameAsync(string username)
        {
            if (_users == null)
            {
                _users = await LoadUsersFromFileAsync();
            }
            try
            {
                return _users?.FirstOrDefault(u => u.UserName == username);
            }
            catch (Exception ex)
            {
                // Handle potential exceptions during file read or deserialization
                Console.WriteLine($"Error reading user data: {ex.Message}");
                return null;
            }
        }

        public async Task SaveUserAsync(AppUser user)
        {
            if (_users == null)
            {
                _users = await LoadUsersFromFileAsync();
            }
            try
            {
                if (_users.FirstOrDefault(u => u.UserName == user.UserName) == null)
                {
                    _users.Add(user);
                    var json = JsonSerializer.Serialize(_users);
                    await File.WriteAllTextAsync(_dataFilePath, json);
                }
                else 
                   throw new Exception("username already exists");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error saving user data: {ex.Message}");
            }
        }

        private async Task<List<AppUser>> LoadUsersFromFileAsync()
        {
            try
            {
                if (string.IsNullOrEmpty(_dataFilePath))
                {
                    throw new ArgumentException("Data file path not set. Please set the _dataFilePath property before calling this method.");
                }

                using (var fileStream = File.OpenRead(_dataFilePath))
                using (var streamReader = new StreamReader(fileStream))
                {

                    var users = await JsonSerializer.DeserializeAsync<List<AppUser>>(fileStream);
                    return users;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error loading users");
                Console.WriteLine(ex.Message);
                throw new Exception($"Error loading users data from {_dataFilePath}: {ex.Message}");
            }
        }
    
        
    }

}