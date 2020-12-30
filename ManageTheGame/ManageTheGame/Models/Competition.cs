using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManageTheGame.Models
{
    public class Competition
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public int Type { get; set; }
        public string Description { get; set; }
        public int TeamCount { get; set; }
        public bool Started { get; set; }
        public List<Club> Clubs { get; set; }

    }
}
