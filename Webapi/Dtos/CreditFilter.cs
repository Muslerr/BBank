using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Webapi.Dtos
{
    public class CreditFilter
    {
        public bool? IsBlocked { get; set; } 
        public string? BankCode { get; set; }
        public string? CardNumber { get; set; }

        public bool HasFilters()
        {
            return IsBlocked.HasValue || !string.IsNullOrEmpty(BankCode) || !string.IsNullOrEmpty(CardNumber);
        }
    }
}