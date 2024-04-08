using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Webapi.Dtos
{
    public static class OccupationsList
    {
        public static readonly Dictionary<string, double> Occupations = new Dictionary<string, double>
    {
        { "SelfEmployed", 0.3 },
        { "Salaried", 0.5 },
       
        //we can add more occupation profile in here and modify the existing ones with ease adding more Occupations dynamicly that will also change it in the client side.
    };
    }
}