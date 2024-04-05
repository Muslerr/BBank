using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Webapi.Dtos;
using Webapi.Entities;
using Webapi.Repositories;

namespace Webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CardsController : ControllerBase
    {
        private readonly ICreditCardRepository _creditCardRepository;
        public CardsController(ICreditCardRepository creditCardRepository)
        {
            _creditCardRepository = creditCardRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetCards()
        {
            var cards = await _creditCardRepository.GetAllCreditCardsAsync();
            return Ok(cards);
        }

        [HttpPost]
        public async Task<IActionResult> GetFilteredCards([FromBody] CreditFilter filter)
        {
            var filteredCards = await _creditCardRepository.GetAsync(filter); // Adjust method call based on your repository implementation
            return Ok(filteredCards);
        }


        [HttpPut("/cards/{id:guid}")]
        public async Task<IActionResult> IncreaseCreditLimit(Guid id, CardLimitUpdateRequest requestConditions)
        {
            var card = await _creditCardRepository.GetCreditCardByIdAsync(id);
            if (card == null)
            {
                return NotFound();
            }

            var newCard = requestConditions.CanIncreaseCardLimit(card);
            if (newCard == null)
            {
                return BadRequest("Credit limit increase not approved.");
            }
            await _creditCardRepository.SaveToJSONAsync();
            return Ok(newCard);
        }



    }
}