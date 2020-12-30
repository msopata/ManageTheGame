using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManageTheGame.Models
{
    public class Club
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Abbreviation { get; set; }
        public DateTime Founded { get; set; }
        public string Description { get; set; }
    }
}
