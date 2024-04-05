using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Webapi.Entities
{
    public class AppUser
    {
        public string UserName {get; set ;}
        public string Password {get; set ;}


    }
}