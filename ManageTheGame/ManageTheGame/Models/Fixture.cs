using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManageTheGame.Models
{
    public class Fixture
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public int Duration { get; set; } //minutes
        public int HomeGoals { get; set; } 
        public int AwayGoals { get; set; } 
        public int Gameweek { get; set; } 
        public Guid CompetitionId { get; set; } 
        public Guid HomeId { get; set; } 
        public Guid AwayId { get; set; } 
        public Competition Competition { get; set; } 
        public Club Home { get; set; } 
        public Club Away { get; set; } 
    }
}
