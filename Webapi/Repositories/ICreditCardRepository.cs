using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Webapi.Dtos;
using Webapi.Entities;

namespace Webapi.Repositories
{
    public interface ICreditCardRepository
    {
        Task<ICollection<CreditCard>> GetAllCreditCardsAsync();        
        Task<ICollection<CreditCard>> GetAsync(CreditFilter filter);
        
        Task<CreditCard> GetCreditCardByIdAsync(Guid id);
        Task SaveToJSONAsync();
    
    }
}