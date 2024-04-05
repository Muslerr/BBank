using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using Webapi.Entities;

namespace Webapi.Repositories
{
    public class BankRepository : IBankRepository
    {
        private readonly IMemoryCache _cache;
        private readonly string _cacheKey = "Banks";
        private readonly string _dataFilePath = "Data/BanksDb.json";

        public BankRepository(IMemoryCache cache)
        {
            _cache = cache;
        }

        public async Task<List<Bank>> GetAllBanksAsync()
        {
            var banks = _cache.Get<List<Bank>>(_cacheKey);

            if (banks is null)
            {
                banks = await LoadBanksFromDataFileAsync();
                _cache.Set(_cacheKey, banks, new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromHours(1))); // Cache expires 1 hour after last access
            }

            return banks;
        }

        public async Task<Bank> GetBankByCodeAsync(string bankCode)
        {
            var banks = await GetAllBanksAsync();
            return banks.FirstOrDefault(b => b.BankCode == bankCode);
        }

        private async Task<List<Bank>> LoadBanksFromDataFileAsync()
        {
            try
            {
                if (string.IsNullOrEmpty(_dataFilePath))
                {
                    throw new ArgumentException("Data file path not set. Please set the _dataFilePath property before calling this method.");
                }

                
                // Open the file and read the JSON data
                using (var fileStream = File.OpenRead(_dataFilePath))
                using (var streamReader = new StreamReader(fileStream))
                {                   
                    var banks =await JsonSerializer.DeserializeAsync<List<Bank>>(fileStream);
                    return banks;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error loading banks:");
                Console.WriteLine(ex.Message);
                throw new Exception($"Error loading Banks data from {_dataFilePath}: {ex.Message}"); // Rethrow with additional context
            }
        }

    }
}