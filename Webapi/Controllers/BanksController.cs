using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Webapi.Interfaces;
using Webapi.Repositories;

namespace Webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BanksController : ControllerBase
    {
        private readonly IBankRepository _bankRepository;
        public BanksController(IBankRepository bankRepository)
        {
            _bankRepository = bankRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetBanksAsync()
        {
             await Task.Delay(3000);
            try
            {
                var banks = await _bankRepository.GetAllBanksAsync();
                if(banks != null)
                   return Ok(banks);
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving banks.");
            }
            catch(Exception e)
            { 
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving banks.");
            }
        }


    }
}