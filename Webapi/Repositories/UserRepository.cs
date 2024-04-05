using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Webapi.Entities;

namespace Webapi.Repositories
{
    public class UserRepository : IUserRepository
    {
        private ICollection<AppUser> _users;
        private readonly string _dataFilePath = "Data/CreditCardsDb.json";

        public UserRepository()
        {

        }

        public async Task<AppUser?> GetUserByUsernameAsync(string username)
        {
            try
            {
                var jsonData = await File.ReadAllTextAsync(_dataFilePath);
                var users = JsonSerializer.Deserialize<List<AppUser>>(jsonData);
                return users?.FirstOrDefault(u => u.UserName == username);
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
            try
            {
                var users = await LoadUsersFromFileAsync();
                users.Add(user);
                var json = JsonSerializer.Serialize(users);
                await File.WriteAllTextAsync(_dataFilePath, json);
            }
            catch (Exception ex)
            {
               
                Console.WriteLine($"Error saving user data: {ex.Message}");
            }
        }

       

        Task<AppUser?> IUserRepository.GetUserByUsernameAsync(string username)
        {
            throw new NotImplementedException();
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