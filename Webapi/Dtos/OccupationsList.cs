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
        { "Salaried", 0.5 },
        { "SelfEmployed", (1/3) },
        //we can add more occupation profile in here and modify the existing ones with ease.
    };
    }
}