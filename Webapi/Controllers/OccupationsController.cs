using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Webapi.Dtos;

namespace Webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OccupationsController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetOccupations()
        {
            
            List<string> occupations = new List<string>(OccupationsList.Occupations.Keys);
            return Ok(occupations);
        }
    }
}