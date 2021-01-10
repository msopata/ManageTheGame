using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManageTheGame.Models
{
    public class Stat
    {
        public Guid Id { get; set; }
        public int Type { get; set; }
        public int Minute { get; set; }
        public Guid FixtureId { get; set; }
        public Guid PlayerId { get; set; }
        public Player Player { get; set; }
    }
}

/*
 stat type list:
   1 - apearance
   2 - goal
   3 - assist
   4 - YC
   5 - RC
   6 - MVP
   7 - own goal (?)
 */
