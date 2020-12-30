using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManageTheGame.Models
{
    public class CompetitionClub
    {
        public Guid Id { get; set; }
        public Guid  CompetitionId { get; set; }
        public Guid  ClubId { get; set; }
        public Club  Club { get; set; }
        public Competition  competition { get; set; }
    }
}
