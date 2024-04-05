using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Webapi.Entities;
using System.Text.Json;
using Microsoft.Extensions.Caching.Memory;
using Webapi.Dtos;

namespace Webapi.Repositories
{
    public class CreditCardRepository : ICreditCardRepository
    {
        private ICollection<CreditCard> _cards;
        private readonly string _dataFilePath = "Data/CreditCardsDb.json";

        public CreditCardRepository()
        {

        }

        public async Task<ICollection<CreditCard>> GetAllCreditCardsAsync()
        {
            if (_cards == null)
            {
                _cards = await LoadCreditCardsFromDataFileAsync();
            }
            return _cards;
        }

        public async Task<ICollection<CreditCard>> GetAsync(CreditFilter filter)
        {
            if (_cards == null)
            {
                _cards = await LoadCreditCardsFromDataFileAsync();
            }
            if (!filter.HasFilters()) // Returns all cards if no filters are specified.
            {
                return await GetAllCreditCardsAsync();
            }
            else
            {
                return _cards.Where(card =>
                    (filter.IsBlocked == null || card.IsBlocked == filter.IsBlocked.Value) &&
                    (string.IsNullOrEmpty(filter.BankCode) || card.BankCode.Equals(filter.BankCode)) &&
                    (string.IsNullOrEmpty(filter.CardNumber) || card.CardNumber.Contains(filter.CardNumber))
                ).ToList();
            }
        }

        public async Task<CreditCard> GetCreditCardByIdAsync(Guid id)
        {
            if (_cards == null)
            {
                _cards = await LoadCreditCardsFromDataFileAsync();
            }
            return _cards.SingleOrDefault(card => card.Id == id);
        }


        private async Task<List<CreditCard>> LoadCreditCardsFromDataFileAsync()
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

                    var cards = await JsonSerializer.DeserializeAsync<List<CreditCard>>(fileStream);
                    return cards;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error loading Cards");
                Console.WriteLine(ex.Message);
                throw new Exception($"Error loading Cards data from {_dataFilePath}: {ex.Message}");
            }
        }
        public async Task SaveToJSONAsync()
        {
            if (_cards == null)
            {
               return;
            }

            try
            {
                var json = JsonSerializer.Serialize(_cards);
                await File.WriteAllTextAsync(_dataFilePath, json);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error saving Cards to JSON");
                Console.WriteLine(ex.Message);
                throw new Exception($"Error saving Cards data to {_dataFilePath}: {ex.Message}");
            }
        }
    }
}