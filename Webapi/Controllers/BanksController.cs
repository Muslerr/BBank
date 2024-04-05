using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Webapi.Repositories;

namespace Webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
            var banks = await _bankRepository.GetAllBanksAsync();
            Console.WriteLine("Banks: " + banks);
            return Ok(banks);
        }

        
    }
}