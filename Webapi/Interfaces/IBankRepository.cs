using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Webapi.Entities;

namespace Webapi.Interfaces
{
    public interface IBankRepository
    {
        Task<List<Bank>> GetAllBanksAsync();
        Task<Bank> GetBankByCodeAsync(string bankCode);
    }
}