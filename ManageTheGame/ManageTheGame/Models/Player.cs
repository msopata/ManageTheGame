using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManageTheGame.Models
{
    public class Player
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Birth { get; set; }
        public int Number { get; set; }
        public int Height { get; set; }
        public string Nationality { get; set; }
        public Guid ClubId { get; set; }
        public Club Club { get; set; }
    }
}
