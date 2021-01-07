using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManageTheGame.Models
{
    public class StandingsRow
    {
        public int Position { get; set; }
        public string ClubName { get; set; }
        public int Points { get; set; }
        public int Games { get; set; }
        public int GoalsScored { get; set; }
        public int GoalsConceded { get; set; }
    }
}
