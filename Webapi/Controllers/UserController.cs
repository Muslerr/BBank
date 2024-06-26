using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Webapi.Entities;
using Webapi.Interfaces;
using Webapi.Services;

namespace Webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Authenticate([FromBody] UserDto request)
        {

            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(new { Message = "Invalid Inputs." });

                string token = await _userService.AuthenticateAsync(request.UserName, request.Password);

                if (token == null)
                    return Unauthorized("Wrong password or Username");

                return Ok(new { Token = token });
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred in the server while logging in.");
            }
        }
        [HttpGet("ValidateToken")]
        [Authorize]
        public IActionResult ValidateToken()
        {
            return Ok(new { Valid = true });
        }

    }
}