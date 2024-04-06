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
        public async Task<IActionResult> GetCards()
        {
            try
            {
                var cards = await _creditCardRepository.GetAllCreditCardsAsync();
                if (cards != null)
                    return Ok(cards);
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving cards.");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving cards.");
            }
        }

        [HttpPost]

        public async Task<IActionResult> GetFilteredCards([FromBody] CreditFilter filter)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                var filteredCards = await _creditCardRepository.GetAsync(filter);
                return Ok(filteredCards);
            }
            catch
            { 
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving cards.");
            }
        }


        [HttpPut("{id:guid}")]
        public async Task<IActionResult> IncreaseCreditLimit(Guid id, CardLimitUpdateRequest requestConditions)
        {
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
                return Ok(newCard);
            }
            catch
            {
                return BadRequest("Error occured inside the server");
            }
        }



    }
}