using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Webapi.Dtos;
using Webapi.Entities;
using Webapi.Interfaces;
using Webapi.Repositories;

namespace Webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]

    public class CardsController : ControllerBase
    {

        private readonly ICreditCardRepository _creditCardRepository;
        public CardsController(ICreditCardRepository creditCardRepository)
        {
            _creditCardRepository = creditCardRepository;
        }

       
        [HttpGet]
        public async Task<IActionResult> GetCards([FromQuery] string? isBlocked, [FromQuery] string? bankCode, [FromQuery] string? cardNumber)
        {
            await Task.Delay(2000);
            try
            {               

                var filter = new CreditFilter
                {
                    IsBlocked = isBlocked=="1"? null :isBlocked=="2" ? true :false,
                    BankCode = bankCode =="all" ?null : bankCode,
                    CardNumber = cardNumber
                };

                IEnumerable<CreditCard> cards;
                if (filter.HasFilters())
                {
                    cards = await _creditCardRepository.GetAsync(filter);
                }
                else
                {
                    cards = await _creditCardRepository.GetAllCreditCardsAsync();
                }

                if (cards != null)
                    return Ok(cards);

                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving cards.");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving cards.");
            }
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> IncreaseCreditLimit(Guid id, CardLimitUpdateRequest requestConditions)
        {
            Console.WriteLine("Increasing credit limit:");
            
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var card = await _creditCardRepository.GetCreditCardByIdAsync(id);

                if (card == null)
                    return NotFound();

                var newCard = requestConditions.CanIncreaseCardLimit(card);
                if (newCard == null)
                    return BadRequest("Credit limit increase not approved.");

                await _creditCardRepository.SaveToJSONAsync();
                Console.WriteLine("worked");
                return Ok(newCard);
            }
            catch
            {
                return BadRequest("Error occured inside the server");
            }
        }
    }
}