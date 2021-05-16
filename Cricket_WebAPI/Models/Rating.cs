using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cricket_WebAPI.Models
{
    // Represent Player Rating
    public class Rating
    {
        // Rating ID
        public int Id { get; set; }

        // Name of Player
        public string PlayerName { get; set; }

        // Points Earned
        public int Points { get; set; }

        // Country Name of Player
        public string CountryName { get; set; }
    }
}
