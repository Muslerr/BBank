using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Webapi.Entities;

namespace Webapi.Dtos
{
    public class CardLimitUpdateRequest
    {
        public double WantedAmount { get; set; }
        public string RequestOccupation { get; set; }
        public double AverageIncome { get; set; }

        public CreditCard CanIncreaseCardLimit(CreditCard card)
        {
           
            try
            {
                if (card.IsBlocked || AverageIncome < 12000 || IsIssuedDateMoreThanThreeMonthsAgo(card.IssuedDate))
                    return null;
                if (!OccupationsList.Occupations.TryGetValue(RequestOccupation, out var increasePercentage))
                {
                    Console.WriteLine("occupation bad");
                    return null;
                }
                Console.WriteLine(increasePercentage);
                if (WantedAmount <= increasePercentage * AverageIncome)
                {
                    Console.WriteLine(increasePercentage);
                    card.CardLimit = WantedAmount;
                    return card;
                }
                Console.WriteLine(increasePercentage);
                return null;
            }
            catch
            {
                throw;
            }

        }

        private bool IsIssuedDateMoreThanThreeMonthsAgo(DateTime issuedDate)
        {
            var threeMonthsAgo = DateTime.UtcNow.Subtract(TimeSpan.FromDays(30 * 3)); // Calculate 3 months ago in UTC
            return issuedDate > threeMonthsAgo;
        }

    }
}