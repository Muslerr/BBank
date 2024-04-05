using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Webapi.Entities
{
    public class Bank
    {
        [Required]
        [RegularExpression(@"^\d{3}$", ErrorMessage = "Bank code must be 3 digits")]
        public string BankCode { get; init; }
        [Required]
        [MinLength(2)]
        public string Name { get; set; }
        [Required]
        [MinLength(4)]
        public string Description { get; set; }

    }
}