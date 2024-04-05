using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Webapi.Entities
{
    public class CreditCard
    {
        [Required]
        public Guid Id {get; set;}
                
        [Required]
        [StringLength(16, MinimumLength = 16, ErrorMessage = "Card number must be 16 digits long")]
        public string CardNumber { get; init; }

        [Required]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime IssuedDate { get; init; }
        
        [Required]
        public string CardImage { get; set; }
        
        [Required]
        public bool IsBlocked { get; set; }
       
        [Required]
        public bool IsDigital { get; set; }

        [Required]
        [Range(0.01, 100000, ErrorMessage = "Card limit must be a positive value")]
        public double CardLimit { get; set;  }

        [Required]
        [RegularExpression(@"^\d{3}$", ErrorMessage = "Bank code must be 3 digits")]
        public string BankCode { get; init; }

    }
}